const CryptoJS = require('crypto-js');
const log = require('../logger');
const r = require('rethinkdb');

const secret = process.env.SECRET || 'test'; // TODO define safer location for the secret then env for prod

/**
 * Add all new users if they do not exist.
 * @param {Object} conn db connection.
 * @param {Array} users List of users to create [address, mnemonic].
 */
async function createUsers(conn, users) {
  for (let i = 0, len = users.length; i < len; i += 1) {
    await createUser(conn, users[i]);
  }
}

/**
 * Add a single user to the db if they do not exist.
 * @param {Object} conn active db conneciton.
 * @param {Array} userData Data for the user to be added, [mnemonic, address]
 * @param {String} role Role of this user, ie. vote, admin, etc.
 */
async function createUser(conn, userData, role='voter') {
  const [key, id] = userData;

  const user = {
    id,
    key: CryptoJS.AES.encrypt(key, secret).toString(), // do not store key in clear text
    votes: [], // Vote is one to many voters so userful to save this list
    role,
  };

  const userExists = await r.table('users').get(id).run(conn);

  // Add the user if they do not exist
  if (!userExists) {
    log.info({ module: 'db' }, `Adding user: ${id}`);
    await r.table('users').insert(user).run(conn);
  }
}

module.exports = createUsers;
