# Testing

- A script, `scripts/test` has been created to boot all dependencies before running the
test suite.  The script will:
  * start a test Ethereum client, ganache
  * migrate contracts to test network, `truffle migrate`
  * run the test suite

* To run the entire test suite: `yarn test`
* To run the api test suite: `yarn test-api`
* To run the contract test suite: `yarn test-contract`
