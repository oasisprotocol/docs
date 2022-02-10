---
description: >-
  This document provides an overview of the Mainnet Beta network, the final step
  leading up to the Oasis Network Mainnet launch.
---

# Mainnet Beta Overview

{% hint style="warning" %}
**Mainnet Beta will kick-off on OCTOBER 1, 2020 at 16:00 UTC.**
{% endhint %}

{% hint style="info" %}
**ALL NODES in the genesis file are ENCOURAGED TO PARTICIPATE in the Mainnet Beta.**
{% endhint %}

After a successful [Mainnet Dry Run](), in which the Dry Run test network went live in under 1 minute, we are ready to launch Mainnet Beta!

## What is Mainnet Beta?

Mainnet Beta is the first phase of launching the Mainnet Network. It includes the finalized Mainnet [genesis file](genesis-file.md) and initial token allocations. A few key highlights:

* **Transfers are disabled during Mainnet Beta.**  
* **Validators** participating in Mainnet Beta will be able to **start earning staking rewards**. 
* All **account balances** from Mainnet Beta **will carry over to Mainnet** when the network is upgraded and token transfers are enabled.
* The **reward schedule** will be **reset for Mainnet**, but the rewards earned during Mainnet Beta will persist on Mainnet with the generation of the ROSE token.

## Why launch a Mainnet Beta?

The primary goal of Mainnet Beta is to launch the Oasis Network in the most secure way possible.

We want to make sure we conduct extensive testing and vetting of our design prior to the network going live. Mainnet Beta enables the community to do a final check of the network in a focused and intentional manner, and allow the community to propose and decide when to turn on additional features on the network. This incremental process will help to set a strong foundation for the Oasis Network.

## Mainnet Beta Timeline

We expect that the community of validators will launch Mainnet soon after Mainnet Beta.

## Success Criteria

When the community of validators deems Mainnet Beta as a success, the foundation will propose an upgrade of the network to Oasis Mainnet. We believe the network will be ready for the Oasis Network Mainnet when the following conditions have been met:

* Validators representing more than 2/3 of stake in the initial consensus committee successfully get online.
* Beta network runs successfully for at least 10 days.

The Oasis Protocol Foundation will communicate to node operators that Mainnet Beta has wrapped up successfully by sharing an email and a message in the [**\#nodeoperators** Oasis Community Slack channel](https://docs.oasis.dev/general/community-resources/connect-with-us). This communication will include details regarding the proposed launch date and logistics for Mainnet.

## **Mainnet Beta Genesis File**

The Mainnet Beta [genesis file](genesis-file.md) is intended to be as close as possible to the Mainnet genesis file. We do not expect any major changes in genesis file parameters between now and Mainnet launch.

{% hint style="info" %}
The parts of the genesis file that will change between Mainnet Beta and Mainnet include:

* **genesis\_time.**
* **chain\_id.**
* **halt\_epoch.**
* Account balances in the staking **ledger** \(account balances in the Mainnet genesis file will include additional tokens from staking rewards earned by validators during the Mainnet Beta\).
* **disable\_transfers** staking parameter will be set to _false_ \(or omitted\) to enable transfers in the Mainnet genesis file.
{% endhint %}

You can view and download the Mainnet Beta [genesis file here](https://github.com/oasisprotocol/mainnet-artifacts/releases/download/2020-10-01/genesis.json).

You can verify the file with the following hashes:

* SHA1: `3a17891f73ae2079e5a2cf7e53c25f7b26f63d3e`
* SHA256: `a188bcae5b6ba7b1d2bf7fd4b3972381db611989ab11a45059f6faee28ad2a8d`

For additional information about the genesis file and key parameters, please refer to [the Genesis File Overview document](https://docs.oasis.dev/general/pre-mainnet/genesis-file). 

## Mainnet Beta Support

The Oasis team will be offering live video support during the launch of Mainnet Beta. Video call link and calendar details will be shared with node operators via email and Slack.

For any additional support, please reach out via the [**\#nodeoperators** Oasis Community Slack channel](../oasis-network/connect-with-us.md) with your questions, comments, and feedback related to Mainnet Beta.

