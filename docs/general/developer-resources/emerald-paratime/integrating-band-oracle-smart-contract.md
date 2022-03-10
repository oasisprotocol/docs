---
description: >-
  How to query the Band Protocol reference data smart contract from another
  Solidity smart contract on Emerald.
---

# Integrating BAND oracle smart contract

### What is the Band Protocol?

[Band Protocol](https://bandprotocol.com) is a cross-chain data oracle
platform that aggregates and connects real-world data and APIs to smart
contracts. You can read more about the specific details of the protocol
[here](https://docs.bandchain.org).

### Deploy Oracle

1. Folow this link to Remix. The link contains an encoded example `DemoOracle.sol` contract.
2. Compile the contract with compiler version `0.6.11`.
3. Switch to the Deploy tab of Remix.
   1. Select "Injected Web3" in the Environment dropdown in the top left to connect Metamask.
   2. Make sure that Metamask is connected to the Emerald (Testnet/Mainnet) network. You can read about adding Emerald network to Metamask [here](https://docs.oasis.dev/general/manage-tokens/how-to-transfer-rose-into-emerald-paratime#metamask).

![environment](../../images/emerald/band_demooracle_smartcontract.png)

4. Enter the Emerald Testnet Band reference data aggregator contract address (`0x61704EFB8b8120c03C210cAC5f5193BF8c80852a`) to the `DemoOracle` constructor and deploy the contract. You can access the reference data aggregator contract on mainnet at `0xDA7a001b254CD22e46d3eAB04d937489c93174C3`.

![environment](../../images/emerald/band_deploy_demooracle_smartcontact.png)

An interface to interact with the contract will appear in the bottom left corner of Remix.

### Get Rates

Clicking the `getPrice` button will return the current price of WBTC in USD. This function calls `getReferenceData(string memory _base, string memory _quote)` on the Band reference data contract, passing "WBTC" and "USD", indicating WBTC as the base and USD as the quote. The rate returned is base/quote multiplied by 1e18.

![environment](../../images/emerald/band_get_rates.png)

Note that the `DemoOracle` contract only returns the latest rate, but the reference contract also returns values of the last time the base and quote references were updated.

The price is offset by 1e18. The returned value at the time of testing is `39567000000000000000000`. Multiplying by 1e-18 gives the current USD price given by the reference contract, 39567.00 WBTC/USD.

Clicking the `getMultiPrices` button returns multiple quotes in the same call, WBTC/USD and ETH/USD in this case. This function calls `getReferenceDataBulk(string[] memory _bases, string[] memory _quotes)` on the Band reference data contract, passing "WBTC" and "ETH" as the base and "USD" for the quote. This will return the current WBTC and ETH prices in USD, as an array of integers. The call also returns just the exchange rates (multipilied by 1e18), but can be modified to return the last updated times for the bases and quotes.

The `savePrice` function will save any base/quote rate that is passed to it in the storage variable named `price`. This storage data will only be updated when the “savePrice” function is called, so the saved `price` value will go stale unless this function is called repeatedly.

![environment](../../images/emerald/band_saveprice.png)

### Mainnet Reference Data Contract

You can access the reference data aggregator contract on mainnet at [0xDA7a001b254CD22e46d3eAB04d937489c93174C3](https://explorer.emerald.oasis.dev/address/0xDA7a001b254CD22e46d3eAB04d937489c93174C3/transactions).

### Available Reference Data

You can view the available reference data on the [Band Standard Dataset site here](https://data.bandprotocol.com/).

### Bandchain.js {#bandchain}

Band also has a javascript library that makes it easy to interact with BandChain directly from Javascript or Typescript applications. The library provides classes and methods for convenient to send transactions, query data, OBI encoding, and wallet management. You can read more about it [here](https://docs.bandchain.org/client-library/bandchain.js/getting-started.html).