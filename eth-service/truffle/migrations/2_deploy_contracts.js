const VoteRegistry = artifacts.require('./VoteRegistry.sol');

module.exports = (deployer) => {
  deployer.deploy(VoteRegistry);
};
