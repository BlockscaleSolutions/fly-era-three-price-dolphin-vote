const argv = require('../argv');
const errors = require('restify-errors');
const log = require('../logger');
const { Router } = require('restify-router');
const { generateParticipantIds, sendAndCheckRequest } = require('../utils');

const dbUrl = argv['db-url'];
const ethUrl = argv['eth-url'];

const router = new Router();

/**
 * Create a new vote.
 * @param {Array || Number} participants Array of ids that may participate or a
 *                                       number of randomly generated ids to be created.
 * @param {Number} votesPerParticipant   Number of votes allocated to each participant.
 * @param {Number} duration              Duration of the vote is milliseconds
 * @param {Array}  content               Array of objects representig the content of the vote.
 *                                       ie. questions and options.
 * @returns {Object} Vote id and txHash
 */
async function createVote(req, res, next) {
  try {
    const { participants, votersPerParticipant, duration, content } = req.body;

    let participantIds = participants;

    // Generate the ids if the are not passed in
    if (typeof participants === 'number') {
      participantIds = generateParticipantIds(participants);
    }

    // Save the vote to the db to be created
    let payload = { participantIds, votersPerParticipant, duration, content };
    const { id, participantsRoot, contentHash } = await sendAndCheckRequest(dbUrl, 'createVote', 'POST', request, 201);

    // Save the vote on-chain, data returned from db
    payload = { id, participantsRoot, contentHash, votesPerParticipant, duration };
    const ethResponse = await sendAndCheckRequest(ethUrl, 'createVote', 'POST', payload, 201);

    const response = {
      id: dbResponse.id,
      txHash: ethResponse.txHash
    }

    res.send(201, response);
    return next();
  } catch (err) {
    return next(err);
  }
}

// ROUTES
router.post({ path: '/createVote', version: '1.0.0' }, createVote);

module.exports = router;
