==========
Controller
==========

Description
***********
Service that controls the interaction between the client and back end services.

====

API
***

Votes
=====

POST createVote
---------------
Creates a new vote. Returning the id and txHash. Raw data sent to db, merkle root
of participants returned and content pushed to ipfs, hash returned.

- Body
**Required**

.. code-block:: javascript
 /**
  * @param {Array || Number} participants Array of ids that may participate or a
  *                                       number of randomly generated ids to be created.
  * @param {Number} votesPerParticipant   Number of votes allocated to each participant.
  * @param {Number} duration              Duration of the vote is milliseconds
  * @param {Array}  content               Array of objects representig the content of the vote.
  *                                       ie. questions and options.
  */

- Success Response

.. code-block:: console

  statusCode: 201
  body: {
          id: 1,
          txHash: '0x7f480f9b52ae4cfe8ff8b607c46c795482f9543264c1b61d7032715b1e1eb66e'
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
      participants: 10,
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
    id: 1,
    txHash: '0x9c37cf50d7f0ebbc80247acb1a1d0e363321f9acd96da7d5661740b1fb5d2e80'
  }
