#!/usr/bin/env sh

eval `docker-machine env manager1`

docker service create \
    --name database \
    --network workshop \
    --env POSTGRES_PASSWORD=heihei \
    --env PGDATA=/var/lib/postgresql/data \
    --constraint 'node.role == manager' \
    --mount 'type=volume,source=postgres-volume,destination=/var/lib/postgresql/data' \
    postgres

docker service create \
  --name tag-service \
  --network workshop \
  tag-service

docker service create \
  --name backend \
  --network workshop \
  --env SERVICE_ENDPOINT='http://tag-service:8080' \
  --env JDBC_URL='jdbc:postgresql://database:5432/postgres' \
  --env JDBC_USERNAME='postgres' \
  --env JDBC_PASSWORD='heihei' \
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
