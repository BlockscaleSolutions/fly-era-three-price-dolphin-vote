#! /bin/bash

cd controller && yarn &
cd db-service && yarn &
cd eth-service && yarn &

echo "Install in progress..."
