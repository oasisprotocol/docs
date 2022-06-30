# Common Staking Info

:::info

This example assumes you have read and followed the
[Prerequisites](prerequisites.md) and [Setup](setup.md) sections.

:::

To query an Oasis node for the common staking information, run:

```bash
oasis-node stake info -a $ADDR
```

At time of writing this document, the command will output the following:

```text
Token's ticker symbol: ROSE
Token's value base-10 exponent: 9
Total supply: 10000000000.0 ROSE
Common pool: 1319242295.211384785 ROSE
Last block fees: 0.0 ROSE
Governance deposits: 0.0 ROSE
Staking threshold (entity): 100.0 ROSE
Staking threshold (node-validator): 100.0 ROSE
Staking threshold (node-compute): 100.0 ROSE
Staking threshold (node-keymanager): 100.0 ROSE
Staking threshold (runtime-compute): 50000.0 ROSE
Staking threshold (runtime-keymanager): 50000.0 ROSE
```

We can see that the token's name is ROSE and that 1 token corresponds to 10^9
(i.e. one billion) base units.

Next, we can observe that the **total supply** is 10 billion tokens and that
about 1.3 billion tokens are in the **common pool**.

The **staking thresholds** for the entity and all node kinds (validator,
compute, key manager) are 100 tokens.

This means that if you want to register, e.g. an entity with a validator node,
you need to escrow (i.e. stake) at least 200 tokens.

Staking threshold for registering a **new runtime** (ParaTime) of any kind
(compute, key manager) is 50,000 tokens.

In addition, each runtime may require an **additional staking threshold** for
running a compute node. You need to query the registry in verbose mode to
obtain it:

```bash
$ ./oasis-node registry runtime list -v -a $ADDR
```

For example, Emerald ParaTime running on the Mainnet has the following
additional staking requirements: 

```json
{
  "v": 3,
  "id": "000000000000000000000000000000000000000000000000e2eaa99fc008f87f",
  ...
  "staking": {
    "thresholds": {
      "node-compute": "1000000000000000"
    },
    "min_in_message_fee": "0"
  },
  ...
}
```

To register a node that is both a validator and a compute node for Emerald
ParaTime, the entity for which the node is registered would need to satisfy the following:

* Entity registration staking threshold (currently 100 tokens),
* Validator node staking threshold (currently 100 tokens),
* Compute node staking threshold (currently 100 tokens),
* Emerald-specific staking threshold (currently 5,000,000 tokens),

All together, there would need to be at least 5,000,300 tokens staked in your
entity's escrow account.
