const log = require('./logger');
const r = require('rethinkdb');
const argv = require('./argv');

let connection;

async function init() {
  log.info({ module: 'db' }, 'Creating new db connection...');

  const host = argv['db-host'];
  const port = argv['db-port'];

  r.connect({ host , port }, (err, conn) => {
      if (err) throw err;
      connection = conn;
      log.info({ module: 'db' }, 'Successfully conncted to db.');
  });
}

module.exports = {
  init,
};
