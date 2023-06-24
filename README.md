# Oricheck

Oricheck is a smart contract to detect if a product is original or not or stolen or not by storing a product's transfer history.

# Steps to run

#### Make sure you installed Metamask

Install required packages and run a node

```
npm i -f
npx hardhat compile
npx hardhat node
```

#### After this step add several accounts to your metamask provided by hardhat local node.

Start another terminal session and deploy contract

```
npx hardhat run --network localhost .\scripts\deploy.js
```

Start another terminal session and run application

```
npm start
```

If you want you can run the tests

```
npx hardhat test
```
