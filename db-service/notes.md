# Testing

- need to have a rethink instance running: `docker-compose up rethinkdb`
- run test suite: `yarn test`

## Integration testing
- for automation with nothing running you may run `./scripts/integration-test.sh`
- you may set the build tag, BUILD_TAG, so run against a specific image is you wish,
will default to empty or latest is not specified
  * this can be done with the following: `BUILD_TAG=:test && export BUILD_TAG`  NOTE must inlude :
