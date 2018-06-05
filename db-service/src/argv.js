const argv = require('yargs')
  .option('api-url', { description: 'Location of the api to connect to', default: 'http://localhost:3000', type: 'string' })
  .option('threads', { description: 'Number of service threads to create', default: 1, type: 'number' })
  .option('db-host', { description: 'Host of database to connect to', default: 'localhost', type: 'string' })
  .option('db-port', { description: 'Port to connect to', default: 28015, type: 'number' })
  .option('db-name', { description: 'Name of database to create and use', default: 'test-vote', type: 'string' })
  .option('server-port', { description: 'Port the server will run on', default: 3000, type: 'number' })
  .help('help')
  .argv

module.exports = argv
