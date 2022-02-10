---
description: >-
  How to query the Band Protocol reference data smart contract from another
  Solidity smart contract on Emerald.
---

# Integrating BAND oracle smart contract

### What is the Band Protocol? {#what-is-the-band-protocol}

[Band Protocol](https://bandprotocol.com) is a cross-chain data oracle
platform that aggregates and connects real-world data and APIs to smart
contracts. You can read more about the specific details of the protocol
[here](https://docs.bandchain.org).

### Deploy Oracle {#deploy-oracle}

1. Folow this link to Remix. The link contains an encoded example `DemoOracle.sol` contract.
2. Compile the contract with compiler version `0.6.11`.
3. Switch to the Deploy tab of Remix.
   1. Select "Injected Web3" in the Environment dropdown in the top left to connect Metamask.
   2. Make sure that Metamask is connected to the Alfajores test network. You can read about adding Alfajores to Metamask [here](https://docs.celo.org/getting-started/wallets/using-metamask-with-celo/manual-setup#adding-a-celo-network-to-metamask).

![environment](../../images/emerald/band-remix-environment.png)

1. Enter the Alfajores testnet Band reference data aggregator contract address (`0x71046b955Cdd96bC54aCa5E66fd69cfb5780f3BB`) to the `DemoOracle` constructor and deploy the contract. You can access the reference data aggregator contract on mainnet at `0xDA7a001b254CD22e46d3eAB04d937489c93174C3`.

![environment](../../images/emerald/band-remix-deploy.png)

An interface to interact with the contract will appear in the bottom left corner of Remix.
