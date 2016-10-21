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
docker run -d debian sleep 10
docker ps

# Kjør opp tre stk. nginx-noder
docker run -d -p 80:80 nginx
docker run -d -p 80:80 nginx
docker run -d -p 80:80 nginx
