---
description: >-
  Overview of the requirements to become a validator on a ParaTime connected to
  the Oasis Network.
---

# Run a ParaTime Node

The Oasis Network has two main components, the Consensus Layer and the ParaTime Layer.

1. The **Consensus Layer** is a scalable, high-throughput, secure, proof-of-stake consensus run by a decentralized set of validator nodes.
2. The **ParaTime Layer** hosts many parallel runtimes \(ParaTimes\), each representing a replicated compute environment with shared state.

![](../.gitbook/assets/image%20%281%29%20%282%29.png)

  
Operating a ParaTime requires the participation of Node Operators, who contribute nodes to the committee in exchange for rewards. ParaTimes can be operated by anyone, and have their own reward system, participation requirements, and structure.  


As a Node Operator you can participate in any number of ParaTimes. While there are a number of ParaTimes under development, below are a few key ParaTimes that you can get involved in today.

{% tabs %}
{% tab title="Oasis-Eth ParaTime" %}
## Oasis-Eth ParaTime

A self-contained EVM compatible ParaTime developed by Second State that allows developers to quickly build DApps on the Oasis Network. The Oasis-Eth ParaTime has support for the entire solidity toolchain, but currently is not connected to the Ethereum Network

### Overview 

* **Leading Developer:** [Second State](http://oasiseth.org/)
* **Status:** Open for Enrollment
* **Tesnet Launch Date:** January 2021 \(Complete\)
* **Mainnet Launch Date:** Late February 2021
* **Sign up:** [here](https://github.com/second-state/oasis-ssvm-runtime/wiki/Deploy-OasisEth-Paratime-Beta-on-the-oasis-mainnet)
* **Slack Channel:** [**\#**oasiseth-paratime](https://join.slack.com/t/oasiscommunity/shared_invite/enQtNjQ5MTA3NTgyOTkzLWIxNTg1ZWZmOTIwNmQ2MTg1YmU0MzgyMzk3OWM2ZWQ4NTQ0ZDJkNTBmMTdlM2JhODllYjg5YmJkODc2NzgwNTg)
* **Requires SGX:** No

### Features

* Self-contained, full-featured Ethereum development environment built on top of the Oasis Network to take advantage of scalability, affordability, and privacy benefits
* Full support for all current Ethereum 1.0 smart contracts, DApps, developer tools, and libraries via EVM runtime and tooling
* Full support for all next-gen Ethereum 2.0 smart contracts, DApps, developer tools, and libraries via Ewasm runtime and tooling
* Full support for Solidity
* Gas costs orders of magnitude lower than Ethereum
* Confidential smart contract support launching soon
* Additional features TBA

### Rewards

* OETH native gas tokens distributed as rewards for Oasis Ethereum ParaTime node operators
* There is a fixed total supply of 21 million OETH. It is deflationary as the network burns gas. There is no token sale, nor investors, nor pre-mine. All tokens are awarded over time to node operators, developers, and the community
* Additional rewards TBA

### Hardware Requirements

* 2.0 GHz x86-64 CPU
* CPU must have AES-NI support
* 2 GB ECC RAM \(4GB recommended\)
* 500 GB High Speed Storage \(SSD recommended\)
{% endtab %}

{% tab title="Ethereum Bridge ParaTime" %}
## Ethereum Bridge ParaTime

A bridge from the Oasis Network to Ethereum that allows you to swap ROSE for ETH. 

### Overview 

* **Leading Developer:** [Oasis Protocol Foundation](http://oasisprotocol.org/)
* **Status:** Planning incentivized testnet 
* **Tesnet Launch Date:** Early Q2
* **Mainnet Launch Date:** TBA
* **Sign up:** [here](https://oasisfoundation.typeform.com/to/aPDUHoTJ)
* **Slack Channel:** [**\#**ethbridgeparatime](https://join.slack.com/t/oasiscommunity/shared_invite/enQtNjQ5MTA3NTgyOTkzLWIxNTg1ZWZmOTIwNmQ2MTg1YmU0MzgyMzk3OWM2ZWQ4NTQ0ZDJkNTBmMTdlM2JhODllYjg5YmJkODc2NzgwNTg)
* **Requires SGX**: Yes

### Features

* Secure and stable 2-way token bridge between the Oasis Network and Ethereum
* Full support for the transfer of ROSE tokens from the Oasis Network to Ethereum \(unlocking the ability to add wrapped ROSE as liquidity on Uniswap and other DeFi protocols on Ethereum\)
* Full support for the transfer of ETH and ERC20 tokens from Ethereum to the Oasis Network \(unlocking the ability to swap wrapped ETH and ERC20 tokens on Uniswap and other DeFi protocols on the Oasis Network while paying much lower fees than on Ethereum\)
* User-friendly web UI for swapping tokens
* Additional features TBA

### Rewards

* Incentivized testnet with ROSE tokens delegated by the Oasis Protocol Foundation to testnet participants based on performance
* Additional rewards TBA

### Hardware Requirements

* 2.0 GHz x86-64 CPU
* CPU must have AES-NI support
* 2 GB ECC RAM
* 500 GB High Speed Storage
* CPU support for Intel SGX
* Intel SGX support enabled in BIOS
* Intel SGX Linux driver installed
* AESMD daemon installed and running

We currently do not have SGX installation instructions tailored to node operators, but some of these developer-oriented resources may be useful:

* [https://docs.oasis.dev/oasis-core/development-setup/build-environment-setup-and-building/building\#sgx-environment](https://docs.oasis.dev/oasis-core/development-setup/build-environment-setup-and-building/building#sgx-environment)
* [https://edp.fortanix.com/docs/installation/guide/](https://edp.fortanix.com/docs/installation/guide/)
{% endtab %}
{% endtabs %}

Oasis Lab's Parcel ParaTime is also under development. If you're a developer and would like to start building applications on the Oasis Network with the Parcel SDK please sign up [here](https://www.oasislabs.com/parcelsdk).

