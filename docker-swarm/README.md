# Docker Swarm

Installasjon bør utføres før fagdag.

## Installasjon

1. Installer [Vagrant](https://www.vagrantup.com/) og [Docker Toolbox](https://www.docker.com/products/docker-toolbox)

2. Oppsett av miljø

```Shell
. cheat.sh
```

## Discovery

Standardmetode er token-basert og går via Docker Hub. Det er også mulig å gi klienten
en liste med IP-adresser, bruke etcd, Consul, eller lignende.

## Docker

Docker er en enklere API for linux container, dvs. namespacing av minnelokasjoner etc.

## Docker Machine

Docker Machine brukes til å administrere flere virtuelle maskiner som kjører docker. Dette
er ikke strengt tatt nødvendig hvis du bruker Linux og tester lokalt, men vil være en fordel
når du skal koble til skyleverandører.

Docker => Docker Machine => Docker Swarm

## Docker Swarm

Docker Swarm brukes til å kjøre kommandoer på noder. Det brukes en "scheduler" for å bestemme
hvilken node kommandoen skal kjøres på.

