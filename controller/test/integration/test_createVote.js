const { assert } = require('chai');
const app = require('../../src/server');
const { sendRequest } = require('../../src/utils');
const argv = require('../../src/argv');
const fs = require('fs');
const nock = require('nock');

const dbCreateVoteSuccess = JSON.parse(fs.readFileSync('./test/mocks/db-createVote-response.json'));
const ethCreateVoteSuccess = JSON.parse(fs.readFileSync('./test/mocks/eth-createVote-response.json'));

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

  describe('Creating a vote with valid fields and a number of participants', () => {
    it('should return the vote id and tx hash', async () => {

      // mock responses
      nock(argv['db-url'])
        .post('/createVote')
        .reply(201, dbCreateVoteSuccess);

      nock(argv['eth-url'])
        .post('/createVote')
        .reply(201, ethCreateVoteSuccess);

        const vote = {
          participants: 10,
          votersPerParticipant: 1,
          duration: 1000,
          content: [{ 'question': 'Please vote.', 'options': [1, 2, 3] }],
        };

      const res = await sendRequest(apiUrl, 'createVote', 'POST', vote);

      const { statusCode, body } = res;

      assert.strictEqual(statusCode, 201, 'statusCode incorrect');
      assert.deepEqual(
        body,
        {
          id: dbCreateVoteSuccess.id,
          txHash: ethCreateVoteSuccess.txHash,
        },
        'body incorrect'
      );
    });
  });
});
