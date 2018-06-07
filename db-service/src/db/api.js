const argv = require('../argv');
const log = require('../logger');
const r = require('rethinkdb');
const { setup, createUsers, connect } = require('./index');
const ipfs = require('./ipfs');
const merkle = require('./merkle');

let conn;

/**
 * Initialize a new db connection and create setup the db where required.
 */
async function init() {
  try {
    log.info({ module: 'db' }, 'Creating new db connection...');

    const host = argv['db-host'];
    const port = argv['db-port'];

    conn = await connect(host, port);

    const dbName = argv['db-name'];
    conn = await setup(conn, dbName);

    log.info({ module: 'db' }, 'Successfully conncted to db.');
  } catch (err) {
    log.error({ module: 'db', err }, `db initilization error... ${err.message}`)
    throw err
  }
}

/**
 * Create a new vote.
 * @param {Array} participantIds         Array of ids that may participate.
 * @param {Number} votesPerParticipant   Number of votes allocated to each participant.
 * @param {Number} duration              Duration of the vote is milliseconds
 * @param {Array}  content               Array of objects representig the content of the vote.
 *                                       ie. questions and options.
 * @returns {Object} id, participant root, content ipfs hash
 */
async function createVote(participantIds, votesPerParticipant, duration, content) {
  // First add all participants
  await createUsers(conn, participantIds);

  // Push the raw content to IPFS
  const contentHash = await ipfs.addContentToIpfs(content);

  // Create a merkle tree of the participant list, returning the root
  const participantsRoot = await merkle.createTree(participantIds);

  // Finally add the vote to the db
  const vote = {
      participantIds,
      participantsRoot,
      votesPerParticipant,
      duration,
      contentHash,
      receipts: [],
      active: false
  };

  const result = await r.table('votes').insert(vote).run(conn);
  const id = result['generated_keys'][0];

  return { id, participantsRoot, contentHash };
}

module.exports = {
  init,
  createVote,
};
