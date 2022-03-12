# Gas Costs

:::info

This example assumes you have read and followed the instructions in the [Prerequisites](prerequisites.md) and [Setup](setup.md) sections.

:::

### Obtaining Transactions' Gas Costs

As explained in the [Common Transaction Flags](setup.md#common-transaction-flags) section, we can obtain gas costs for different staking transactions from the genesis file by running:

```bash
cat $GENESIS_FILE | \
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

Hence, we will need to set the `--transaction.fee.gas` flag, i.e. the maximum amount of gas a transaction can spend, in the following transactions to at least 1000 **gas units**.

