---
description: How to build your first dApp on OPL
---

# Overview

On-chain voting is the basis for any decentralized autonomous organization
(DAO) that would like to foster bottom-up decision making.
In this tutorial, you will create a [secret ballot](https://en.wikipedia.org/wiki/Secret_ballot)
dApp that can only be built with the Oasis Privacy Layer.

Why is this important? [Privacy](https://en.wikipedia.org/wiki/Secret_ballot)
protects the voter (DAO token holder) from intimidation and bullying when
exercising their right of participation, such as on a protocol.
Vote organizers can encourage participation with ballots not only by protecting
the identity of voters, but also by sealing the results of an ongoing
vote, giving the same weight to the first and last votes.

## Getting Started

If you have made a dApp before, then you likely know most if not all of
the tools covered here! But even if you haven't used all of these tools listed,
you should still keep going! We will do this together.

By the end of this tutorial, we will have:

- written smart contracts using the OPL [library](https://github.com/oasisprotocol/sapphire-paratime/blob/main/contracts/contracts/OPL.sol)
- used [Hardhat](https://hardhat.org/docs) development environment for OPL
- used [Hardhat Deploy](https://github.com/wighawag/hardhat-deploy) to deploy
smarts contracts to a testnet.
- used [Pinata](https://docs.pinata.cloud/what-can-i-learn-here/what-is-pinata)
to store simple JSON data. Not everything has to go on a blockchain.
- used [Celer](https://im-docs.celer.network/developer/celer-im-overview) to
pass messages cross multiple chains
- built a simple [Vue.JS](https://vuejs.org/guide/introduction.html)
app to interact with our dApp through [MetaMask](https://docs.metamask.io/wallet).
