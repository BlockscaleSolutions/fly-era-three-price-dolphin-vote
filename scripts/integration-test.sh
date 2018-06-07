#! /bin/bash

trap cleanup EXIT

cleanup() {
  cd deploy && docker-compose down
}

echo "Integration testing in progress..."

echo "Starting a rethinkdb instance..."
cd deploy && docker-compose up rethinkdb &

echo "Giving the db instance a few moments to get settled..."
sleep 5s

echo "DB Integration testing in progress..."
docker run --net=host blockchainlg/kc-db-service${BUILD_TAG} yarn integration-test

echo "Controller Integration testing TODO..."
# docker run --net=host blockchainlg/kc-controller${BUILD_TAG} yarn integration-test
