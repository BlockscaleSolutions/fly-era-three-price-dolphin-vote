#! /bin/bash

echo "Deployment in progress..."

# Push latest images
echo "Pushing latest images..."
BUILD_TAG=:latest
export BUILD_TAG
./scripts/push.sh

# Deploy containers to staging box
echo "TODO time to deploy the containers to a live box..."
