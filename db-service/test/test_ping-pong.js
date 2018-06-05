const { assert } = require('chai');
const app = require('../src/server');
const { sendRequest } = require('../src/utils');
const { API_URL, SERVER_PORT } = require('../src/constants');

let server;

describe('/assets GET', () => {
  before(async () => {
    server = app.listen(SERVER_PORT, () => {});
  });

  after(() => {
    server.close();
  });

  it('should pong', async () => {
    const res = await sendRequest(API_URL, 'ping', 'GET');
    const { statusCode, body } = res;

    assert.strictEqual(statusCode, 200, 'statusCode incorrect');
    assert.strictEqual(body, 'pong', 'body incorrect');
  });
});
