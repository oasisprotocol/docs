---
description: >-
  This document is intended to provide an overview of the proposed genesis file
  for the Oasis Network Mainnet launch.
---

# Genesis File Overview

{% hint style="info" %}
Up to date information about the current Genesis file can be found on the [Network Parameters](../oasis-network/network-parameters.md) page.
{% endhint %}

{% hint style="warning" %}
Please note that the parameters and corresponding values in the genesis file are subject to change prior to the Oasis Network Mainnet launch.
{% endhint %}

## What is a Genesis File?

A genesis file is a JSON document file which contains a set of parameters that outline the initial state of a network.

The state defined in the Oasis Network’s genesis file contains all of the necessary information for launching the Oasis Network Mainnet, including initial token allocations, network parameters, and more.

We will discuss some of the key parameters in the genesis file this document. You can view all of the parameters in their raw form in the full genesis file linked at the top of this document.

### Genesis File vs. Genesis Document

When Oasis Node loads a genesis file \(i.e. a JSON document\) it converts it to a genesis document.

The important thing to note is that the genesis document is used to compute the [genesis document's hash](https://docs.oasis.dev/oasis-core/high-level-components/index/genesis#genesis-documents-hash). This hash is used to verify for which network a given transaction is intended for.

{% hint style="info" %}
For a more in-depth explanation of the genesis document, see the [Genesis Document](https://docs.oasis.dev/oasis-core/high-level-components/index/genesis) part of Oasis Core's developer documentation.
{% endhint %}

## Genesis Time and Chain ID

The **genesis\_time** parameter is an ISO8601 UTC timestamp that specifies when the blockchain is officially going to launch. At the time of genesis, validators are expected to come online and start participating in the consensus process for operating the network. The network will start once validators representing more than 2/3 of stake in the initial consensus committee are online.

The **chain\_id** is a human-readable version identifier for a blockchain. It is important to note, that this value alone doesn't dictate the version of the genesis file. To determine the correct version of a genesis file, the shasum of that genesis file will need to be generated. This can be done on Linux/macOS like so:

```text
shasum -a 256 genesis.json
```

## Epoch Time

The **interval** parameter specifies the number of blocks in an _epoch_. Epochs are used as a measure of time for staking reward schedules, debonding intervals, non-Mainnet test network expiration periods, and more. This value is set to 600, indicating that a new epoch on the Oasis Network transpires each time 600 new blocks are generated.

## Node Operator Registry

Within the **registry** object, there are a broad range of parameters that specify the initial set of node operators and their corresponding initial node statuses.

* **max\_node\_expiration** - The maximum duration \(in epochs\) that node registrations last. The starting value is set to 2 in order to ensure that a node is continuously online, since the node’s registration would expire each time 2 epochs pass, requiring the node to re-register.
* **entities** - The entity registrations for initial node operators, including public key and signature information. The values here were obtained during the entity package collection process that took place during early September.

{% hint style="warning" %}
If you are an operator who successfully completed the KYC process and submitted your entity package by the deadline in early September, your entity should be included in the genesis file. Please review the entities section of the genesis file [here](https://github.com/oasisprotocol/mainnet-artifacts/releases/download/2020-09-22/genesis.json) to make sure that your entity is included in the genesis file if you were expecting it to be included. You can search for your entity in the genesis file using the entity public key from the entity package you submitted. If you encounter any issues with finding your entity, please let us know via the genesis file [feedback form](https://oasisfoundation.typeform.com/to/yG4pp57W).
{% endhint %}

* **nodes** - The node registrations for initial node operators, including public key and signature information.

## Gas Costs

The following parameters define the gas costs for various types of transactions on the network: 

* **compute\_commit** - The cost for a compute commit for a ParaTime node. The value is set to 10000 gas.
* **merge\_commit** - The cost for a ParaTime merge commit. The value is set to 10000 gas.
* **add\_escrow** - The cost for an add\_escrow \(staking\) transaction. The value is set to 1000 gas.
* **burn** - The cost for a burn transaction. The value is set to 1000 gas.
* **reclaim\_escrow** - The cost for a reclaim\_escrow transaction \(for withdrawing staked tokens\). The value is set to 1000 gas.
* **transfer** - The cost for a transfer transaction \(for sending tokens\). The value is set to 1000 gas.
* **amend\_commission\_schedule** - The cost for amending, or changing, a commission schedule. The value is set to 1000 gas.

## Node & Runtime Token Thresholds

There are several **threshold** parameters that specify the minimum number of tokens that need to be staked in order for a particular entity or a particular type of node to participate in the network. The minimum threshold specified for the **entity,** **node-compute, node-keymanager, node-storage,** and **node-validator** parameters is set to 100000000000 nROSE for each, indicating that you need to stake at least 100 ROSE tokens in order to have your entity or any of the specified nodes go live on the network. 

There are also minimum thresholds for registering new runtimes. The minimum thresholds for registering **runtime-compute** and **runtime-keymanager** are set to 50000000000000 nROSE, indicating that you need to stake at least 50000 ROSE tokens in order to register a runtime.

## Staking & Rewards

These key parameters are related to staking and rewards on the network:

* **debonding\_interval** - The period of time \(in epochs\) that must pass before staked or delegated tokens that are requested to be withdrawn are returned to the account's general balance. The value is set to 336 epochs, which is expected to be approximately 14 days.
* **reward\_schedule** - The staking reward schedule, indicating how the staking reward rate changes over time, defined at an epoch-by-epoch granular basis. The reward schedule uses a tapering formula with higher rewards being paid out at earlier epochs and then gradually decreasing over time.
* **signing\_reward\_threshold\_numerator** and **signing\_reward\_threshold\_denominator** - These parameters define the proportion of blocks that a validator must sign during each epoch to receive staking rewards. A proportion of 3/4 means that a validator must maintain an uptime of at least 75% during an epoch in order to receive staking rewards for that period.
* **rate\_change\_interval** - The granularity at which at rate changes can be specified in a commission schedule. This limits the complexity of the commission schedule; the value is set to 1, indicating that the commission rate can change once per epoch.
* **rate\_bound\_lead** - The minimum lead time \(in epochs\) needed for changes to commission rate bounds. Operators need to wait before any rate bound changes go into effect. The value is set to 336, which is expected to be approximately 14 days. 
* **max\_rate\_steps** - The maximum allowed number of rate step changes in a commission schedule.The value is set to 10, indicating that the commission schedule can have a maximum of 10 rate steps.
* **max\_bound\_steps** - The maximum allowed number of commission rate bound step changes in the commission schedule. The value is set to 10, indicating that the commission schedule can have a maximum of 10 bound steps.
* **min\_delegation** - The minimum amount of tokens required in a delegation. The value is set to 100000000000 nROSE, or 100 ROSE tokens.
* **fee\_split\_weight\_propose** - The block proposer's share of transaction fees, set to a value of 2.
* **fee\_split\_weight\_next\_propose** - The next proposer's share of transaction fees, set to a value of 1.
* **fee\_split\_weight\_vote** - A signer’s/voter’s share of transaction fees, set to a value of 1.
* **reward\_factor\_epoch\_signed** - The factor for rewards distributed to validators who signed at least threshold blocks in a given epoch, set to a value of 1. 
* **reward\_factor\_block\_proposed** - The factor for rewards earned for block proposal. Set to 0, indicating validators get no extra staking rewards for proposing block.

## Token Supply & Ledger

The following parameters specify the total token supply, total token pool reserved for staking rewards, and account balances across the network at the time of genesis: 

* **total\_supply** - Specifies the total token supply for the network, which is fixed at 10 billion ROSE tokens.
* **common\_pool** - The tokens reserved for staking rewards to be paid out over time.
* **ledger** - The staking ledger, encoding all accounts and corresponding account balances on the network at the time of genesis, including accounts for initial operators, backers, custodial wallets, etc.
* **delegations** - The encoding of the initial delegations at the time of genesis.

{% hint style="warning" %}
If you are an operator who successfully completed the KYC process and submitted your entity package by the deadline in early September, your account should be included in the genesis file, with an account general balance and escrow amount reflecting any grants, rewards, and Amber Network delegations you have received leading up to Mainnet. Please review the ledger section of the genesis file [here](https://github.com/oasisprotocol/mainnet-artifacts/releases/download/2020-09-22/genesis.json) to make sure that your account is included in the genesis file if you were expecting it to be included. Keep in mind that token balances are enumerated in nROSE, with 1 billion nROSE being equivalent to 1 ROSE token. You can search for account node in the ledger section of the genesis file by searching for your staking address, which is a Bech32-encoded address with the prefix "oasis". If you encounter any issues with finding your account in the ledger, please let us know via the genesis file [feedback form](https://oasisfoundation.typeform.com/to/yG4pp57W).
{% endhint %}

{% hint style="info" %}
**Interpreting your account balance in the ledger:** Your **general** balance includes all of your tokens that have not been staked or delegated. This will be set to 100 tokens at genesis to cover gas, as most of your tokens \(except that general balance of 100 tokens\) will initially be staked \(i.e. self-delegated\) on your behalf. Within the **escrow** field, your **active** parameter shows the total tokens that have been allocated or delegated to you.
{% endhint %}

## Slashing 

These parameters specify key values for the network's slashing mechanism:

* **amount** - The amount of tokens to slash for double signing. The value is set to 100000000000 nROSE, or 100 ROSE tokens.
* **freeze\_interval** - The duration, in epochs, for which a node that has been slashed for double signing is “frozen,” or barred from participating in the network's consensus committee. A value of 18446744073709551615 \(the maximum value for a 64-bit unsigned integer\) means that any node slashed for double signing is, in effect, permanently banned from the network.

## Consensus 

The following parameters are used to define key values for the network's consensus protocol:

* **min\_validators** - The minimum size for the consensus committee, set to 15 validators.
* **max\_validators** - The maximum size for consensus committee, set to 80 validators.
* **max\_validators\_per\_entity** - The maximum number of nodes from a given entity that can be in the consensus committee at any time. Set to a value of 1.
* **backend** - Defines the backend consensus protocol. Specified as "tendermint".
* **timeout\_commit** - Specifies long to wait after committing a block before starting a new block height, in nanoseconds \(this affects block interval\). Set to 5000000000 nanoseconds, or 5 seconds.
* **max\_tx\_size** - Maximum size for consensus-layer transactions, in bytes, set to 32768 bytes.
* **max\_block\_size** - Maximum block size, in bytes, set to 22020096 bytes
* **max\_block\_gas** - Maximum block gas, set to 0, which specifies an unlimited amount of gas. 
* **public\_key\_blacklist** - A list of the public keys that cannot be used on the network.

## Transfers

Please note that transfers will be disabled for Mainnet Beta and we expect once proposed by the community and adopted enabled to begin Mainnet. Transfers are enabled on Mainnet Dry Run to test this feature out completely.

## Feedback

We look forward to receiving the community’s feedback on the Oasis Network’s genesis file! If you have any specific feedback or questions, please let us know via the genesis file [feedback form](https://oasisfoundation.typeform.com/to/yG4pp57W). 

## 

