const { expect } = require('chai');
const { ethers } = require('hardhat');

describe('Oricheck', function () {
  it('Should transfer a product', async function () {
    const [owner0, owner1] = await ethers.getSigners();

    const contract = await ethers.deployContract('Oricheck');

    await contract.addProduct('product_serial');
    await contract.transferProduct('product_serial', owner1.address);

    const hist = await contract.getProductHistory('product_serial');

    expect(hist[1]).to.equal(owner1.address);
  });
});
