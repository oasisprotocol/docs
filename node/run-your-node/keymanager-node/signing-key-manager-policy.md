# Signing Key Manager Policy

Source: https://docs.oasis.io/node/run-your-node/keymanager-node/signing-key-manager-policy

This guide will describe how to print and sign an Oasis [key manager policy].

**Info**:

These instructions are only applicable if you are part of a key manager policy
signer set.

## Prerequisites

### Oasis Node Binary

Make sure you have followed the [Oasis Node binary installation guide] and have
the Oasis Node binary installed on your system.

### Entity

Similarly to other things, an entity's private key is used to sign a key manager
policy.

The trusted key manager policy signer set (i.e. the authorized public keys) and
the threshold of keys that need to sign the policy are hard-coded in the key
manager's source code.
The trusted signer set for the Oasis Key Manager is defined in [its source
code][oasis-km-signer-set].

**Danger**:

We strongly recommend using a dedicated (single-purpose) entity for signing key
manager policies for production key managers, i.e. the ones deployed on
Mainnet and connected to a production ParaTime.

To provision a new entity, follow the [instructions in our Validator Node
guide].

**Caution**:

Currently, Ledger-based signers do not support signing key manager policies.

**Danger**:

In case a file-based signer needs to be used, we strongly recommend using an
[offline/air-gapped machine] for this purpose and never exposing the entity's
private key to an online machine.

Gaining access to the entity's private key can compromise the trusted key
manager policy signer set and hence the key manager itself.

[key manager policy]: https://docs.oasis.io/core/consensus/services/keymanager.md#policies

[Oasis Node binary installation guide]: https://docs.oasis.io/node/run-your-node/prerequisites/oasis-node.md

[oasis-km-signer-set]: https://github.com/oasisprotocol/keymanager-paratime/blob/main/src/lib.rs

[instructions in our Validator Node guide]: https://docs.oasis.io/node/run-your-node/validator-node.md#initialize-entity

[offline/air-gapped machine]: https://en.wikipedia.org/wiki/Air_gap_\(networking\)

## Define Variables

For easier handling of key manager policy files, define the following variables:

```shell
POLICY=path/to/policy.cbor
KEY=path/to/entity/key.pem
NAME=your_name
```

## Printing a Policy

To print and inspect a key manager policy, use the following command:

```shell
oasis-node keymanager verify_policy \
  --keymanager.policy.file $POLICY \
  --keymanager.policy.ignore.signature \
  --verbose
```

This should output something like the following:

```json title="Example of an actual Oasis Testnet Key Manager policy"
{
  "serial": 8,
  "id": "4000000000000000000000000000000000000000000000004a1a53dff2ae482d",
  "enclaves": {
    "ZhD5ufyc/MReZD1qMSKNCRxnkNiZ3BtxqcYdx4+M0N9AJdq369ofvsxONjdgbgISFND0HG0EIv03iyqLiIGEWQ==": {
      "may_query": {
        "0000000000000000000000000000000000000000000000000000000000000000": [
          "c0SidcKhBx3iuonmtXURnFB+qIVkg+nAiaAozAh16ltAJdq369ofvsxONjdgbgISFND0HG0EIv03iyqLiIGEWQ=="
        ],
        "000000000000000000000000000000000000000000000000a6d1e3ebf60dff6c": [
          "LwbLEQ6dv+R5wv5q5CGRZWiEBWGxgCi/gpphcJFQ5zVAJdq369ofvsxONjdgbgISFND0HG0EIv03iyqLiIGEWQ=="
        ]
      },
      "may_replicate": [
        "jTX8etUcGSQBq3C4WbLlexga7dhQFnwzSJOEmRCPvfRAJdq369ofvsxONjdgbgISFND0HG0EIv03iyqLiIGEWQ=="
      ]
    },
    "jTX8etUcGSQBq3C4WbLlexga7dhQFnwzSJOEmRCPvfRAJdq369ofvsxONjdgbgISFND0HG0EIv03iyqLiIGEWQ==": {
      "may_query": {
        "0000000000000000000000000000000000000000000000000000000000000000": [
          "c0SidcKhBx3iuonmtXURnFB+qIVkg+nAiaAozAh16ltAJdq369ofvsxONjdgbgISFND0HG0EIv03iyqLiIGEWQ=="
        ],
        "000000000000000000000000000000000000000000000000a6d1e3ebf60dff6c": [
          "LwbLEQ6dv+R5wv5q5CGRZWiEBWGxgCi/gpphcJFQ5zVAJdq369ofvsxONjdgbgISFND0HG0EIv03iyqLiIGEWQ=="
        ]
      },
      "may_replicate": []
    }
  }
}
```

The `"serial"` key, e.g. `8`, represents the key manager policy's serial number
that must increase with every update of the key manager policy.

The `"id"` key, e.g.
`"4000000000000000000000000000000000000000000000004a1a53dff2ae482d"`, represents
the key manager ParaTime's runtime ID.

The keys below `"enclaves"`, e.g.
`"ZhD5ufyc/MReZD1qMSKNCRxnkNiZ3BtxqcYdx4+M0N9AJdq369ofvsxONjdgbgISFND0HG0EIv03iyqLiIGEWQ=="`
and `"jTX8etUcGSQBq3C4WbLlexga7dhQFnwzSJOEmRCPvfRAJdq369ofvsxONjdgbgISFND0HG0EIv03iyqLiIGEWQ=="`,
represent the identities of the key manager enclaves.
Each key manager enclave ID is comprised of two parts: its `MRENCLAVE` and its
`MRSIGNER`.

Each key manager enclave identity has two lists: `"may_query"` and
`"may_replicate"`.

Items in `"may_query"` list, e.g.
`"0000000000000000000000000000000000000000000000000000000000000000"` and
`"000000000000000000000000000000000000000000000000a6d1e3ebf60dff6c"`,
represent the runtime IDs of the ParaTimes that are allowed to query the key
manager (in this example, the Cipher and the Sapphire ParaTimes running on the
Testnet).

The items under runtime IDs of the ParaTimes, e.g.
`"c0SidcKhBx3iuonmtXURnFB+qIVkg+nAiaAozAh16ltAJdq369ofvsxONjdgbgISFND0HG0EIv03iyqLiIGEWQ=="`
and
`"LwbLEQ6dv+R5wv5q5CGRZWiEBWGxgCi/gpphcJFQ5zVAJdq369ofvsxONjdgbgISFND0HG0EIv03iyqLiIGEWQ=="`,
represent the identities of the runtime enclaves.
Similarly to the key manager enclave ID, each runtime enclave ID is comprised of
two parts: its `MRENCLAVE` and its `MRSIGNER`.

Items in `"may_replicate"` list, e.g.
`"jTX8etUcGSQBq3C4WbLlexga7dhQFnwzSJOEmRCPvfRAJdq369ofvsxONjdgbgISFND0HG0EIv03iyqLiIGEWQ=="`,
represent the key manager enclave IDs to which an existing key manager enclave is
allowed to replicate itself to.
This is used for key manager upgrades when an old key manager enclave (i.e. its
master secret) is allowed to replicate itself to a new key manager enclave.

**Tip**:

To see what has changed between two key manager policies, diff the outputs
of the `oasis-node keymanager verify_policy` commands for the corresponding key
manager policy files.

## Signing a Policy

Once a key manager policy has been inspected, use the following command to sign
it:

```bash
oasis-node keymanager sign_policy \
  --keymanager.policy.file $POLICY \
  --keymanager.policy.key.file $KEY \
  --keymanager.policy.signature.file $POLICY.$NAME.signed
```

---

*To find navigation and other pages in this documentation, fetch the llms.txt file at: https://docs.oasis.io/llms.txt*
