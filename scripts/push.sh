#! /bin/bash

echo "Pushing images with tag:" $BUILD_TAG
echo "Push in progress..."

docker login --username ${DOCKER_USER} --password ${DOCKER_PASS}

docker push blockchainlg/kc-controller${BUILD_TAG}
docker push blockchainlg/kc-db-service${BUILD_TAG}
docker push blockchainlg/kc-eth-service${BUILD_TAG}
