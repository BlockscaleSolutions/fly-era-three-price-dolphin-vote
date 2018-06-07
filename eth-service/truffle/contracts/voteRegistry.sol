pragma solidity ^0.4.23;

contract VoteRegistry {
  address public owner_;

  struct Vote {
      uint128 duration;
      uint128 votesPerParticipant;
      bool active;
      bytes32 contentHash;
      bytes32 participantsRoot;
      bytes32 receiptsRoot;
  }

  mapping(bytes32 => Vote) public votes_;

  event VoteCreated(bytes32 id);

  constructor() public {
    owner_ = msg.sender;
  }

  /**
   * @notice create a new vote.
   * @param _votesPerParticipant Number of votes allocated to each participant.
   * @param _duration            Duration of the vote is milliseconds.
   * @param _id                  db id of this vote.
   * @param _participantsRoot    Merkle root of the participant list, 32 byte.
   * @param _contentHash         IPFS hash of the content.
   * @return Success of the transaction
   */
  function createVote(
      uint128 _votesPerParticipant,
      uint128 _duration,
      bytes32 _id,
      bytes32 _participantsRoot,
      bytes32 _contentHash
  )   external
      returns (bool)
  {
      require(msg.sender == owner_, 'msg.sender != owner');
      require(_duration > 0, '_duration <= 0');
      require(_votesPerParticipant > 0, '_votesPerParticipant <= 0');

      votes_[_id] = Vote({
          votesPerParticipant: _votesPerParticipant,
          duration: _duration,
          participantsRoot: _participantsRoot,
          contentHash: _contentHash,
          active: false,
          receiptsRoot: ''
      });

      emit VoteCreated(_id);

      return true;
  }
}
