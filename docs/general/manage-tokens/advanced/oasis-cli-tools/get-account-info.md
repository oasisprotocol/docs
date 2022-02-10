# Get Account Info

:::info

This example assumes you have read and followed the instructions in the [Prerequisites](prerequisites) and [Setup](setup) sections.

:::

To get more information about a particular staking account, e.g. `oasis1qrvsa8ukfw3p6kw2vcs0fk9t59mceqq7fyttwqgx`, run:

```bash
oasis-node stake account info \
  -a $ADDR \
  --stake.account.address oasis1qrvsa8ukfw3p6kw2vcs0fk9t59mceqq7fyttwqgx
```

This will output all staking information about this particular account, e.g.:

```
General Account:
  Balance: ROSE 376.594833237
  Nonce:   0
Escrow Account:
  Active:
    Balance:      ROSE 10528.684187046
    Total Shares: 10000000000000
  Debonding:
    Balance:      ROSE 0.0
    Total Shares: 0
  Commission Schedule:
    Rates: (none)
    Rate Bounds: (none)
  Stake Accumulator:
    Claims:
      - Name: registry.RegisterEntity
        Staking Thresholds:
          - Global: entity
      - Name: registry.RegisterNode.9Epy5pYPGa91IJlJ8Ivb5iby+2ii8APXdfQoMZDEIDc=
        Staking Thresholds:
          - Global: node-validator
```

## General Account

We can observe that:

* General account's **balance**, the amount of tokens that are available to the account owner, is \~377 tokens.
* General account's **nonce**, the incremental number that must be unique for each account's transaction, is 0. That means there haven't been any transactions made with this account as the source. Therefore, the next transaction should have nonce equal to 0.

## Escrow Account

We can observe that:

* The amount of tokens that are **actively bounded** to the escrow account is \~10529 tokens.
* The total number of **shares** for the tokens actively bounded to the escrow account is 10 trillion.
* The amount of tokens that are currently **debonding** is 0.
* The total number of **shares** for the tokens that are currently debonding is 0.

### Commission Schedule

An entity can also charge commission for tokens that are delegated to it. It would defined the commission schedule **rate steps** and the commission schedule **rate bound steps**. For more details, see the [Amend Commission Schedule](../../../run-a-node/set-up-your-node/amend-commission-schedule) documentation.

### Stake Accumulator

Each escrow account also has a corresponding stake accumulator. It stores **stake claims** for an escrow account and ensures all claims are satisfied at any given point. Adding a new claim is only possible if all of the existing claims plus the new claim can be satisfied.

We can observe that the stake accumulator currently has two claims:

* The `registry.RegisterEntity` claim is for registering an entity.
  
  It needs to satisfy the global threshold for registering an entity (`entity`) which is defined by the staking consensus parameters.
  
  To see the value of the `entity` global staking threshold, run the `oasis-node stake info` command as described in [Common Staking Info](common-staking-info) doc.

* The `registry.RegisterNode.9Epy5pYPGa91IJlJ8Ivb5iby+2ii8APXdfQoMZDEIDc=` claim is for registering the node with ID `9Epy5pYPGa91IJlJ8Ivb5iby+2ii8APXdfQoMZDEIDc=`.
  
  It needs to satisfy the global staking threshold for registering a validator node (`node-validator`) which is defined by the staking consensus parameters.
  
  To see the value of the `node-validator` global staking threshold, run the `oasis-node stake info` command as described in [Common Staking Info](common-staking-info) doc.
  
  In addition to the global thresholds, each runtime the node is registering for may define their own thresholds. In case the node is registering for multiple runtimes, it needs to satisfy the sum of thresholds of all the runtimes it is registering for.
  
  For more details, see [Oasis Core Developer Docs on registering a node](https://github.com/oasisprotocol/oasis-core/blob/master/docs/consensus/registry.md#register-node).
