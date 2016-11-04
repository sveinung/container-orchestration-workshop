# Mesos

## Links

- (Minimesos)[https://minimesos.org/]
- (Install instructions)[http://minimesos.readthedocs.io/en/0.10.2/#installing]
- (Mesos documentation)[http://mesos.apache.org/documentation/latest/]


## Minimesos

Minimesos er et vektøy som oppretter et Mesos cluster, kjørende i Docker containere. 

Hvis du har en Mac eller Windows så må du bruke (docker-machine)[https://docs.docker.com/machine/] for å kjøre Minimesos.

Marathon UI: http://<docker-machine>:8080/
Mesos UI: http://<docker-machine>:5050/

Beskriv containeren du ønsker å kjøre i en JSON-fil.

Eks: 

```
{
    "id": "application",
    "mem": 128,
    "cpus": 0.5,
    "instances": 1,
    "container": {
        "type": "DOCKER",
        "docker": {
            "network": "BRIDGE",
            "image": "some/application",
            "portMappings": [
                { "containerPort": 80, "protocol": "tcp" }
            ]
        }
    }
}
```

Start deployment av containeren med:

`$ minimesos install --marathonFile application.json`