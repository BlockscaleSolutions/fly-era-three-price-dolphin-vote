#! /bin/bash

trap cleanup EXIT

cleanup() {
  cd ../deploy && docker-compose down
}

echo "Starting a rethinkdb instance..."
cd ../deploy && docker-compose up rethinkdb &  # not running as daemon, -d, so we can see terminal output

echo "Giving the db instance a few moments to get settled..."
sleep 5s

echo "DB Integration testing in progress..."

# run test suite against the container
docker run --net=host blockchainlg/kc-db-service${BUILD_TAG} yarn integration-test
