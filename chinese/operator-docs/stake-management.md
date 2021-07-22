# Stake Management

For node operators, the `oasis-node` binary offers a command line interface for various staking operations.

The following commands are intended to be run **online** \(i.e. on the `server`\):

* `oasis-node stake info` shows the token information,
* `oasis-node stake list` lists all accounts with positive balance,
* `oasis-node stake account info` shows detailed account information,
* `oasis-node consensus submit_tx` submits a pre-generated transaction given a

  filename.

In addition, the following commands generate transactions and are meant to be run offline \(i.e. on the `localhost`\), because signing transactions requires a private key which **should not be accessible** from outside in any way:

* `oasis-node stake account gen_transfer`
* `oasis-node stake account gen_burn`
* `oasis-node stake account gen_escrow`
* `oasis-node stake account gen_reclaim_escrow`

## Prerequisites

We will assume you are familiar with the previous sections of the [Operator Docs](running-a-node.md) and have the `oasis-node` binary installed.

To run a command that requires a connection to the online Oasis node \(i.e. the `server`\), you need to either:

* change the working directory to where the internal Oasis node UNIX socket is located \(e.g. `/serverdir/node/`\) before executing the command, or
* pass the `-a $ADDR` flag where `ADDR` represents the path to the internal Oasis node UNIX socket prefixed with `unix:` \(e.g.`unix:/serverdir/node/internal.sock`\).

We will pipe the output of commands that return JSON through [Python's `json.tool` module](https://docs.python.org/3/library/json.html#module-json.tool) to pretty-print it.

{% hint style="warning" %}
Be aware that [jq](http://stedolan.github.io/jq/), the popular JSON CLI tool, [converts all numbers to IEEE 754 64-bit values](https://github.com/stedolan/jq/wiki/FAQ#caveats) which can result in silent loss of precision and/or other changes.

Hence, we recommend avoiding its usage until this issue is resolved.
{% endhint %}

## Common Token Info

To query an Oasis node for the common token info, run:

```bash
oasis-node stake info -a $ADDR
```

This will output something like:

```text
Total supply: 10000000000000000000
Common pool: 7999217230119682890
Last block fees: 0
Staking threshold (entity): 100000000000
Staking threshold (node-validator): 100000000000
Staking threshold (node-compute): 100000000000
Staking threshold (node-storage): 100000000000
Staking threshold (node-keymanager): 100000000000
Staking threshold (runtime-compute): 100000000000
Staking threshold (runtime-keymanager): 100000000000
```

The numbers are listed in base units, 1 token corresponds to 10^9 \(i.e. one billion\) base units.

We can observe that the total supply is 10 billion tokens and that almost 8 billion tokens are in the _common pool_.

Finally, the staking thresholds for the entity, all node kinds \(validator, compute, storage\) and all runtime kinds \(compute, key manager\) are 100 tokens.

This means that if you want to register, e.g. an entity with a validator node, you need to escrow \(i.e. stake\) at least 200 tokens.

## Obtaining Account Address From Entity's ID

A staking account address is represented by a truncated hash of a corresponding entity's public key, prefixed by a 1 byte address version.

It uses [Bech32 encoding](https://github.com/bitcoin/bips/blob/master/bip-0173.mediawiki#bech32) for text serialization with `oasis` as its human readable part \(HRP\) prefix.

To convert an entity ID \(Base64 encoded\), e.g. `nyjbDRKAXgUkL6CYfJP0WVA0XbF0pAGuvObZNMufgfY=`, to a staking account address, run:

```bash
oasis-node stake pubkey2address \
  --public_key nyjbDRKAXgUkL6CYfJP0WVA0XbF0pAGuvObZNMufgfY=
```

This will output the staking account address for the given entity ID:

```text
oasis1qrvsa8ukfw3p6kw2vcs0fk9t59mceqq7fyttwqgx
```

{% hint style="info" %}
You can find your entity's ID in the `id` field of the `entity.json` file.
{% endhint %}

## Account Info

To list all accounts with positive balance, run:

```bash
oasis-node stake list -a $ADDR
```

This will list all accounts' addresses, e.g.:

```text
oasis1qqqfalz4xars9nxn0mjy8fcf9quqg8ml0szm5ped
oasis1qqqd4wrmk8z9p3hz0vyc6zy3khx3gqnckywyg2s5
oasis1qqqul8678xs9tnj74x54k8ch2qdh7jveeswqf67j
oasis1qqzrcyed78mkxmt9qpv3pemsugknnhvnpv8v5vc3
oasis1qqz0qcmy932p69493qdkszcf9emgl55azys3xr8f
oasis1qq95xthkg20ra6ue8zyngqkkm92xqkvrms88axkj
oasis1qq9meupznk90d4lgluvcaqa27ggs55dscc6msc33
oasis1qq9acq6v5knfmatc9fvuwyzlexs0f7j3uvarusu6
oasis1qqxqlpfslwuuh5342qnstymyutancj7csucxv2ec
oasis1qqxmp9lggptm0pt23za7g5cfg2hzspezcumw7c3j
oasis1qq89qxh538sunk6p2fca487pfsy0ncxk9q4xf2un
oasis1qq8hgj2yzssawtpfqr8utj6d57k9zvx3wc989kqm
oasis1qq8atykwecy3p5rnspkweapzz847exaqwyv80wgx
oasis1qqgv5rxl4w27l89rf4j5dv8392kh42wt35yn0as6
oasis1qqg0h3mt7klha4w2kxjvsktv5ke6suuwpg8rvpdh
oasis1qqf3ctyg49tnwclksxun3dzhrv4zuww7hu7w3cul
oasis1qqfasfrrx2tae50kcy8mcclhp0kqymswsqnqytyg
oasis1qq2rlaz3yjfk8gtdhnrfkrz5rrxjnnrzeq7mst0r

... output trimmed ...
```

To get more information about a particular account, e.g. `oasis1qrvsa8ukfw3p6kw2vcs0fk9t59mceqq7fyttwqgx`, run:

```bash
oasis-node stake account info \
  -a $ADDR \
  --stake.account.address oasis1qrvsa8ukfw3p6kw2vcs0fk9t59mceqq7fyttwqgx \
  | python3 -m json.tool
```

This will output all staking information about this particular account, e.g.:

```javascript
{
    "general": {
        "balance": "376594833237"
    },
    "escrow": {
        "active": {
            "balance": "10528683450039",
            "total_shares": "10000000000000"
        },
        "debonding": {
            "balance": "0",
            "total_shares": "0"
        },
        "commission_schedule": {},
        "stake_accumulator": {
            "claims": {
                "registry.RegisterEntity": [
                    {
                        "global": "entity"
                    }
                ],
                "registry.RegisterNode.9Epy5pYPGa91IJlJ8Ivb5iby+2ii8APXdfQoMZDEIDc=": [
                    {
                        "global": "node-validator"
                    }
                ]
            }
        }
    }
}
```

We can observe that:

* Account's general balance \(`general.balance`\), the amount of base units that are available to the account owner, is ~377 tokens.
* Account's nonce \(`general.nonce`\), the incremental number that must be unique for each account's transaction, is omitted. That means there haven't been any transactions made with this account as the source. Therefore, the next transaction should have nonce equal to `0`.

Each account can also serve as an escrow account. Escrow accounts are used to keep the funds needed for specific consensus-layer operations \(e.g. registering and running nodes\).

To simplify accounting, each escrow results in the source account being issued shares which can be converted back into staking tokens during the reclaim escrow operation. Reclaiming escrow does not complete immediately, but may be subject to a debonding period during which the tokens still remain escrowed.

We can observe that:

* The amount of tokens that are actively bounded to the escrow account \(`escrow.active.balance`\) is ~10529 tokens.
* The total number of shares for the tokens actively bounded to the escrow account \(`escrow.active.total_shares`\) is 10 trillion.
* The amount of tokens that are currently debonding \(`escrow.debonding.balance`\) is 0.
* The total number of shares for the tokens that are currently debonding \(`escrow.debonding.total_shares`\) is 0.

An entity can also charge commission for tokens that are delegated to it. The commission schedule rate steps would be defined in `escrow.commission_schedule.rates` and the commission rate bound steps would be defined in `escrow.commission_schedule.bounds`. For more details, see the [Amending a commission schedule](stake-management.md#amending-a-commission-schedule) example.

Each escrow account also has a corresponding stake accumulator. It stores stake claims for an escrow account and ensures all claims are satisfied at any given point. Adding a new claim is only possible if all of the existing claims plus the new claim can be satisfied.

We can observe that the stake accumulator currently has two claims:

* The `registry.RegisterEntity` claim is for registering an entity. It needs to satisfy the global threshold \(`global`\) for registering an entity \(`entity`\) which is defined by the staking consensus parameters.

  To see the value of the `entity` global staking threshold, run the `oasis-node stake info` command as described in [Common token Info](stake-management.md#common-token-info) section.

* The `registry.RegisterNode.9Epy5pYPGa91IJlJ8Ivb5iby+2ii8APXdfQoMZDEIDc=` claim is for registering the node with ID `9Epy5pYPGa91IJlJ8Ivb5iby+2ii8APXdfQoMZDEIDc=`.  


  It needs to satisfy the global threshold \(`global`\) for registering a validator node \(`node-validator`\) which is defined by the staking consensus parameters.  


  To see the value of the `node-validator` global staking threshold, run the `oasis-node stake info` command as described in [Common Token Info](stake-management.md#common-token-info) section.  


  In addition to the global thresholds, each runtime the node is registering for may define their own thresholds. In case the node is registering for multiple runtimes, it needs to satisfy the sum of thresholds of all the runtimes it is registering for.  


  For more details, see [Oasis Core Developer Docs on registering a node](https://github.com/oasisprotocol/oasis-core/blob/master/docs/consensus/registry.md#register-node).

## Generating and Submitting Transactions

Next, we will learn how to generate and sign transactions offline \(i.e. on the `localhost`\) and then submit them on the online Oasis node \(i.e. the `server`\).

### Base Flags

All commands for generating and signing transactions need the following base flags set:

* `--genesis.file`: Path to the genesis file on the `localhost`, e.g. `/localhostdir/genesis.json`.

### Signer Flags

Currently, we provide two options for signing transactions:

* **Ledger device.**

  You will need to set it up as described in our [Ledger docs](https://docs.oasis.dev/oasis-core-ledger/usage/transactions).

* **Entity's private key stored in a file.**

  You will need to create your Entity as described in [Running a Node on the Amber Network](running-a-node.md#creating-your-entity) docs and set the following flags:

  * `--signer.backend file`: Specifies use of the file signer.
  * `--signer.dir`: Path to entity's artifacts directory on the `localhost`, e.g. `/localhostdir/entity/`.

### Storing Base and Signer flags in an Environment Variable

To make the transaction commands shorter and avoid typing errors, one can set an environment variable, e.g. `TX_FLAGS`, with all the [Base Flags](stake-management.md#base-flags) and [Signer Flags](stake-management.md#signer-flags) configured for his particular set up.

For example, one could set `TX_FLAGS` for a Ledger device like below \(replacing Ledger device address and address index appropriately\):

```bash
TX_FLAGS="--genesis.file /localhostdir/genesis.json \
  --signer.backend ledger \
  --signer.ledger.address oasis19hpt4y2reqwyfqcd53asjchdqf468chr673y6jn07xjp36w32jlscf0me \
  --signer.ledger.index 1 \
  --signer.dir /localhostdir/entity/"
```

Or, one could set `TX_FLAGS` like below to use a file signer:

```bash
TX_FLAGS="--genesis.file /localhostdir/genesis.json \
  --signer.backend file \
  --signer.dir /localhostdir/entity/"
```

### Common Transaction Flags

When generating a transaction, one needs to set the following transaction flags as appropriate for a given transaction:

* `--stake.amount`: Amount of base units to transfer, escrow, burn, etc.
* `--transaction.file`: Path to the file where to store the generated

  transaction.

* `--transaction.nonce`: Incremental number that must be unique for each account's transaction.

  To get your current account's nonce, see [Checking Your Account nonce](maintenance/checking-account-nonce.md) doc.

* `--transaction.fee.gas`: Maximum amount of gas \(in _gas units_\) a transaction can spend.  


  Gas costs for different staking transactions are specified by the `staking.params.gas_costs` consensus parameter.  


  To obtain its value from the genesis file, run:

  ```bash
  cat /localhostdir/genesis.json | \
    python3 -c 'import sys, json; \
    print(json.dumps(json.load(sys.stdin)["staking"]["params"]["gas_costs"], indent=4))'
  ```

* `--transaction.fee.amount`: Amount of base units we will pay as a fee for a transaction.

Note that specifying a transaction's fee amount \(via `--transaction.fee.amount`\) and maximum gas amount \(via `--transaction.fee.gas`\) implicitly defines the _gas price_ \(in base units\):

```text
gas_price = fee_amount / gas_amount
```

Gas price tells how much base units we are willing to pay for one gas unit.

Consensus validators can configure their own _minimum gas price_ \(via `consensus.tendermint.min_gas_price` configuration flag\) and will refuse to process transactions that have their gas price set below their minimum gas price.

{% hint style="info" %}
Currently, there is no mechanism to discover what minimum gas prices are used by validators.

For more details, see [Oasis Core \#2526](https://github.com/oasisprotocol/oasis-core/issues/2526).
{% endhint %}

## Example Transactions

Let's assume we have a staking account with address `oasis1qr6swa6gsp2ukfjcdmka8wrkrwz294t7ev39nrw6` and generate some concrete transactions for it.

{% hint style="info" %}
If you want to follow these examples yourself, make sure you've set the `TX_FLAGS` environment variable as described in the [Storing Base and Signer flags in an Environment Variable](stake-management.md#storing-base-and-signer-flags-in-an-environment-variable) section. 
{% endhint %}

{% hint style="info" %}
To convert your entity's ID to a staking account address, see the [Obtaining Account Address From Entity's ID](stake-management.md#obtaining-account-address-from-entitys-id) section.
{% endhint %}

### Querying Account Info

To query our staking account's information, use the following command:

```bash
oasis-node stake account info \
  -a $ADDR \
  --stake.account.address oasis1qr6swa6gsp2ukfjcdmka8wrkrwz294t7ev39nrw6 \
  | python3 -m json.tool
```

{% hint style="info" %}
For a detailed explanation on querying account information, see [Account Info](stake-management.md#account-info) section.
{% endhint %}

At the beginning, this outputs:

```javascript
{
    "general": {
        "balance": "601492492765",
        "nonce": 7
    },
    "escrow": {
        "active": {
            "balance": "11242384816640",
            "total_shares": "10000000000000"
        },
        "debonding": {
            "balance": "0",
            "total_shares": "0"
        },
        ...
    }
}
```

We can observe that:

* Account's general balance is ~601 tokens.
* Account's nonce is `7`.
* ~11242 tokens are actively bounded to the escrow account.
* The amount of tokens that are currently debonding is 0.

### Obtaining Transactions' Gas Costs

As explained in the [Common Transaction Flags](stake-management.md#common-transaction-flags) section, we can obtain gas costs for different staking transactions from the genesis file by running:

```bash
cat /localhostdir/genesis.json | \
  python3 -c 'import sys, json; \
  print(json.dumps(json.load(sys.stdin)["staking"]["params"]["gas_costs"], indent=4))'
```

For our network, this returns:

```javascript
{
    "add_escrow": 1000,
    "burn": 1000,
    "reclaim_escrow": 1000,
    "transfer": 1000
}
```

Hence, we will need to set the `--transaction.fee.gas` flag, i.e. the maximum amount of gas a transaction can spend, in the following transactions to at least 1000 _gas units_.

### Transferring Tokens

Let's start with token transfer transactions which transfer tokens from the signer's account to the given destination account.

Let's choose a destination account, e.g. `oasis1qr3jc2yfhszpyy0daha2l9xjlkrxnzas0uaje4t3`, and [check its current balance](stake-management.md#querying-account-info) \(replacing our account's address with the destination account's address\):

```javascript
{
    "general": {
        "balance": "0",
        "nonce": 1030
    },
    "escrow": {
        "active": {
            "balance": "0",
            "total_shares": "0"
        },
        "debonding": {
            "balance": "0",
            "total_shares": "0"
        },
        ...
    }
}
```

We can observe that the chosen destination account currently has general balance of 0 tokens.

Let's generate a transfer transaction of 170 tokens, \(i.e. 170 \* 10^9 base units\), from our account to the chosen destination account:

```bash
oasis-node stake account gen_transfer \
  $TX_FLAGS \
  --stake.amount 170000000000 \
  --stake.transfer.destination oasis1qr3jc2yfhszpyy0daha2l9xjlkrxnzas0uaje4t3 \
  --transaction.file tx_transfer.json \
  --transaction.nonce 7 \
  --transaction.fee.gas 1000 \
  --transaction.fee.amount 2000
```

To submit the generated transaction, we need to copy `tx_transfer.json` to the online Oasis node \(i.e. the `server`\) and submit it from there:

```bash
oasis-node consensus submit_tx \
  -a $ADDR \
  --transaction.file tx_transfer.json
```

Let's [check both accounts' info](stake-management.md#querying-account-info) \(first ours and then the destination's\):

```javascript
{
    "general": {
        "balance": "431492490765",
        "nonce": 8
    },
    "escrow": {
        "active": {
            "balance": "11242384816640",
            "total_shares": "10000000000000"
        },
        "debonding": {
            "balance": "0",
            "total_shares": "0"
        },
        ...
    }
}
```

```javascript
{
    "general": {
        "balance": "170000000000",
        "nonce": 1030
    },
    "escrow": {
        "active": {
            "balance": "0",
            "total_shares": "0"
        },
        "debonding": {
            "balance": "0",
            "total_shares": "0"
        },
        ...
    }
}
```

We can observe that:

* Our general balance decreased for 170 tokens and 2000 base units. The latter

  corresponds to the fee that we specified we will pay for this transaction.

* Our account's nonce increased to `8`.
* Destination account's general balance increased for 170 tokens.

### Escrowing Tokens

In this example we will put 208 tokens \(i.e. 208 \* 10^9 base units\) to our own escrow account.

First, let's generate an escrow transaction and store it to `tx_escrow.json`:

```bash
oasis-node stake account gen_escrow \
  $TX_FLAGS \
  --stake.amount 208000000000 \
  --stake.escrow.account oasis1qr6swa6gsp2ukfjcdmka8wrkrwz294t7ev39nrw6 \
  --transaction.file tx_escrow.json \
  --transaction.nonce 8 \
  --transaction.fee.gas 1000 \
  --transaction.fee.amount 2000
```

To submit the generated transaction, we need to copy `tx_escrow.json` to the online Oasis node \(i.e. the `server`\) and submit it from there:

```bash
oasis-node consensus submit_tx \
  -a $ADDR \
  --transaction.file tx_escrow.json
```

Let's [check our account's info](stake-management.md#querying-account-info):

```javascript
{
    "general": {
        "balance": "223492488765",
        "nonce": 9
    },
    "escrow": {
        "active": {
            "balance": "11450384816640",
            "total_shares": "10185014125910"
        },
        "debonding": {
            "balance": "0",
            "total_shares": "0"
        },
        ...
    }
}
```

We can observe that:

* Our general balance decreased for 208 tokens and 2000 base units. The latter

  corresponds to the fee that we specified we will pay for this transaction.

* Our account's nonce increased to `9`.
* Our escrow account's active balance increased for 208 tokens.
* The total number of shares in our escrow account's active balance

  increased from 10000000000000 to 10185014125910.

When a delegator delegates some amount of tokens to a staking account, the delegator receives the number of shares proportional to the current _share price_ \(in base units\) calculated from the total number of base units delegated to a staking account so far and the number of shares issued so far:

```text
shares_per_base_unit = account_issued_shares / account_delegated_base_units
```

In our case, the current share price \(i.e. `shares_per_base_unit`\) is 10000000000000 / 11242384816640 which is 0.8894909899542729.

For 208 tokens, the amount of newly issued shares is thus 208 \* 10^9 \* 0.8894909899542729 which is 185014125910.48877 \(rounded to 185014125910\).

### Reclaiming Escrowed Tokens

When we want to reclaim escrowed tokens, we can't do that directly. Instead, we need to specify the number of shares we want to reclaim from an escrow account.

For example, to reclaim 357 billion shares from an escrow account, we need to generate the following reclaim escrow transaction:

```bash
oasis-node stake account gen_reclaim_escrow \
  $TX_FLAGS \
  --stake.shares 357000000000 \
  --stake.escrow.account oasis1qr6swa6gsp2ukfjcdmka8wrkrwz294t7ev39nrw6 \
  --transaction.file tx_reclaim.json \
  --transaction.nonce 9 \
  --transaction.fee.gas 1000 \
  --transaction.fee.amount 2000
```

To submit the generated transaction, we need to copy `tx_reclaim.json` to the online Oasis node \(i.e. the `server`\) and submit it from there:

```bash
oasis-node consensus submit_tx \
  -a $ADDR \
  --transaction.file tx_reclaim.json
```

Let's [check our account's info](stake-management.md#querying-account-info):

```javascript
{
    "general": {
        "balance": "223492486765",
        "nonce": 10
    },
    "escrow": {
        "active": {
            "balance": "11049031678686",
            "total_shares": "9828014125910"
        },
        "debonding": {
            "balance": "401353137954",
            "total_shares": "401353137954"
        },
        ...
    }
}
```

We can observe that:

* Our general balance decreased for 2000 base units. This corresponds to the fee

  that we specified we will pay for this transaction.

* Our account's nonce increased to `10`.
* Our escrow account's active number of shares decreased for 357 billion shares

  to 9828014125910.

* Our escrow account's active balance decreased for 401353137954 base units and

  is now 11049031678686 base units.

* Our escrow account's debonding balance increased to 401353137954 base units

  and its number of shares to the same amount.

When a delegator wants to reclaim a certain number of escrowed tokens, the _base unit price_ \(in shares\) must be calculated based on the escrow account's current active balance and the number of issued shares:

```text
base_units_per_share = account_delegated_base_units / account_issued_shares
```

In our case, the current base unit price \(i.e. `base_units_per_share`\) is 11450384816640 / 10185014125910 which is 1.124238481664054 base unit per share.

For 357 billion shares, the amount of base units that will be reclaimed is thus 357 \* 10^9 \* 1.124238481664054 which is 401353137954.06726 \(rounded to 401353137954\).

Hence, the escrow account's active balance decreased for 401353137954 base units and the debonding balance increased for the same amount.

{% hint style="warning" %}
While the number of debonding shares currently equals the number of base units that are currently subject to debonding and hence, the amount of tokens we can except to reclaim after debonding period is over is a little over 401 tokens, there is no guarantee that this stays the same until the end of the debonding period since any slashing could change shares' price.
{% endhint %}

The debonding period is specified by the `staking.params.debonding_interval` consensus parameter and is represented as a number of epochs that need to pass.

To obtain its value from the genesis file, run:

```bash
cat /localhostdir/genesis.json | \
  python3 -c 'import sys, json; \
  print(json.load(sys.stdin)["staking"]["params"]["debonding_interval"])'
```

For our example network, this returns:

```text
10
```

After the debonding period has passed, the network will automatically move our escrow account's active debonding balance into our escrow account's active balance.

### Amending a Commission Schedule

We can configure our account to take a commission on staking rewards given to our node\(s\). The commission rate must be within bounds, which we can also configure.

Let's generate a transaction to:

* tell everyone that our bounds allow us to set any rate \(0% - 100%\), and
* we'll take 50%.

We're not allowed to change the commission bounds too close in near future, so we'd have to make changes a number of epochs in the future.

The commission schedule rules are specified by the `staking.params.commission_schedule_rules` consensus parameter.

To obtain its value from the genesis file, run:

```bash
cat /localhostdir/genesis.json | \
  python3 -c 'import sys, json; \
  rules = json.load(sys.stdin)["staking"]["params"]["commission_schedule_rules"]; \
  print(json.dumps(rules, indent=4))'
```

For our example network this returns:

```javascript
{
    "rate_change_interval": 1,
    "rate_bound_lead": 14,
    "max_rate_steps": 21,
    "max_bound_steps": 21
}
```

This means that we must submit a commission rate bound at least `14` epochs in advance \(`rate_bound_lead`\) and that we can change it on every epoch \(`rate_change_interval`\).

The `max_rate_steps` and `max_bound_steps` determine the maximum number of commission rate steps and rate bound steps, respectively.

In the example, we're setting the bounds to start on epoch 16. An account's default bounds are 0% maximum, so we have to wait until our new bounds go into effect to raise our rate to 50%. Because of that, we'll specify that our rate also starts on epoch 16.

```bash
oasis-node stake account gen_amend_commission_schedule \
  $TX_FLAGS \
  --stake.commission_schedule.bounds 16/0/100000 \
  --stake.commission_schedule.rates 16/50000 \
  --transaction.file tx_amend_commission_schedule.json \
  --transaction.nonce 11 \
  --transaction.fee.gas 1000 \
  --transaction.fee.amount 2000
```

Rates and minimum/maximum rates are in units of 1/100,000, so `0`, `50000`, and `100000` come out to 0%, 50%, and 100%, respectively.

To submit the generated transaction, we need to copy `tx_amend_commission_schedule.json` to the online Oasis node \(i.e. the `server`\) and submit it from there:

```bash
oasis-node consensus submit_tx \
  -a $ADDR \
  --transaction.file tx_amend_commission_schedule.json
```

After that, we can [check our account's info](stake-management.md#querying-account-info), and we should see something like this:

```javascript
{
    "general": {
        ...
        "nonce": 11
    },
    "escrow": {
        ...
        "commission_schedule": {
            "rates": [
                "start": 16,
                "rate": "50000",
            ],
            "bounds": [
                "start": 16,
                "rate_min": "0",
                "rate_max": "100000"
            ]
        }
    }
}
```

Node operators collect commissions when their node earns a staking reward for delegators. A validator node earns a staking reward for participating in the consensus protocol each epoch. The commission rate is a fraction of the staking reward.

For example, if our node earns a reward of 0.007 tokens, 0.0035 tokens are added to the escrow pool \(increasing the value of our escrow pool shares uniformly\), and 0.0035 tokens are given to us \(issuing us new shares as if we manually deposited them\).

{% hint style="info" %}
It is also possible to set multiple commission rate steps and rate bound steps by passing the `--stake.commission_schedule.rates` and `--stake.commission_schedule.bounds` CLI flags multiple times.

For example, setting multiple commission rate steps and rate bound steps with:

```bash
oasis-node stake account gen_amend_commission_schedule \
  ...
  --stake.commission_schedule.bounds 32/10000/50000 \
  --stake.commission_schedule.bounds 64/10000/30000 \
  --stake.commission_schedule.rates 32/50000 \
  --stake.commission_schedule.rates 40/40000 \
  --stake.commission_schedule.rates 48/30000 \
  --stake.commission_schedule.rates 56/25000 \
  --stake.commission_schedule.rates 64/20000 \
  ...
```

would result in the following commission schedule when [checking an account's info](stake-management.md#querying-account-info):

```javascript
{
    "general": {
        ...
    },
    "escrow": {
        ...
        "commission_schedule": {
            "rates": [
                {
                    "start": 32,
                    "rate": "50000"
                },
                {
                    "start": 40,
                    "rate": "40000"
                },
                {
                    "start": 48,
                    "rate": "30000"
                },
                {
                    "start": 56,
                    "rate": "25000"
                },
                {
                    "start": 64,
                    "rate": "20000"
                }
            ],
            "bounds": [
                {
                    "start": 32,
                    "rate_min": "10000",
                    "rate_max": "50000"
                },
                {
                    "start": 64,
                    "rate_min": "10000",
                    "rate_max": "30000"
                }
            ]
        },
        ...
    }
}
```
{% endhint %}

{% hint style="info" %}
To troubleshoot an amendment that's rejected, consult our [compendium of 23 common ways for a commission schedule amendment to fail](https://github.com/oasisprotocol/oasis-core/blob/0dee03d75b3e8cfb36293fbf8ecaaec6f45dd3a5/go/staking/api/commission_test.go#L61-L610).
{% endhint %}

