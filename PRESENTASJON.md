Presentasjon
============

Intro
-----

Vi skal prøve ut noen orkestreringsplattformer og deretter sammenligne de med hverandre. Sammenligningsgrunnlaget er en applikasjon vi skal deploye på plattformen.

Du kan velge mellom:
* Kubernetes
* Nomad
* Docker Swarm
* Mesos, om du liker motgang i livet

Se underkatalogene for hver plattform for detaljer.

Dette er først og fremst for å få litt erfaring med plattformene. Vi har ikke nødvendigvis svarene på alt. Feiling er også læring. ;)

Applikasjonen
-------------

En enkel Todo-app

### Frontend:
HTML, JS og CSS servert fra en nginx-container
Snakker med backenden over HTTP.

```docker pull smat/frontend```

### Backend:
Lagrer todos enten in-memory eller i en database (om databasemiljøvariablene er satt)

```docker pull smat/backend```

Konfigurasjon for databasen:
```
JDBC_URL=<url>
JDBC_USERNAME=<username>
JDBC_PASSWORD=<password>
```

Environment variables enabling tags (i.e. if this is set, the backend will talk to the service):
Miljøvariabler som skrur på tags (dvs. om denne er satt så vil backend-en snakke med service-en):
```
SERVICE_ENDPOINT=http://<host-or-IP>:<port-the-service-is-exposed-on>
```

### Service:
Har litt tags
```docker pull smat/service```
