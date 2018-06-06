const argv = require('./argv');
const db = require('./db/api');
const corsMiddleware = require('restify-cors-middleware');
const log = require('./logger.js');
const restify = require('restify');
const { getMethodAPI, getIP } = require('./utils');

// routers
const votesRouter = require('./routes/votes');

// server config
const server = restify.createServer({
  log,
  version: '1.0.0',
  versions: ['1.0.0'],
  name: 'template-service',
});

start();

async function start() {
  // Start db instance for each server
  await db.init();

  const cors = corsMiddleware({
    preflightMaxAge: 5, // optional
    origins: ['*'],
  });

  server.use(restify.plugins.bodyParser({ mapParams: false }));
  server.pre(cors.preflight);
  server.use(cors.actual);

  // log every request
  server.pre((req, res, next) => {
    req.log.info({ req, module: 'api' }, `New request from ${getIP(req)} on ${getMethodAPI(req)}`);
    next();
  });

  // log every error
  server.on('restifyError', (req, res, err, callback) => {
    log.error({ module: 'api', err, version: req.headers['accept-version'] }, `Exception from ${getIP(req)} while requesting ${getMethodAPI(req)}`);
    return callback();
  });

  // apply routes
  votesRouter.applyRoutes(server);
}

module.exports = server;
