Nomad
=====

Oppsettet
---------

Vi bruker en samling av forskjellige produkt for å sette opp alt.

 * [Nomad](https://www.nomadproject.io/) - For å starte og stoppe jobber i et cluster
 * [Consul](https://www.consul.io/) - For service discovery (Nomad har Consul integrasjon)
 * [Fabio](https://github.com/eBay/fabio) - Lastbalanserer som integrerer med Consul (her kunne vi også brukt HAProxy)


### For å starte opp

Vi har satt opp et miljø med Nomad, Consul og Fabio, som startes slik:

```bash
git clone git@github.com:sveinung/container-orchestration-workshop.git
cd nomad
vagrant up
vagrant ssh

# Nå er du inne i en virtuell maskin
git clone https://github.com/eBayClassifiedsGroup/KomPaaS.git
cd KomPaaS
docker-compose up -d
```

Hvis alt går bra så skal det være kjørt opp en del docker-imager med Nomad, Consul og Fabio.

De forskjellige produktene har noen web-ui som man kan se status i. Anbefaler
at man for det meste bruker kommandolinjen når man gjør oppgavene.

 * [Nomad-ui](http://localhost:8080/) gir en oversikt over jobber som kjører i clusteret
 * [Consul](http://localhost:8500/) gir en oversikt over hva Nomad har puttet inn i service discovery
 * [Fabio](http://localhost:9998/) gir en oversikt over hvordan lastbalanseringen er satt opp
 * [Appene](http://localhost:9999/) er tilgjengelig her når de blir routet riktig av Fabio

For å få Fabio til å fungere må man tagge servicene med f.eks. `urlprefix-/`
for å gjøre appen tilgjengelig på rota, eller `urlprefix-/backend` for å gjør
noe tilgjengelig på `/backend`.

Hvis ikke alt kommer opp riktig, prøv å starte opp de som ikke kom opp på nytt:

```bash
docker logs kompaas_fabio
docker-compose up -d
```


Introduksjon
------------

Anbefaler å gå igjennom disse to introduksjonene før du begynner på oppgavene:

* [Intro til Nomad](https://www.nomadproject.io/intro/getting-started/running.html). Vi har allerede startet nomad, så det kan du hoppe over.
* [Intro til å kjøre jobber i Nomad](https://www.nomadproject.io/intro/getting-started/jobs.html)


Komme igang med en ny jobb
--------------------------

En liten kort recap av forrige intro:

```
nomad init

nomad start example.nomad

nomad status example

nomad plan example.nomad

nomad stop example
```

Oppgaver
--------

Gå til rota i prosjektet og gå igjennom oppgavene der


Ekstra oppgaver
===============

Hvis du blir ferdig med felles-oppgavene kan du prøve å bryne deg på disse ekstraoppgavene:

* Skaler opp de forskjellige applikasjonene.
* Prøve å legg til flere noder i Nomad-clusteret. ([Tips i nybegynner-guiden til Nomad](https://www.nomadproject.io/intro/getting-started/cluster.html)
* Prøv å sett opp Nomad, Consul og Fabio (evt [HAProxy](http://www.haproxy.org/) og [consul-template](https://github.com/hashicorp/consul-template)) selv. Dette er en ganske stor oppgave.


