const { expect } = require('chai');
const { ethers } = require('hardhat');

describe('Oricheck', function () {
  it('Should add a product', async function () {
    const [owner] = await ethers.getSigners();

    const contract = await ethers.deployContract('Oricheck');

    await contract.addProduct('product_serial');
    const hist = await contract.getProductHistory('product_serial');

    expect(hist[0]).to.equal(owner.address);
  });
});
