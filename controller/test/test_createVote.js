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

  describe('Creating a vote with valid fields and a number of participants', () => {
    it.only('should randomly generate the correct amount of ids', async () => {
      const vote = {
        participants: 10,
        votersPerParticipant: 1,
        duration: 1000,
        content: [{ 'question': 'Please vote.', 'options': [1, 2, 3] }],
      };

      const res = await sendRequest(apiUrl, 'createVote', 'POST', vote);
      const { statusCode, body } = res;

      assert.strictEqual(statusCode, 201, 'statusCode incorrect');
      assert.strictEqual(body, 'pong', 'body incorrect');
    });
  });
});
