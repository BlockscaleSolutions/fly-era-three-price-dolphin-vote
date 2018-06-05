const generateBip39Mnemonic = require('./generateBip39Mnemonic');

/**
 * Generate a new collection of ids.
 * @param {Number} numberOfIds Number of ids to generate.
 * @returns {Array} Generated ids.
 */
function generateParticipantIds(numberOfIds) {
  let ids = [];

  for (let i = 0; i < numberOfIds; i += 1) {
    ids.push(generateBip39Mnemonic());
  }

  return ids;
}

module.exports = generateParticipantIds;
