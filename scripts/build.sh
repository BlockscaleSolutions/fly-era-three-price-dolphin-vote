#! /bin/bash

cd controller && yarn build &
cd db-service && yarn build &
cd eth-service && yarn build &

echo "Build in progress..."
