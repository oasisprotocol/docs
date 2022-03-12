# Obtain Account Address From Entity's ID

To convert an entity ID (Base64 encoded), e.g. `nyjbDRKAXgUkL6CYfJP0WVA0XbF0pAGuvObZNMufgfY=`, to a [staking account address](../../terminology.md#address), run:

```bash
oasis-node stake pubkey2address \
  --public_key nyjbDRKAXgUkL6CYfJP0WVA0XbF0pAGuvObZNMufgfY=
```

This will output the staking account address for the given entity ID:

```
oasis1qrvsa8ukfw3p6kw2vcs0fk9t59mceqq7fyttwqgx
```

:::info

You can find your entity's ID in the `id` field of the `entity.json` file.

:::
