Pre-install
===========
- Virtualbox (https://www.virtualbox.org/)
- Docker (https://docs.docker.com/#welcome-to-the-docs)
- Vagrant (https://www.vagrantup.com/downloads.html)


# container-orchestration-workshop



Rigg (Stian M og Sveinung):
- Nettside (statiske ressurser)
- Backend for nettsiden
- Database
- En applikasjon backend-en integrerer mot

Plattformer:
- mesos (minimesos) – Jarle
- kubernetes – Sveinung
- Docker Swarm – Stian L
- Nomad – Stian M

Mål:
- Hvor enkelt er nedetidsfri deploy?
  - Om lastbalansering ikke er en del av systemet: Hvor lett er det å legge inn?
  - Samme om alt går via systemet
- Failover?
- Hvor enkelt er det å få applikasjoner til å snakke med hverandre?
  - Over http?
  - Over andre protokoller enn http?
- Hvor enkelt er det å få opp et cluster?
- Hvor enkelt er det å gjøre endringer i clusteret?
  - Ta ting ut og inn
- Cross-cutting concerns
  - Logging
  - Monitorering
  - Sikkerhet
- Persistens
  - Klassisk SQL-database?
  - Clustra databaser? (hvis tid)
- Periodiske jobber
- One cluster to rule them all vs. flere cluster (ett cluster til alle miljø?)

## Tips

For de som bruker Vagrant

Installer Vagrant plugin [vagrant-cachier](https://github.com/fgrehm/vagrant-cachier) (`vagrant plugin install vagrant-cachier`). Den vil lagre den lokale cache-katalogen
til en god del pakkesystemer på Vagrant hosten, og så tilgjengeliggjøre cachen på guest maskinene, slik at man slipper å laste
ned pakkene hver gang man kjører `vagrant destroy`/`vagrant up`

Legg inn dette i Vagrantfile for å skru den på:

```
Vagrant.configure("2") do |config|
  ...
  if Vagrant.has_plugin?('vagrant-cachier')
    config.cache.scope = :box
  end
  ...
end

```


Applikasjoner
=============

Frontend
--------

```
Docker-image: smat/frontend
```

React-frontend for å lagre TODOs. Kjører på `/` og port `80`. Forventer at
backenden kjører på samme host på `/backend`.

Backend
-------

```
Docker-image: smat/backend
```

Tjeneste for å lagre TODOs. Lagrer per default i en in-memory-database, men det
ligger inne drivere for både MySQL og Postgres.

Kjører på `/backend` og port `8080`.

Appen kommuniserer også med en annen tjeneste som han ansvar for tags.

### Miljøvariabler

 * `JDBC_URL` Url på JDBC format. Eksempel: jdbc:mysql://host:port/database
 * `JDBC_USERNAME` Brukernavn til databasen
 * `JDBC_PASSWORD` Passord til databasen
 * `SERVICE_ENDPOINT` URL til tjenesten Service. Eksempel: http://ip:port


Service
-------

Har ansvar for tags.

```
Docker-image: smat/service
```

Docker repo
-----------

https://hub.docker.com/u/smat/

Oppgaver
========

Vi skal sette opp et system bestående av følgende komponenter:

- Frontend
- Backend
- Tag service
- Database

Frontend er en web-applikasjon for å liste ut og redigere TODO-oppføringer. Backend
lagrer TODO-oppføringene i en database og tilgjengeliggjør emneknagger som hentes
via tag service.

1.  Sett opp [smat/frontend](https://hub.docker.com/r/smat/frontend/) som en tjeneste
    tilgjengelig via port 80. Test at applikasjonen er oppe ved å gå inn på http://FRONTEND
    i en nettleser. Hvis alt fungerer som forventet vil du se en enkel nettside for utlisting av
    TODO-oppføringer. *Merk: det er forventet at applikasjonen gir feilmeldinger inntil vi setter opp backend*

2.  Sett opp [smat/backend](https://hub.docker.com/r/smat/backend/) som en tjeneste tilgjengelig via port 8080. Test
    at applikasjonen kjører ved å åpne http://BACKEND:8080/backend/info i en nettleser. Når tjenesten kjører
    skal du få respons med statuskode `200` og JSON-data som innhold.

3.  Nå som vi har både frontend og backend kjørende, er det på tide å få opp en løsning
    for [service discovery](https://www.nginx.com/blog/service-discovery-in-a-microservices-architecture/) slik
    at frontend-applikasjonen kan kommunisere med backend. Sett opp en lastbalanserer som tilgjengeliggjør
    frontend på http://LASTBALANSERER/ og backend på http://LASTBALANSERER/backend. Test at løsningen
    fungerer ved å gå inn på http://LASTBALANSERER og legg inn TODO-oppføringer.

4.  Neste steg er kommunikasjon internt mellom tjenestene. Målet med denne oppgaven er at backend skal ha tilgang på
    en tjeneste som tilgjengeliggjør emneknagger. Sett opp [smat/service](https://hub.docker.com/r/smat/service/)
    som en tjeneste som gir internt nettverk mellom tjenestene tilgang til port 8080 og konfigurer backend
    til å bruke tag service ved å passere inn miljøvariabelen `SERVICE_ENDPOINT`. Test at tjenesten er satt
    opp riktig ved å gå inn på http://LASTBALANSERER og sjekk at du får tilgang på en en liste med emneknagger
    som kan brukes på nye TODO-oppføringer.

5.  Frem til nå har vi lagret TODO-oppføringene i en in-memory database som forsvinner når
    backend-tjeneste stoppes. I denne oppgaven skal vi legge til persistent lagring ved å innføre
    en ekstern database. Stopp alle instanser av backend, for så å starte de opp igjen. Observer
    at huskelisten nå er tømt. Fiks problemet ved å skifte ut in-memory database med PostgreSQL
    eller MySQL. Koblingen mellom backen og database settes opp ved hjelp av miljøvariablene
    `JDBC_URL`, `JDBC_USERNAME` og `JDBC_PASSWORD`, se seksjonen "Applikasjoner" for mer informasjon
    om miljøvariablene. Sjekk at persistent lagring fungerer ved å ta ned backend-tjeneste.

6.  Sjekk hvordan skalering fungerer ved å øke og minke antallet instanser av backend
    og tag service. Hvor kjører de repliserte instansene? Hva skjer når du skalerer opp/ned?
    Fungerer fortsatt kommunikasjonen mellom backend og tag service? Hva skjer hvis du tar
    ned en vilkårlig node?

7.  Bygg en ny versjon av frontend ved å endre på teksten i HTML-koden (koden ligger i katalogen `frontend`).
    Rull ut ny versjon og sjekk at endringene finnes på http://LASTBALANSERER. Dette bør gjøres som en nedetidsfri
    deploy.

Utvikling
=========

```bash
# Start backend-appen i IntelliJ
npm install
node dev.js

# Gå til localhost:3000
```
