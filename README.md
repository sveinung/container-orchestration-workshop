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


Oppgaver:
=========



Utvikling
=========

```bash
# Start backend-appen i IntelliJ
npm install
node dev.js

# Gå til localhost:3000
```
