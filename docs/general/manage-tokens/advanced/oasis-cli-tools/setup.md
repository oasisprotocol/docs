# Setup

Make sure you have installed everything described in the [Prerequisites](prerequisites.md) section.

## Server commands

To run a command that requires a connection to an online Oasis node (i.e. the `server`), you need to either:

* change the working directory to where the internal Oasis node UNIX socket is located (e.g. `/serverdir/node/`) before executing the command, or
* pass the `-a $ADDR` flag where `ADDR` represents the path to the internal Oasis node UNIX socket prefixed with `unix:` (e.g.`unix:/serverdir/node/internal.sock`).

Here are some examples of Oasis Node CLI commands that need a connection to an online Oasis node:

* `oasis-node stake info`: Shows general staking information.
* `oasis-node stake list`: Lists all accounts with positive balance.
* `oasis-node stake account info`: Shows detailed information for an account.
* `oasis-node consensus submit_tx`: Submits a pre-generated transaction to the network.

## Local commands

The following commands are intended to be run on your local machine and only need access to the [network's current genesis file](../../../../node/mainnet/README.md) and your signer's private key:

* `oasis-node stake account gen_transfer`
* `oasis-node stake account gen_escrow`
* `oasis-node stake account gen_reclaim_escrow`
* `oasis-node stake account gen_amend_commission_schedule`

:::danger

We strongly suggest that you do not use any entity/staking account that is generated with the file-based signer on the Mainnet.

In case you need to use the file-based signer, make sure you only use it on an [offline/air-gapped machine](https://en.wikipedia.org/wiki/Air_gap_\(networking\)). Gaining access to your entity's/staking account's private key can compromise your tokens.

:::

## JSON pretty-printing

We will pipe the output of commands that return JSON through [Python's `json.tool` module](https://docs.python.org/3/library/json.html#module-json.tool) to pretty-print it.

:::caution

Be aware that [jq](https://stedolan.github.io/jq/), the popular JSON CLI tool, [converts all numbers to IEEE 754 64-bit values](https://github.com/stedolan/jq/wiki/FAQ#caveats) which can result in silent loss of precision and/or other changes.

Hence, we recommend avoiding its usage until this issue is resolved.

:::

## Common CLI Flags

### Base Flags

All commands for generating and signing transactions need the following base flags set:

* `--genesis.file`: Path to the genesis file, e.g. `/localhostdir/genesis.json`.

For convenience, set the `GENESIS_FILE` environment value to its value, e.g.:

```bash
  GENESIS_FILE=/localhostdir/genesis.json
```

*   `--signer.dir`: Path to entity's artifacts directory, e.g. `entity-$LEDGER_INDEX`

    or `/localhostdir/entity/`

### Signer Flags

Currently, we provide two options for signing transactions:

*   **Ledger-based signer.**

    You will need to set it up as described in our [Oasis Core Ledger](../../../../oasis-core-ledger/usage/transactions.md) docs.
*   **File-based signer.**

    You will need to create your Entity as described in [Running a Node on the Network](../../../../node/run-your-node/validator-node/README.md#creating-your-entity) docs and set the following flags:

    * `--signer.backend file`: Specifies use of the file signer.

### Storing Base and Signer flags in an Environment Variable

To make the transaction commands shorter and avoid typing errors, one can create an environment variable, e.g. `TX_FLAGS`, with all the [Base Flags](setup.md#base-flags) and [Signer Flags](setup.md#signer-flags) configured for his particular set up.

For example, one could set `TX_FLAGS` for a Ledger device like below (make sure all `LEDGER_*` environment variables are set appropriately):

```bash
TX_FLAGS=(--genesis.file "$GENESIS_FILE"
  --signer.dir /localhostdir/entity
  --signer.backend plugin
  --signer.plugin.name ledger
  --signer.plugin.path "$LEDGER_SIGNER_PATH"
)
```

Or, one could set `TX_FLAGS` like below to use a file signer:

```bash
TX_FLAGS=(--genesis.file "$GENESIS_FILE"
  --signer.backend file
  --signer.dir /localhostdir/entity/
)
```

### Common Transaction Flags

When generating a transaction, one needs to set the following transaction flags as appropriate for a given transaction:

* `--stake.amount`: Amount of base units to transfer, escrow, burn, etc.
* `--transaction.file`: Path to the file where to store the generated transaction.
* `--transaction.nonce`: Incremental number that must be unique for each account's transaction. To
  get your current account's nonce, see [Checking Your Account nonce](get-account-nonce.md) doc.
* `--transaction.fee.gas`: Maximum amount of gas (in _gas units_) a transaction can spend.

Gas costs for different staking transactions are specified by the `staking.params.gas_costs` consensus parameter.

To obtain its value from the genesis file, run:

```bash
  cat $GENESIS_FILE | \
    python3 -c 'import sys, json; \
    print(json.dumps(json.load(sys.stdin)["staking"]["params"]["gas_costs"], indent=4))'
```

* `--transaction.fee.amount`: Amount of base units we will pay as a fee for a transaction.

Note that specifying a transaction's fee amount (via `--transaction.fee.amount`) and maximum gas amount (via `--transaction.fee.gas`) implicitly defines the _gas price_ (in base units):

```
gas_price = fee_amount / gas_amount
```

Gas price tells how much base units we are willing to pay for one gas unit.

Consensus validators can configure their own _minimum gas price_ (via `consensus.tendermint.min_gas_price` configuration flag) and will refuse to process transactions that have their gas price set below their minimum gas price.

:::info

Currently, there is no mechanism to discover what minimum gas prices are used by validators.

For more details, see [Oasis Core #2526](https://github.com/oasisprotocol/oasis-core/issues/2526).

:::
