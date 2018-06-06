const argv = require('../argv');
const IPFS = require('ipfs-api');
const log = require('../logger');

const host = argv['ipfs-host'];
const port = argv['ipfs-port'];

const ipfs = new IPFS({ host, port, protocol: 'https' });

/**
 * Add raw content to ipfs.
 * @param {Array} content Raw content [{ 'question': '', 'options': [] }]
 * @returns {String} ipfs multihash
 */
async function addContentToIpfs(content) {
  log.info({ module: 'db' }, 'Adding content to ipfs...');

  const bufferedData = new Buffer(JSON.stringify(content));
  const result = await ipfs.add(bufferedData);
  const dataHash = result[0].hash;

  log.info({ module: 'db' }, `Data successfully added to ipfs at: ${dataHash}`);
  return dataHash;
}

/**
 * Get raw content from ipfs.
 * @param {String} ipfsHash Ipfs hash the content is located at.
 * @returns {Array} Raw content data
 */
async function getContentFromIpfs(ipfsHash) {
  const bufferedContent = await ipfs.cat(ipfsHash);
  const content = JSON.parse(bufferedContent.toString('latin1'));
  return content;
}

module.exports = {
  addContentToIpfs,
  getContentFromIpfs,
};
