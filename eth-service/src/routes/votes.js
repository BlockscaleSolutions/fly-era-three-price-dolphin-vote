const argv = require('../argv');
const errors = require('restify-errors');
const log = require('../logger');
const { Router } = require('restify-router');

const { admin, initContracts, estimateGas } = require('../web3');
const gasBuffer = argv['gas-buffer'];

let voteRegistry;

initContracts().then(contracts => {
  voteRegistry = contracts.voteRegistry;
});


const router = new Router();

/**
 * Create a new vote on-chain.
 * @param {Number} votesPerParticipant Number of votes allocated to each participant.
 * @param {Number} duration            Duration of the vote is milliseconds.
 * @param {String} id                  db id of this vote.
 * @param {String} participantsRoot    Merkle root of the participant list, 32 byte.
 * @param {Array}  contentHash         IPFS hash of the content.
 * @returns {Object} txHash
 */
async function createVote(req, res, next) {
  try {
    const gas = await estimateGas(voteRegistry, 'createVote', req.body);

    log.info({ module: 'eth' }, `Gas estimation for transaction is ${gas}`);

    const txHash = await voteRegistry.createVote(
      ...Object.values(req.body),
      {
        from: admin,
        gas: gas + gasBuffer,
      },
    );

    log.info({ module: 'eth' }, `Successfully sent transaction to create a vote ${req.body.id}`);
    res.send(201, { txHash });
    return next();
  } catch (err) {
    return next(err);
  }
}

// ROUTES
router.post({ path: '/createVote', version: '1.0.0' }, createVote);

module.exports = router;
