#!/usr/bin/env bash

# Exit script as soon as a command fails.
set -o errexit

./scripts/test-contracts.sh
./scripts/test-api.sh
