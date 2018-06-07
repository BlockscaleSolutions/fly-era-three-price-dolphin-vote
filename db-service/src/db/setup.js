const config = require('./config');
const log = require('../logger');
const r = require('rethinkdb');

/**
 * Configure the db if required
 * @param {Object} conn Connection with db instance.
 * @param {String} dbName Name of the db to create.
 */
async function setup(conn, dbName) {
  let table;

  // get list of existing databases
  const dbList = await r.dbList().run(conn);

  // check if db exists, otherwise create it
  if (dbList.indexOf(dbName) === -1) {
    log.info({ module: 'db' }, `Database ${dbName} not found... creating now...`);
    await r.dbCreate(dbName).run(conn);
    log.info({ module: 'db' }, `Database created.`);
  }

  // Init this db as the default
  conn.use(dbName);

  try {
    return await createTables(conn);
  } catch (err) {
    log.error({ module: 'db' }, `Error creating tables: ${err.message}`);
  }
};

/**
 * Promisified table creation
 * @param {Object} conn db connection.
 * @returns {Promise}
 */
async function createTables(conn) {
  let table;

  return new Promise(async (resolve, reject) => {
    // get list of tables and compare against required
    const requiredTables = config.tables;
    const tableList = await r.tableList().run(conn);

    for (let i = 0, len = requiredTables.length; i < len; i += 1) {
      table = requiredTables[i];

      if (tableList.indexOf(table) === -1) {
        log.info({ module: 'db' }, `Table "${table}" not found... creating now...`);

        await r.tableCreate(table).run(conn);

        log.info({ module: 'db' }, `Table "${table}" created.`);
      }
    }
    resolve(conn);
  });
}

module.exports = setup;
