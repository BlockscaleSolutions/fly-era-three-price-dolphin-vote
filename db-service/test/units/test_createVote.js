const argv = require('../../src/argv');
const { assert, expect } = require('chai');
const app = require('../../src/server');
const nock = require('nock');
const { sendRequest, sleep } = require('../../src/utils');

const apiUrl = argv['api-url'];
const serverPort = argv['serverPort'];

let server;

describe('/createVote POST', () => {
  before(async () => {
    server = app.listen(serverPort, () => {});

    // Small sleep to let db catchup
    await sleep(1000);
  });

  after(() => {
    server.close();
  });

  describe('creating a vote with valid parameters', () => {
    const vote = {
      participantIds: [
        ['piano tide bottom prize', '0xb5fb419f7d1704e1f2b55ef4f0059d809a60a34e'],
        ['glass year achieve denial', '0x358b47f8d6e4b2f7fa5d39bcadd3007da8d0603d']
      ],
      votersPerParticipant: 1,
      duration: 1000,
      content: [{ 'question': 'Please vote.', 'options': [1, 2, 3] }],
    };

    it('should return a 201', async () => {
      const res = await sendRequest(apiUrl, 'createVote', 'POST', vote);
      const { statusCode } = res;

      assert.strictEqual(statusCode, 201, 'statusCode incorrect');
    });

    it('should return the vote id', async () => {
      const res = await sendRequest(apiUrl, 'createVote', 'POST', vote);
      const { id } = res.body;

      assert.isNotNull(id, 'id is not valid');
    });

    it('should push the content to ipfs and return the hash', async () => {
      const res = await sendRequest(apiUrl, 'createVote', 'POST', vote);
      const { contentHash } = res.body;

      // multihash representation of sha256 in base58
      assert.strictEqual(contentHash.length, 46, 'content hash length is not correct');
      expect(contentHash, 'content hash in incorrect format').to.contain('Qm');
    });

    it('should create a merkle tree of participants and return the root', async () => {
      const res = await sendRequest(apiUrl, 'createVote', 'POST', vote);
      const { participantsRoot } = res.body;

      // Sha256 = 32 bytes = 64 chars
      assert.strictEqual(participantsRoot.length, 64, 'merkle root length is not correct');
    });
  });
});
