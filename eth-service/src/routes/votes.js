const db = require('../db/api');
const errors = require('restify-errors');
const log = require('../logger');
const { Router } = require('restify-router');

const router = new Router();

/**
 * Create a new vote saving data in the db and ipfs.
 * @param {Array} participantIds         Array of ids that may participate.
 * @param {Number} votesPerParticipant   Number of votes allocated to each participant.
 * @param {Number} duration              Duration of the vote is milliseconds
 * @param {Array}  content               Array of objects representig the content of the vote.
 *                                       ie. questions and options.
 * @returns {Object} id, participant root, content ipfs hash
 */
async function createVote(req, res, next) {
  try {
    const response = await db.createVote(...Object.values(req.body));
    res.send(201, response);
    return next();
  } catch (err) {
    return next(err);
  }
}

// ROUTES
router.post({ path: '/createVote', version: '1.0.0' }, createVote);

module.exports = router;
