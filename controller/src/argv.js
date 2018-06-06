const argv = require('yargs')
  .option('api-url', { description: 'Location of the api to connect to', default: 'http://localhost:3001', type: 'string' })
  .option('threads', { description: 'Number of service threads to create', default: 1, type: 'number' })
  .option('db-url', { description: 'db service endpoint', default: 'http://localhost:3000', type: 'string' })
  .option('eth-url', { description: 'eth service endpoint', default: 'http://localhost:3002', type: 'string' })
  .option('server-port', { description: 'Port the server will run on', default: 3001, type: 'number' })
  .option('test-dir', { description: 'Test directory to execute', default: 'units', type: 'string' })
  .help('help')
  .argv

module.exports = argv
