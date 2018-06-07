const log = require('../logger');
const r = require('rethinkdb');

/**
 * Initialize a connection with a db, will continue to retry.
 * @param {String} host DB host url
 * @param {Number} port Port to connect to.
 * @param {Number} timeout Number of seconds to wait before giving up.
 * @returns {Object} Initialized db connection.
 */
async function connect(host, port, timeout=60) {
  log.info({ module: 'db' }, `Try to create a db connection...`);

  return new Promise(async (resolve, reject) => {
    let conn;
    let retries = 0;

    const connInterval = setInterval(async () => {
      try {
        conn = await r.connect({ host, port });
        clearInterval(connInterval);
        resolve(conn);
      } catch (err) {
        log.info({ module: 'db' }, `Unable to connect to db, retrying... ${retries}s... ${err.message}`);

        // Continue to retry until one is found
        retries += 1;
        
        if (retries >= timeout) {
          log.error({ module: 'db' }, `Unable to create a connection to the db, please ensure it is running.`);
          clearInterval(connInterval);
          reject(err);
        }
      }
    }, 1000);
  });
}

module.exports = connect;
