const rp = require('request-promise');

/**
 * Send an http request.
 * @param {String} endpoint API endpoint.
 * @param {String} method   Method to hit endpoint with, GET, POST, PUT, DELETE.
 * @param {Object} body     Body to send with request.
 * @returns {Object}        Response(entire object) or error.
 */
async function sendRequest(apiUrl, endpoint, method, body) {
  const options = {
    url: `${apiUrl}/${endpoint}`,
    method,
    json: true,
    resolveWithFullResponse: true,
    body,
    simple: true,
  };
  try {
    return await rp(options);
  } catch (err) {
    return err;
  }
}

module.exports = sendRequest;
