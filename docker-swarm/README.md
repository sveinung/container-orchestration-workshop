# Docker Swarm

Installasjon bør utføres før fagdag.

## Installasjon

Installer følgende pakker:

- [Vagrant](https://www.vagrantup.com/)
- [Docker machine](https://docs.docker.com/engine/installation/)
- [Docker Engine](https://github.com/docker/machine/releases/)

## Kontainere

Vi skal sette opp et system med følgende tjenester:

- Frontend (React-frontend)
- Backend (backend)
- Public web (public-web)
- Tag service (service)
- Database (MySQL eller PostgreSQL) - bonusoppgave

React-frontend og backend plasseres i et privat nettverk, og blir eksponert til
utsiden via public-web. For å teste orkestrering over flere maskiner bruker vi
en eller flere noder per kontainer.

## Krav til nettverk mellom noder

Følgende porter må være åpne

- TCP port 2377 for cluster management communications
- TCP and UDP port 7946 for communication among nodes
- TCP and UDP port 4789 for overlay network traffic

If you are planning on creating an overlay network with encryption (--opt encrypted), you
will also need to ensure protocol 50 (ESP) is open.

Se [Getting started with swarm Mode](https://docs.docker.com/engine/swarm/swarm-tutorial/#/install-docker-engine-on-linux-machines)
for mer informasjon.

## Oppsett av cluster

Først må vi opprette noder som skal kjøre cluster. Instruksjonene her oppretter virtuelle
maskiner lokalt, men dette kunne også ha vært EC2-instanser på Amazon, Droplets på DigitalOcean,
eller lignende.

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
kommunikasjon mellom nodene så oppretter vi et
[overlay network](https://docs.docker.com/engine/swarm/networking/):

  eval `docker-machine env manager1`
  docker network create --driver overlay workshop

Dette setter opp [service discovery](https://docs.docker.com/engine/swarm/networking/#/use-swarm-mode-service-discovery), der
tjenester tilgjengeliggjøres vha. DNS-oppføringer.

## Bygg og distribuer tjenester

TODO Instruksjoner for å sette opp systemet uten hjelpekode.

TODO Opprett docker registry slik at distribuering av images ikke må gjøres manuelt.

Dette forutsetter at cluster er opprettet som beskrevet ovenfor. Kjør følgende
kommando fra katalogen docker-swarm:

  ./workshop.sh
