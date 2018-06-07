module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  networks: {
    // Default, should be interfaced with testrpc for test suite to pass
    development: {
      host: 'localhost',
      port: 8545,
      network_id: '*', // Match any network id
      gas: 6.7e6,
	    gasPrice: 1e9
    },
  }
};
