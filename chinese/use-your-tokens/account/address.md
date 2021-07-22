# Address

A **staking account address** is represented by a truncated hash of a corresponding entity's public key, prefixed by a 1 byte address version.

It uses [Bech32 encoding](https://github.com/bitcoin/bips/blob/master/bip-0173.mediawiki#bech32) for text serialization with `oasis` as its human readable part \(HRP\) prefix.

## Obtain Account Address From Entity's ID

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

