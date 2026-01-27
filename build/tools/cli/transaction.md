# Transaction

Source: https://docs.oasis.io/build/tools/cli/transaction

## Transaction Tools

The `transaction` command offers convenient tools for processing raw
consensus or ParaTime transactions stored in a JSON file:

* decoding and displaying the transaction,
* verifying transaction's signature,
* signing the transaction,
* broadcasting the transaction.

### Decode, Verify and Show a Transaction

To show the transaction, invoke `transaction show <filename.json>` and provide
a filename containing a previously generated transaction by `oasis-node` or the
Oasis CLI's [`--output-file`][account-output-file] parameter.

[account-output-file]: https://docs.oasis.io/build/tools/cli/account.md#output-file

For example, let's take the following transaction transferring `1.0 TEST` from
`test:alice` to `test:bob` on Testnet consensus layer and store it to
`testtx.json`:

```json title="testtx.json"
{
  "untrusted_raw_value": "pGNmZWWiY2dhcwFmYW1vdW50QGRib2R5omJ0b1UAyND0Wds45cwxynfmbSxEVty+tQJmYW1vdW50RDuaygBlbm9uY2UBZm1ldGhvZHBzdGFraW5nLlRyYW5zZmVy",
  "signature": {
    "public_key": "NcPzNW3YU2T+ugNUtUWtoQnRvbOL9dYSaBfbjHLP1pE=",
    "signature": "ph5Sj29JFG8p0rCqAXjHm+yLwiXHybxah9C1cVTI01SDeJlyXT8dbp4BfI1hFxBomgi1hOrevTpShX0f9puTCQ=="
  }
}
```

We can decode and verify the transaction as follows:

```shell
oasis transaction show testtx.json --network testnet
```

```
Hash: c996e9d17d652d5dc64589d10806c244a5ef0f650cc2ec8c810b28a85fef5705
Signer: NcPzNW3YU2T+ugNUtUWtoQnRvbOL9dYSaBfbjHLP1pE=
        (signature: ph5Sj29JFG8p0rCqAXjHm+yLwiXHybxah9C1cVTI01SDeJlyXT8dbp4BfI1hFxBomgi1hOrevTpShX0f9puTCQ==)
Content:
  Method: staking.Transfer
  Body:
    To:     oasis1qrydpazemvuwtnp3efm7vmfvg3tde044qg6cxwzx
    Amount: 1.0 TEST
  Nonce:  1
  Fee:
    Amount: 0.0 TEST
    Gas limit: 1
    (gas price: 0.0 TEST per gas unit)

Network:  testnet
ParaTime: none (consensus layer)
```

Since the signature depends on the [chain domain separation context], the
transaction above will be invalid on other networks such as the Mainnet. In this
case the Oasis CLI will print the `[INVALID SIGNATURE]` warning below the
signature:

```shell
oasis transaction show testtx.json --network mainnet
```

```text {4}
Hash: c996e9d17d652d5dc64589d10806c244a5ef0f650cc2ec8c810b28a85fef5705
Signer: NcPzNW3YU2T+ugNUtUWtoQnRvbOL9dYSaBfbjHLP1pE=
        (signature: ph5Sj29JFG8p0rCqAXjHm+yLwiXHybxah9C1cVTI01SDeJlyXT8dbp4BfI1hFxBomgi1hOrevTpShX0f9puTCQ==)
        [INVALID SIGNATURE]
Content:
  Method: staking.Transfer
  Body:
    To:     oasis1qrydpazemvuwtnp3efm7vmfvg3tde044qg6cxwzx
    Amount: 1.0 ROSE
  Nonce:  1
  Fee:
    Amount: 0.0 ROSE
    Gas limit: 1
    (gas price: 0.0 ROSE per gas unit)

Network:  mainnet
ParaTime: none (consensus layer)
```

The `show` command is also compatible with ParaTime transactions. Take the
following transaction which transfers `1.0 TEST` from `test:alice` to `test:bob`
inside Sapphire ParaTime on the Testnet:

```json title="testtx2.json"
{
  "Body": "o2F2AWJhaaJic2mBomVub25jZQFsYWRkcmVzc19zcGVjoWlzaWduYXR1cmWhZ2VkMjU1MTlYIDXD8zVt2FNk/roDVLVFraEJ0b2zi/XWEmgX24xyz9aRY2ZlZaJjZ2FzAWZhbW91bnSCQEBkY2FsbKJkYm9keaJidG9VAMjQ9FnbOOXMMcp35m0sRFbcvrUCZmFtb3VudIJIDeC2s6dkAABAZm1ldGhvZHFhY2NvdW50cy5UcmFuc2Zlcg==",
  "AuthProofs": [
    {
      "signature": "u71xOVJhRrUth5rNTAa2HuARYCsGLmvOCRE05fCbaQiSoQhXtKPVP9feoQSXmLVxISCHr/0aNnRLEoifJLMzBQ=="
    }
  ]
}
```

The Oasis CLI will be able to verify a transaction only for the **exact network
and ParaTime combination** since both are used to derive the chain domain
separation context for signing the transaction.

```shell
oasis transaction show testtx2.json --network testnet --paratime sapphire
```

```
Hash: 1558a5d6254a1b216a0885fa16114899e35b27622fd5af7c8b2eee7284dcad2e
Signer(s):
  1. NcPzNW3YU2T+ugNUtUWtoQnRvbOL9dYSaBfbjHLP1pE=
     (signature: u71xOVJhRrUth5rNTAa2HuARYCsGLmvOCRE05fCbaQiSoQhXtKPVP9feoQSXmLVxISCHr/0aNnRLEoifJLMzBQ==)
Content:
  Format: plain
  Method: accounts.Transfer
  Body:
    To: test:bob (oasis1qrydpazemvuwtnp3efm7vmfvg3tde044qg6cxwzx)
    Amount: 1.0 TEST
  Authorized signer(s):
    1. NcPzNW3YU2T+ugNUtUWtoQnRvbOL9dYSaBfbjHLP1pE= (ed25519)
       Nonce: 1
  Fee:
    Amount: 0.0 TEST
    Gas limit: 1
    (gas price: 0.0 TEST per gas unit)

Network:  testnet
ParaTime: sapphire
```

### Sign a Transaction

To sign a [previously unsigned transaction][unsigned] transaction or to append
another signature to the transaction (*multisig*), run
`transaction sign <filename.json>`.

For example, let's transfer `1.0 TEST` from `test:alice` to `test:bob` on
Testnet consensus layer, but don't sign it and store it to
`testtx_unsigned.json`:

```json title="testtx_unsigned.json"
{
  "nonce": 32,
  "fee": {
    "amount": "0",
    "gas": 1265
  },
  "method": "staking.Transfer",
  "body": "omJ0b1UAyND0Wds45cwxynfmbSxEVty+tQJmYW1vdW50RDuaygA="
}
```

Comparing this transaction to [`testtx.json`](#show) which was signed, we can
notice that the transaction is not wrapped inside the `untrusted_raw_value`
envelope with the `signature` field.

Decoding unsigned transaction gives us similar output:

```shell
oasis transaction show testtx_unsigned.json --network testnet
```

```
Method: staking.Transfer
Body:
  To:     oasis1qrydpazemvuwtnp3efm7vmfvg3tde044qg6cxwzx
  Amount: 1.0 TEST
Nonce:  32
Fee:
  Amount: 0.0 TEST
  Gas limit: 1265
  (gas price: 0.0 TEST per gas unit)

Network:  testnet
ParaTime: none (consensus layer)
```

Finally, let's sign the transaction:

```shell
oasis transaction sign testtx_unsigned.json --network testnet --account test:alice
```

```
You are about to sign the following transaction:
Method: staking.Transfer
Body:
  To:     oasis1qrydpazemvuwtnp3efm7vmfvg3tde044qg6cxwzx
  Amount: 1.0 TEST
Nonce:  32
Fee:
  Amount: 0.0 TEST
  Gas limit: 1265
  (gas price: 0.0 TEST per gas unit)

Network:  testnet
ParaTime: none (consensus layer)
Account:  test:alice
(In case you are using a hardware-based signer you may need to confirm on device.)
```

We can also use [`--output-file`][account-output-file] here and store the
signed transaction back to another file instead of showing it.

**Info**:

[Network and Account][npa] selectors are available for the `transaction sign`
command.

[npa]: https://docs.oasis.io/build/tools/cli/account.md#npa

[unsigned]: https://docs.oasis.io/build/tools/cli/account.md#unsigned

### Submit a Transaction

Invoking `transaction submit <filename.json>` will broadcast the consensus or
ParaTime transaction to the selected network or ParaTime. If the transaction
hasn't been signed yet, Oasis CLI will first sign it with the selected account
in your wallet and then broadcast it.

```shell
oasis tx submit testtx.json --network testnet --no-paratime
```

```
Broadcasting transaction...
Transaction executed successfully.
Transaction hash: a81a1dcd203bba01761a55527f2c44251278110a247e63a12f064bf41e07f13a
```

```shell
oasis tx submit testtx2.json --network testnet --paratime sapphire
```

```
Broadcasting transaction...
Transaction included in block successfully.
Round:            946461
Transaction hash: 25f0b2a92b6171969e9cd41d047bc20b4e2307c3a329ddef41af73df69d95b5d
```

[chain domain separation context]: https://docs.oasis.io/core/crypto.md#chain-domain-separation

---

*To find navigation and other pages in this documentation, fetch the llms.txt file at: https://docs.oasis.io/llms.txt*
