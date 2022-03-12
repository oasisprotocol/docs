# Get Account Nonce

:::info

This example assumes you have read and followed the instructions in the [Prerequisites](prerequisites.md) and [Setup](setup.md) sections.

:::

To get more a particular staking account's, e.g. `oasis1qrvsa8ukfw3p6kw2vcs0fk9t59mceqq7fyttwqgx`, nonce, run:

```bash
oasis-node stake account nonce \
  -a $ADDR \
  --stake.account.address oasis1qrvsa8ukfw3p6kw2vcs0fk9t59mceqq7fyttwqgx
```

### Get Your Entity's Nonce

:::info

This example assumes you have the [jq](http://stedolan.github.io/jq/) tool installed on your system.

:::

If you want to get your entity's nonce, you can use the following combination of commands:

```bash
ENTITY_DIR=<PATH-TO-YOUR-ENTITY>
ADDRESS=$(oasis-node stake pubkey2address --public_key \
  $(cat $ENTITY_DIR/entity.json | jq .id -r))
NONCE=$(oasis-node stake account nonce --stake.account.address $ADDRESS -a $ADDR)
```

where `<PATH-TO-YOUR-ENTITY>` is the path to your entity's descriptor, e.g. `/serverdir/node/entity/`.

