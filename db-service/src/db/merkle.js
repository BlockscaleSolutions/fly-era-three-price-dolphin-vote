const log = require('../logger');
const merkle = require('merkle');

/**
 * Create a merkle tree from an array of data.
 * @param {Array} dataArray Array of content to create a merkle tree from.
 * @param {Array} hashingAlgo Hash algorithm to use, default sha256
 * @returns {String} Merkle root
 */
async function createTree(dataArray, hashingAlgo='sha256') {
  log.info({ module: 'db' }, `Creating a merkle tree for ${dataArray.length} items...`);

  const tree = merkle(hashingAlgo).sync(dataArray);

  log.info({ module: 'db' }, `Merkle tree created root: ${tree.root()}`);
  return tree.root();
}

module.exports = {
  createTree,
}
