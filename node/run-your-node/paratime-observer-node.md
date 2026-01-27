# ParaTime Observer Node

Source: https://docs.oasis.io/node/run-your-node/paratime-observer-node

**Info**:

These instructions are for setting up a *ParaTime observer* node, which is a special client node that supports
confidential smart contact queries. If you just want to run a *ParaTime client* node, see the
[instructions for running a ParaTime client node](https://docs.oasis.io/node/run-your-node/paratime-client-node.md). If you want to run a *ParaTime* node
instead, see the [instructions for running a ParaTime node](https://docs.oasis.io/node/run-your-node/paratime-node.md). Similarly, if you want to run a
*validator* or a *non-validator* node instead, see the [instructions for running a validator node](https://docs.oasis.io/node/run-your-node/validator-node.md)
or [instructions for running a non-validator node](https://docs.oasis.io/node/run-your-node/non-validator-node.md).

**Tip**:

[TEE support] and a ParaTime client node with a confidential ParaTime is required to run a ParaTime observer node.

**Tip**:

There may be per-ParaTime on-chain policy requirements (such as whitelisting) for running observer nodes.

This guide will cover setting up your ParaTime observer node for the Oasis Network. Observer nodes are ParaTime
client nodes that support confidential queries without being elected into the compute committee. They are registered on
chain so that their eligibility can be enforced by an on-chain policy (e.g. key manager committees can grant them
permissions). This way users can, for example, run confidential transactions and view calls on [Sapphire] ParaTime.
This guide assumes some basic knowledge on the use of command line tools.

[Sapphire]: https://docs.oasis.io/build/sapphire.md

## Prerequisites

Before following this guide, make sure you've followed the [Prerequisites](https://docs.oasis.io/node/run-your-node/prerequisites.md),
[Run a Non-validator Node](https://docs.oasis.io/node/run-your-node/non-validator-node.md), and [Run a ParaTime client Node](https://docs.oasis.io/node/run-your-node/paratime-client-node.md)
sections and have a working ParaTime client node with [TEE support].

### Stake Requirements

To be able to register as a ParaTime observer node on the Oasis Network, you need to have enough tokens staked in your
entity's escrow account.

Current minimum staking requirements for a specific ParaTime are listed on the [Stake Requirements] page. You can also
use [Oasis CLI tools] to check that as described in [Common Staking Info].

Finally, to stake the tokens and to check if you staked correctly, you can use any wallet and any explorer. If using
our [Oasis CLI tools] and if everything was set up correctly, you should see something like below when running
[`oasis account show`] command for your entity's account (this is an example for Testnet):

```shell
oasis account show oasis1qrec770vrek0a9a5lcrv0zvt22504k68svq7kzve --show-delegations
```

```
Address: oasis1qrec770vrek0a9a5lcrv0zvt22504k68svq7kzve
Nonce: 33

=== CONSENSUS LAYER (testnet) ===
  Total: 972.898210067 TEST
  Available: 951.169098086 TEST

  Active Delegations from this Account:
    Total: 16.296833986 TEST

    Delegations:
      - To:     oasis1qz2tg4hsatlxfaf8yut9gxgv8990ujaz4sldgmzx
        Amount: 16.296833986 TEST (15000000000 shares)
  Debonding Delegations from this Account:
    Total: 5.432277995 TEST

    Delegations:
      - To:       oasis1qz2tg4hsatlxfaf8yut9gxgv8990ujaz4sldgmzx
        Amount:   5.432277995 TEST (5432277995 shares)
        End Time: epoch 26558

  Allowances for this Account:
    Total: 269.5000002 TEST
    Allowances:
      - Beneficiary: oasis1qqczuf3x6glkgjuf0xgtcpjjw95r3crf7y2323xd
        Amount:      269.5 TEST
      - Beneficiary: oasis1qrydpazemvuwtnp3efm7vmfvg3tde044qg6cxwzx
        Amount:      0.0000002 TEST

=== sapphire PARATIME ===
Balances for all denominations:
  6.9995378 TEST
```

**Caution**:

The stake requirements may differ from ParaTime to ParaTime and are subject to change in the future.

Currently, for example, if you want to register an observer node for Testnet/Mainnet, you currently need to have at
least **200 TEST/ROSE** tokens delegated:

* **100 TEST/ROSE** for registering a new node entity and,
* **100 TEST/ROSE** for each observer node.

See the [Stake Requirements] page for more details.

[Stake Requirements]: https://docs.oasis.io/node/run-your-node/prerequisites/stake-requirements.md

[Run a ParaTime Node]: https://docs.oasis.io/get-involved/run-node/paratime-node.md

[Common Staking Info]: https://docs.oasis.io/build/tools/cli/network.md#show-native-token

[TEE support]: https://docs.oasis.io/node/run-your-node/prerequisites/set-up-tee.md

[Oasis CLI tools]: https://docs.oasis.io/build/tools/cli/account.md#delegate

[`oasis account show`]: https://docs.oasis.io/build/tools/cli/account.md#show

### Register a New Entity or Update Your Entity Registration

**Danger**:

Everything in this section should be done on the `localhost` as there are sensitive items that will be created.

**Danger**:

If you plan to run an observer node for Mainnet and Testnet make sure you create and use two separate entities to
prevent replay attacks.

1. If you don't have an entity yet, create a new one by following the [Initialize Entity] instructions for validators.

2. If you will be running the ParaTime on a new Oasis node, also initialize a new node by following the
   [Starting the Oasis Node] instructions for validators.

3. Now, [list your node ID] in the entity descriptor file `nodes` field.

4. [Register] the updated entity descriptor.

5. By adding the created entity ID in the node config file, you will [configure the node] to automatically register for
   the roles it has enabled (i.e. observer role) via the `registration.entity_id` configuration flag. No manual node
   registration is necessary.

   ```yaml
   mode: client
   # ... sections not relevant are omitted ...
   registration:
     entity_id: {{ entity_id }}
   ```

6. Once the registration is complete, please share the Entity IDs with us so that we can whitelist them accordingly.

[Initialize Entity]: https://docs.oasis.io/node/run-your-node/validator-node.md#initialize-entity

[Starting the Oasis Node]: https://docs.oasis.io/node/run-your-node/validator-node.md#starting-the-oasis-node

[list your node ID]: https://docs.oasis.io/node/run-your-node/validator-node.md#add-your-node-id-to-the-entity-descriptor

[Register]: https://docs.oasis.io/node/run-your-node/validator-node.md#entity-registration

[`oasis account withdraw`]: https://docs.oasis.io/build/tools/cli/account.md#withdraw

[configure the node]: https://docs.oasis.io/node/run-your-node/paratime-node.md#configuration

## (Re)starting the Oasis Node

You can (re)start the node by running the following command:

```bash
oasis-node --config /node/etc/config.yml
```

After one epoch the node should register as observer (assuming it satisfies per-ParaTime policy requirements).

## Checking Node Status

To ensure that your node has the observer node, you can run the following command after the node has started:

```bash
oasis-node control status -a unix:/node/data/internal.sock
```

You should see `"observer"` in the `.registration.descriptor.roles` output entry.

## See also

* [Oasis Web3 Gateway for your EVM ParaTime](https://docs.oasis.io/node/web3.md)

---

*To find navigation and other pages in this documentation, fetch the llms.txt file at: https://docs.oasis.io/llms.txt*
