#!/usr/bin/env sh

if ! docker-machine status manager1; then
  docker-machine create --driver virtualbox manager1
fi

if ! docker-machine status worker1; then
  docker-machine create --driver virtualbox worker1
fi

if ! docker-machine status worker2; then
  docker-machine create --driver virtualbox worker2
fi

if [ -z "`docker network ls | grep workshop`" ]; then
  eval `docker-machine env manager1`
  docker network create \
    --driver overlay \
    workshop
fi
