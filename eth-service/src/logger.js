//
// Base logger utilized by all service modules
//
const bunyan = require('bunyan');
const cluster = require('cluster');
const PrettyStream = require('bunyan-prettystream');

const prettyStdOut = new PrettyStream();
prettyStdOut.pipe(process.stdout);

let name = 'eth-service';

// If a worker thread append id to name
if (cluster.worker) {
  name = `eth-service-${cluster.worker.id}`;
}

// Init the actual logger
const log = bunyan.createLogger({
  name,
  serializers: bunyan.stdSerializers,
  streams: [
    // { TODO turn on logging for prod
      // path: './server.log',
      // level: 'debug',
    // },
    {
      stream: prettyStdOut,
      level: 'debug',
    },
  ],
});

// Define at runtime
log.fields.module = undefined;

module.exports = log;
