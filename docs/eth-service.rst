================
Ethereum Service
================

Description
***********
All interaction with the Ethereum blockchain.

====

API
***

Votes
=====

POST createVote
---------------
Creates a new vote on-chain. Returning the txHash.

- Body
**Required**

.. code-block:: javascript

  /**
   * @param {String} id                  db id of this vote.
   * @param {String} participantsRoot    Merkle root of the participant list, 32 byte.
   * @param {Number} votesPerParticipant Number of votes allocated to each participant.
   * @param {Number} duration            Duration of the vote is milliseconds.
   * @param {Array}  contentHash         IPFS hash of the content.
   */

- Success Response

.. code-block:: console

  statusCode: 201
  body: {
          id: 1,
          participantRoot: '16E6BEB3E080910740A2923D6091618CAA9968AEAD8A52D187D725D199548E2C',
          contentHash: 'QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG'
        }

- Error Response

.. code-block:: console

  TODO

- Sample Request

.. code-block:: javascript

  const rp = require('request-promise');
  const respone = await rp({
    url: 'http://localhost:8080/createVote',
    'POST',
    json: true,
    body: {
      participantIds: [
        ['piano tide bottom prize', '0xb5fb419f7d1704e1f2b55ef4f0059d809a60a34e'],
        ['glass year achieve denial', '0x358b47f8d6e4b2f7fa5d39bcadd3007da8d0603d']
      ],
      votersPerParticipant: 1,
      duration: 1000,
      content: [{ 'question': 'Please vote.', 'options': [1, 2, 3] }],
    },
    simple: true
  });

- Sample Response

.. code-block:: javascript

  console.log(response.error);
  undefined

  console.log(response.statusCode);
  201

  console.log(response.body);
  {
    id: '7a6608d3-d46b-4c82-b72c-6e7dc809cf3a',
    participantsRoot: 'FD5BCEE19767767234A4CF869DF0A4EA11B69421F395FD977A4A2AA971D67F89',
    contentHash: 'QmfP35tndu1JNgMxAWgiouHsJ9RspMwTWDX3v2NacSvkTo'
  }
