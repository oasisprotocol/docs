# Common Staking Info

{% hint style="info" %}
This example assumes you have read and followed the [Prerequisites](prerequisites.md) and [Setup](setup.md) sections.
{% endhint %}

To query an Oasis node for the common staking information, run:

```bash
oasis-node stake info -a $ADDR
```

This will output something like:

```text
Token's ticker symbol: ROSE
Token's value base-10 exponent: 9
Total supply: ROSE 10000000000.0
Common pool: ROSE 7999217230.11968289
Last block fees: ROSE 0.0
Staking threshold (entity): ROSE 100.0
Staking threshold (node-validator): ROSE 100.0
Staking threshold (node-compute): ROSE 100.0
Staking threshold (node-storage): ROSE 100.0
Staking threshold (node-keymanager): ROSE 100.0
Staking threshold (runtime-compute): ROSE 100.0
Staking threshold (runtime-keymanager): ROSE 100.0
```

We can see that the token's name is ROSE and that 1 token corresponds to 10^9 \(i.e. one billion\) base units.

Next, we can observe that the **total supply** is 10 billion tokens and that almost 8 billion tokens are in the **common pool**.

Finally, the **staking thresholds** for the entity, all node kinds \(validator, compute, storage\) and all runtime kinds \(compute, key manager\) are 100 tokens.

This means that if you want to register, e.g. an entity with a validator node, you need to escrow \(i.e. stake\) at least 200 tokens.

