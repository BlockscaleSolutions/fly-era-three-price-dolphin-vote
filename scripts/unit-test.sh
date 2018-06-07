#! /bin/bash

echo "Unit testing in progress..."

docker run blockchainlg/kc-controller${BUILD_TAG} yarn unit-test
# docker run blockchainlg/kc-db-service:${BUILD_TAG} yarn unit-test TODO
docker run blockchainlg/kc-eth-service${BUILD_TAG} yarn test
