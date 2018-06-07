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
   * @param {Number} votesPerParticipant Number of votes allocated to each participant.
   * @param {Number} duration            Duration of the vote is milliseconds.
   * @param {String} id                  db id of this vote.
   * @param {String} participantsRoot    Merkle root of the participant list, 32 byte.
   * @param {Array}  contentHash         IPFS hash of the content.
   */

- Sample Request

.. code-block:: javascript

  const rp = require('request-promise');
  const respone = await rp({
    url: 'http://localhost:8080/createVote',
    'POST',
    json: true,
    body:  {
      votersPerParticipant: 1,
      duration: 1000,
      id: '7a6608d3-d46b-4c82-b72c-6e7dc809',
      participantsRoot: '0x16E6BEB3E080910740A2923D6091618CAA9968AEAD8A52D187D725D199548E2C',
      contentHash: 'QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG',
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
    txHash: '0xb619cc10a3566d9f6f8a241de86d88335ffeccd283f45abfeabf567dcbd518c6'
  }
