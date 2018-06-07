const VoteRegistry = artifacts.require('./VoteRegistry.sol');

let voteRegistry;

contract('VoteRegistry.createVote()', (accounts) => {
	before(async () => {
		[owner] = accounts;
	});

	beforeEach(async () => {
		voteRegistry = await VoteRegistry.new({ from: owner });
	});

	describe('Owner adding a valid vote', () => {
		const vote = {
			votesPerParticipant: 1,
			duration: 100000,
			id: '7a6608d3-d46b-4c82-b72c-6e7dc809',
			participantsRoot: '0xFD5BCEE19767767234A4CF869DF0A4EA11B69421F395FD977A4A2AA971D67F89',
	    contentHash: 'QmfP35tndu1JNgMxAWgiouHsJ9RspMwTWDX3v2NacSvkTo'
		}

		it('should return true', async () => {
			const callRes = await voteRegistry.createVote.call(...Object.values(vote), { from: owner });
			assert.equal(callRes, true, 'Call response incorrect');
		});

		it('should emit the VoteCreated event', async () => {
			const res = await voteRegistry.createVote(...Object.values(vote), { from: owner });
	    assert.strictEqual(res.logs[0].event, 'VoteCreated', 'Incorrect event emitted');
			assert.strictEqual(web3.toUtf8(res.logs[0].args.id), vote.id, 'Incorrect id emitted');
		});

		it('should add the vote to the contract state', async () => {
			const res = await voteRegistry.createVote(...Object.values(vote), { from: owner });
			const bytes32Id = web3.fromUtf8(vote.id);
			const onChainVote = await voteRegistry.votes_(bytes32Id);

			assert.strictEqual(onChainVote[4], vote.participantsRoot.toLowerCase(), 'participantsRoot incorrect');
			assert.strictEqual(onChainVote[3], web3.fromUtf8(vote.contentHash).slice(0, 66), 'contentHash incorrect');
		});
	});
});
