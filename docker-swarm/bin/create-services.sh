#!/usr/bin/env sh

eval `docker-machine env manager1`

docker service create \
  --name tag-service \
  --network workshop \
  tag-service

docker service create \
  --name backend \
  --network workshop \
  --env SERVICE_ENDPOINT='http://tag-service:8080' \
  backend

docker service create \
  --name frontend \
  --network workshop \
  frontend

docker service create \
  --name public-web \
  --network workshop \
  --publish 80:80 \
  public-web
