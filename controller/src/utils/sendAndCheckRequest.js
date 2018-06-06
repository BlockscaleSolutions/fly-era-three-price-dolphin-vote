const errors = require('restify-errors');
const sendRequest = require('./sendRequest');

/**
 * Send an http request catch and check the response.
 */
async function sendAndCheckRequest(url, endPoint, method, payload, expectedStatusCode) {
  const { statusCode, body, error } = await sendRequest(url, endPoint, method, payload);

  if (statusCode !== expectedStatusCode) {
    throw new errors.BadRequestError(
      `
      Error sending request: ${method} ${url}/${endPoint} \n
      payload: ${JSON.stringify(payload)}\n
      ${error}
      `
    );
  }

  return body;
}

module.exports = sendAndCheckRequest;
