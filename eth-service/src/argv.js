const argv = require('yargs')
  .option('api-url', { description: 'Location of the api to connect to', default: 'http://localhost:3002', type: 'string' })
  .option('gas-buffer', { description: 'Gas to add on top of web3 estimates', default: 1e5, type: 'number' })
  .option('threads', { description: 'Number of service threads to create', default: 1, type: 'number' })
  .option('server-port', { description: 'Port the server will run on', default: 3002, type: 'number' })
  .option('test-dir', { description: 'Test directory to execute', default: '', type: 'string' })
  .help('help')
  .argv

module.exports = argv
