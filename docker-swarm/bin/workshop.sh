#!/usr/bin/env sh

./bin/install.sh
./bin/create-nodes.sh
./bin/build-images.sh
./bin/distribute-images.sh
./bin/create-services.sh

echo "Listening to port 80. Open http://`docker-machine ip manager1` in your web browser."
