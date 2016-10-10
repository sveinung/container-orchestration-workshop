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

Oppgaver:



