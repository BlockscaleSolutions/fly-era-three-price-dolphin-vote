/**
 * Enable waits by passing in number of ms to wait for.
 * Usage: await utils.sleep(1000) -> wait for 1s.
 * @param {Integer} ms Number of milliseconds to sleep for.
 * @returns {Promise}  To be resolved after set timeout.
 */
function sleep(ms = 0) {
  return new Promise(r => setTimeout(r, ms));
}

module.exports = sleep;
