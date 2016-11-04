# Docker Swarm Mode

I denne workshop-en bruker vi [Docker swarm mode](https://docs.docker.com/engine/swarm/) og krever
derfor docker versjon 1.12 eller nyere. For eldre versjoner er [Docker Swarm](https://docs.docker.com/swarm/)
tilgjengelig med endel av den samme funksjonaliteten, men ulik API.

## Installasjon

Installer følgende pakker:

- [Vagrant](https://www.vagrantup.com/)
- [Docker machine](https://docs.docker.com/engine/installation/)
- [Docker Engine](https://github.com/docker/machine/releases/)

## Krav til nettverk mellom noder

Følgende porter må være åpne

- TCP port 2377 for cluster-administrering
- TCP and UDP port 7946 for kommunikasjon mellom noder
- TCP and UDP port 4789 for overlay network trafikk

Hvis `--opt encrypted` skal brukes, må også port 50 (ESP) være åpen. Se [Getting started with swarm Mode](https://docs.docker.com/engine/swarm/swarm-tutorial/#/install-docker-engine-on-linux-machines)
for mer informasjon.

## Oppsett av cluster

Først må vi opprette noder som skal kjøre cluster. Instruksjonene her oppretter virtuelle
maskiner lokalt, men dette kunne også ha vært EC2-instanser på Amazon, Droplets på DigitalOcean eller lignende.

    docker-machine create --driver virtualbox manager1
    docker-machine create --driver virtualbox worker1
    docker-machine create --driver virtualbox worker2

Neste steg er å koble sammen nodene med docker swarm. Opprett manager-node med
følgende kommando:

    eval `docker-machine env manager1`
    docker swarm init --advertise-addr `docker-machine ip manager1`

Du får da en melding tilsvarende:

    To add a worker to this swarm, run the following command:

        docker swarm join \
            --token SWMTKN-1-05wmf0o647hh3c6c3ppbglcxsmf919wtfjy3wvbjyalt1kv56w-9t7izz9frphnn4eikq0z1lvvu \
            192.168.99.100:2377

  To add a manager to this swarm, run 'docker swarm join-token manager' and follow the instructions.

Kjør kommandoen beskrevet ovenfor på worker1 og worker2 for å opprette worker-noder og
sjekk tilstanden med:

    docker node ls

Denne skal gi et resultat tilsvarende dette:

    ID                           HOSTNAME  STATUS  AVAILABILITY  MANAGER STATUS
    2e679wlvxacuqrjutfxabvv2k    worker2   Ready   Active        
    6ctio3ijck05s1uopyqbofzg6 *  manager1  Ready   Active        Leader
    9hi1wntoop26klaezurpfjpvv    worker1   Ready   Active        

Du har nå en cluster med tre noder som kan kjøre tjenester. For å sette opp privat
kommunikasjon mellom nodene, oppretter vi et
[overlay network](https://docs.docker.com/engine/swarm/networking/):

    eval `docker-machine env manager1`
    docker network create --driver overlay workshop

Dette setter opp [service discovery](https://docs.docker.com/engine/swarm/networking/#/use-swarm-mode-service-discovery), der
tjenester tilgjengeliggjøres via interne DNS-oppføringer.

## Kjøre tjenester

Docker swarm mode administreres via en manager-node. Dette kan gjøres via en vanlig ssh-tilkobling,
eller direkte med docker-kommandoen etter at miljøvariabler er satt opp med docker machine:

    eval `docker-machine env manager1`

Vi bruker `docker service` til administrering av tjenester som kjører i cluster. Bruk
[service create](https://docs.docker.com/engine/reference/commandline/service_create/) for
å opprette nye tjenester:

    docker service create \
      --name frontend \
      --network workshop \
      --publish 80:80 \
      smat/frontend

Tjenesten er tilgjengelig til nettverket `workshop` via en intern DNS-oppføring med
navnet `frontend`. Den er også tilgjengelig på port 80 via IP-adressen til alle nodene i
cluster, se [routing mesh](https://docs.docker.com/engine/swarm/ingress/) for mer informasjon
om rutingen.

## Hente informasjon om tjenester

List opp kjørende tjenester med [service ls](https://docs.docker.com/engine/reference/commandline/service_ls/):

    docker service ls

Finn informasjon om kjørende instanser av en enkelttjeneste med [service ps](https://docs.docker.com/engine/reference/commandline/service_ps/). Dette gir blant annet
informasjon om hvor tjenesten kjører.

    docker service ps frontend

Vis detaljert informasjon for tjeneste med [service inspect](https://docs.docker.com/engine/reference/commandline/service_inspect/):

    docker service inspect --pretty frontend

Se logg fra `STDOUT` og `STDERR` med [logs](https://docs.docker.com/engine/reference/commandline/logs/)-kommandoen:

    docker logs --follow CONTAINER_ID

Merk at `docker logs` må kjøres på noden der en instans av tjenesten kjører. Finn node med `docker service ps frontend`,
koble til noden med `docker-machine env NAVN_PÅ_NODE`, finn `CONTAINER_ID` med `docker ps`, og kjør `docker logs`
for å lese logg.

## Skalering

For å skalere en tjeneste bruker vi [service scale](https://docs.docker.com/engine/swarm/swarm-tutorial/scale-service/). Følgende
kommando skalerer backend-tjensten til å kjøre på tre noder:

    docker service scale backend=3

## Oppdatere tjeneste

For å oppdatere tjenester brukes [service update](https://docs.docker.com/engine/swarm/swarm-tutorial/rolling-update/). F.eks.

    docker service update --image backend:v2 backend

For testing, kan det være aktuelt å distribuere images manuelt ved å bygge
ny image av koden på en node, for så å eksportere dette til et arkiv og laste
inn til resterende noder, følgende kan brukes til å endre frontend (kjøres
fra katalogen frontend):

    # Endre tittel (bruk ev. en teksteditor og endre manuelt)
    sed -i 's/<h1>.\+<\/h1>/<h1>Todo-app v2<\/h1>/' src/index.html

    # Lag nytt image (kan senere distribueres til docker registry)
    eval `docker-machine env manager1`
    docker build -t frontend:v2 .
    docker save frontend:v2 > frontend-v2.tar

    # Last image til worker-noder
    eval `docker-machine env worker1`
    docker load < frontend-v2.tar
    eval `docker-machine env worker2`
    docker load < frontend-v2.tar

    # Oppdater cluster med ny versjon
    eval `docker-machine env manager1`
    docker service update --image frontend:v2 frontend

Sjekk at ny versjon kjører med `docker service ls`.

## PostgreSQL


    docker service --name database -e POSTGRES_PASSWORD=heihei -d postgres
