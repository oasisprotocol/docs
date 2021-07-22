---
description: >-
  This document provides an overview of the Dry Run test network, a key step
  leading up to the Oasis Network Mainnet launch.
---

# Mainnet Dry Run Overview

{% hint style="success" %}
**MAINNET DRY RUN IS COMPLETE. THE NETWORK IS NOW PREPARING FOR MAINNET BETA ON 10/01/2020 AT 16:00 UTC.**
{% endhint %}

{% hint style="info" %}
**WE ASK THAT ALL NODES IN THE GENESIS FILE PARTICIPATE IN THE DRY RUN.**
{% endhint %}

## What is the Mainnet Dry Run?

The Mainnet Dry Run is the final pre-Mainnet test network. It is intended to emulate Mainnet as closely as possible, including the proposed [genesis file](genesis-file.md) with all intended Mainnet parameters and token allocations, but is not the real Mainnet.

Mainnet Dry Run will be used solely for testing purposes, so no real tokens or staking rewards will be associated with the network. Running the Mainnet Dry Run will enable the Oasis Network team and node operators to test-launch the network in a low-risk environment.

To differentiate the Mainnet Dry Run from other test networks and Mainnet itself, the Dry Run network’s Chain ID will be `mainnet-dryrun-<GENESIS-DATE-AND-TIME>`.

{% hint style="info" %}
For the network parameters needed for the Mainnet Dry Run, please see the updated [Network Parameters](../oasis-network/network-parameters.md) document.
{% endhint %}

## Why do a Mainnet Dry Run?

The primary goal of the Dry Run is to make sure the network goes live without any problems. The Mainnet Dry Run ensures that we continue making progress toward the Mainnet launch while being transparent, open, and receptive to continued feedback from the Oasis Network community. This incremental process will help to set a strong foundation for the long-term success of the Oasis Network!

## Dry Run Timeline

The Mainnet Dry Run is intended to be a short-lived network used primarily for testing purposes.

The Dry Run’s `halt_epoch` parameter, which indicates when the network will turn off automatically, is set to just 336 epochs, which is approximately 14 days.

The process of test-launching the Mainnet Dry Run will likely be shorter than 14 days, so the `halt_epoch` parameter will likely end up being a conservative estimate of the time that is needed to test the network and collect feedback from the community.

## Mainnet Dry Run vs. Mainnet Beta

After a successful Mainnet Dry Run, we will launch Mainnet Beta, and soon after we will propose the launch of the actual Mainnet with the enabling of transfers for the Oasis Network via a network upgrade. Any genesis file parameter changes arising from the Mainnet Dry Run process will be incorporated into Mainnet Beta, ensuring that Mainnet Beta is the most up-to-date and complete Oasis Network test network prior to Mainnet launch.

All account balances from Mainnet Beta will carry over to Mainnet when the network is upgraded and transfers are enabled. The reward schedule will be reset for Mainnet, but the rewards earned during Mainnet Beta will persist.

## Success Criteria

We will let the Dry Run network run for up to 48 hours after the network has started \(once validators representing more than 2/3 of stake in the initial consensus committee are online\).

We will determine that the Dry Run testing has been successful and we are ready to launch Mainnet Beta when the following conditions have been met:

* Validators representing more than 2/3 of stake in the initial consensus committee successfully get online.
* Dry Run network runs successfully for up to 48 hours, during which node operators test key network processes and components, as outlined in the test section of this document.
* Top 10 nodes by stake issue a confirmation that everything is working as intended.

The Oasis Protocol Foundation will communicate to node operators that the Dry Run has wrapped up successfully by sharing an email and a message in the [**\#nodeoperators** Oasis Community Slack channel](../community-resources/connect-with-us.md). This communication will include details regarding the launch date and logistics for Mainnet Beta.

## Mainnet Dry Run Genesis File

One of the key components we are testing in the Dry Run network is the proposed genesis file, which contains a set of parameters that outline the initial state of the Oasis Network blockchain.

You can view the proposed genesis file in [the Oasis Protocol Foundation GitHub repository](https://github.com/oasisprotocol/mainnet-artifacts/releases/download/2020-09-22/genesis.json).

You can verify the file with the following hashes:

* SHA1: `84b9b9df7fbb344192c8add9058b9494646da007`
* SHA256: `72d8af62c93eecc43a6fcbddbae599405ee952af47d2ba7455b2f6307b45c6e9`

For additional information about the genesis file and key parameters, please refer to [the Genesis File Overview document](genesis-file.md).

## Key Components for Node Operators to Test

Node operators will play a key role in the success of the Mainnet Dry Run. In addition to reviewing and providing feedback on the genesis file, node operators should test a variety of processes, transactions, and components on the network.

Please check the following are working correctly:

* Set up your node on the network by following the instructions in [the Set Up Your Node documentation](../run-a-node/set-up-your-node/run-validator.md).
* Use the 100 unstaked, unbonded tokens in your general balance if you have an allocation.
  * Send a couple of tokens to another user with the **transfer** transaction as described [here](../use-your-tokens/transfer-tokens.md).
* Make adjustments to your commission schedule by following the instructions [here](../run-a-node/set-up-your-node/amend-commission-schedule.md).

## Dry Run Support

The Oasis team will be offering live video support during the Dry Run. Video call link and calendar details will be shared with node operators via email and Slack.

For any additional support, please reach out via the [**\#nodeoperators** Oasis Community Slack channel](../community-resources/connect-with-us.md) with your questions, comments, and feedback related to the Dry Run.

