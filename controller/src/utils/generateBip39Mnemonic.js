const bip39 = require('bip39');
const hdkey = require('ethereumjs-wallet/hdkey');
const crypto = require('crypto');

/**
 * Generate a new collection of ids.
 * @param {Number} numberOfIds Number of ids to generate.
 * @returns {Array} Generated ids.
 */
function generateBip39Mnemonic(mnemonicLength=4) {
  const randomBytes = crypto.randomBytes(16) // 128 bits is enough
  // your 12 word phrase
  const mnemonic = bip39.entropyToMnemonic(randomBytes.toString('hex'));

  // Crop to the desired word length then generate address
  const croppedMnemonic = mnemonic.split(' ').slice(0, mnemonicLength).join(' ');
  const hdwallet = hdkey.fromMasterSeed(bip39.mnemonicToSeed(croppedMnemonic));
  const path = "m/44'/60'/0'/0/0";
  const wallet = hdwallet.derivePath(path).getWallet();
  const address = `0x${wallet.getAddress().toString('hex')}`;

  return [croppedMnemonic, address];
}

module.exports = generateBip39Mnemonic;
