#!/usr/bin/env sh

eval `docker-machine env manager1`
mkdir -p images

# Backend
cd ../backend
mvn package
docker build -t backend:latest .
cd -
docker save backend:latest > images/backend.tar

# Frontend
cd ../frontend
docker build -t frontend:latest .
cd -
docker save frontend:latest > images/frontend.tar

# Tag service
cd ../service
mvn package
docker build -t tag-service:latest .
cd -
docker save tag-service:latest > images/tag-service.tar

# Public web
cd ../public-web
docker build -t public-web:latest .
cd -
docker save public-web:latest > images/public-web.tar
