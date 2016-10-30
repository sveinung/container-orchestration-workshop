#!/usr/bin/env sh

eval `docker-machine env worker1`
docker load < images/backend.tar
docker load < images/frontend.tar
docker load < images/public-web.tar
docker load < images/tag-service.tar

eval `docker-machine env worker2`
docker load < images/backend.tar
docker load < images/frontend.tar
docker load < images/public-web.tar
docker load < images/tag-service.tar
