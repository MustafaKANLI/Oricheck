const { ethers } = require('hardhat');

async function main() {
  const Oricheck = await ethers.getContractFactory('Oricheck');
  const network = await ethers.provider.getNetwork();
  console.log('Network name=', network.name);
  console.log('Network chain id=', network.chainId);
  const contract = await Oricheck.deploy();

  await contract.deployed();

  console.log('Oricheck deployed to:', contract.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
