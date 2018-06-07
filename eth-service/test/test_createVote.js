const argv = require('../src/argv');
const { assert } = require('chai');
const app = require('../src/server');
const { sendRequest } = require('../src/utils');

const apiUrl = argv['api-url'];
const serverPort = argv['serverPort'];

let server;

describe('/createVote POST', () => {
  before(async () => {
    server = app.listen(serverPort, () => {});
  });

  after(() => {
    server.close();
  });

  describe('creating a vote with valid parameters', () => {
    const vote = {
      votersPerParticipant: 1,
      duration: 1000,
      id: '7a6608d3-d46b-4c82-b72c-6e7dc809',
      participantsRoot: '0x16E6BEB3E080910740A2923D6091618CAA9968AEAD8A52D187D725D199548E2C',
      contentHash: 'QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG',
    };

    it('should return a 201', async () => {
      const res = await sendRequest(apiUrl, 'createVote', 'POST', vote);
      const { statusCode } = res;

      assert.strictEqual(statusCode, 201, 'statusCode incorrect');
    });

    it('should return the txHash', async () => {
      const res = await sendRequest(apiUrl, 'createVote', 'POST', vote);
      const { txHash } = res.body;

      assert.strictEqual(txHash.length, 66, 'txHash is not valid');
    });
  });
});
