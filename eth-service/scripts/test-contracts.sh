#!/usr/bin/env bash

# Exit script as soon as a command fails.
set -o errexit

trap cleanup EXIT

ganache_port=8545

cleanup() {
  if lsof -i :$ganache_port -t  >/dev/null; then
      echo "Killing ganache..."
      pid="$(lsof -i :$ganache_port -t)"
      kill -9 $pid
  else
    echo "Ganache died..."
  fi
}


# Start client, deploy new contracts and then test
start_ganache() {
  ./node_modules/ganache-cli/build/cli.node.js &
}

truffle_migrate() {
  cd truffle && ../node_modules/truffle/build/cli.bundled.js migrate --reset && cd ..
}

truffle_test() {
  cd truffle && ../node_modules/truffle/build/cli.bundled.js test && cd ..
}

# Start client, deploy new contracts and then test
start_ganache
truffle_migrate
truffle_test
