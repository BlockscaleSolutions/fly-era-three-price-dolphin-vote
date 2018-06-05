const { assert } = require('chai');
const app = require('../src/server');
const { sendRequest } = require('../src/utils');
const argv = require('../src/argv');

const apiUrl = argv['api-url'];
const serverPort = argv['serverPort'];

let server;

describe('/assets GET', () => {
  before(async () => {
    server = app.listen(serverPort, () => {});
  });

  after(() => {
    server.close();
  });

  it('should pong', async () => {
    const res = await sendRequest(apiUrl, 'ping', 'GET');
    const { statusCode, body } = res;

    assert.strictEqual(statusCode, 200, 'statusCode incorrect');
    assert.strictEqual(body, 'pong', 'body incorrect');
  });
});
