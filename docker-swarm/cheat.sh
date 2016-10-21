#!/usr/bin/env sh

set -o verbose

#
# Oppsett
#

# Opprett en docker machine for oppsett
if ! docker-machine env default > /dev/null 2>&1; then
    docker-machine create default --driver virtualbox
fi
eval `docker-machine env default`

# Swarm environment
if [ -z "$SWARM_TOKEN" ]; then
    if [ ! -f "env.sh" ]; then
        echo "export SWARM_TOKEN=`docker run swarm create`" > env.sh
    fi
    . env.sh
fi

# Master node
if ! docker-machine env swarm-master > /dev/null 2>&1; then
    docker-machine create \
        --driver virtualbox \
        --engine-label dc=a \
        --swarm \
        --swarm-master \
        --swarm-discovery token://$SWARM_TOKEN \
        swarm-master
fi

# Agent 1
if  ! docker-machine env swarm-1 > /dev/null 2>&1; then
    docker-machine create \
        --driver virtualbox \
        --engine-label dc=a \
        --swarm \
        --swarm-discovery token://$SWARM_TOKEN \
        swarm-1
fi

# Agent 2 (merk: --engine-label dc=b)
if  ! docker-machine env swarm-2 > /dev/null 2>&1; then
    docker-machine create \
        --driver virtualbox \
        --engine-label dc=b \
        --swarm \
        --swarm-discovery token://$SWARM_TOKEN \
        swarm-2
fi

#
# Eksempler på kommandoer
#

# List tilgjengelige docker machines
docker-machine ls

# List noder i cluster
docker run swarm list token://$SWARM_TOKEN

# Koble til master
eval `docker-machine env --swarm swarm-master`
docker info

# Kjør en kommando i cluster
docker run --detach debian sleep 10
docker ps

# Kjør tre stk. nginx-noder
docker run --detach --publish 80:80 nginx
docker run --detach --publish 80:80 nginx
docker run --detach --publish 80:80 nginx

# Kjør postgres i datasenter b
docker run --detach --env constraint:dc==b postgres
docker run --detach --env constraint:dc==b postgres

# Kjører postgres i noder som har region som starter på europe
docker run --detach --env constraint:region==europe* postgres

#
# Oppsett av tjenester
#

# Bygg backend
cd ../backend
mvn install # TODO Gjør dette i container?
docker build -t backend:latest .
cd -

# Start backend
backend=`docker run --detach --publish-all backend`
docker port $backend

# Bygg frontend
cd ../frontend;
./build.sh;
cd -

# Start frontend
frontend=`docker run --detach --publish-all frontend-nginx`
docker port $frontend

# TODO Koble sammen frontend og backend med network overlay
