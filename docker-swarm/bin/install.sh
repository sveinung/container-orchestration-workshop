#!/usr/bin/env sh

if ! docker-machine -v > /dev/null 2>&1; then
  curl --location \
    https://github.com/docker/machine/releases/download/v0.8.2/docker-machine-`uname -s`-`uname -m` \
    > /usr/local/bin/docker-machine && \
    chmod +x /usr/local/bin/docker-machine
fi
