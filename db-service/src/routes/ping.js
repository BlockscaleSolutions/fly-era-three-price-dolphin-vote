//
// All utility related routes
//
const errors = require('restify-errors');
const log = require('../logger');
const { Router } = require('restify-router');

const router = new Router();

/**
 * Test route to see if server is up.
 * @returns {String} pong
 */
async function ping(req, res, next) {
  try {
    res.send('pong');
    return next();
  } catch (err) {
    return next(err);
  }
}

// ROUTES
router.get({ path: '/ping', version: '1.0.0' }, ping);

module.exports = router;
