Nomad
=====


```
vagrant up
vagrant ssh
```

https://www.nomadproject.io/intro/getting-started/running.html

https://www.nomadproject.io/intro/getting-started/jobs.html


Tag med `urlprefix-/` for å få Fabio til å sette opp routing til appen

iptables -N DOCKER

```bash
git clone https://github.com/eBayClassifiedsGroup/KomPaaS.git

sudo -i
curl -L "https://github.com/docker/compose/releases/download/1.8.1/docker-compose-$(uname -s)-$(uname -m)" > /usr/local/bin/docker-compose
chmod +x /usr/local/bin/docker-compose
exit

docker-compose up -d
```


```

sudo nomad agent -dev

# Show number of nodes
nomad node-status

# Show members of servers
nomad server-members

```


```
nomad init

nomad start example.nomad

nomad status example

nomad plan example.nomad

nomad stop example

```
