---
description: Additional Sapphire precompiles for encryption and confidentiality
---

# Precompiles

In addition to the standard EVM precompiles, Sapphire provides a number
of further cryptography-related ones to make some operations easier and
cheaper to perform: x25519 key derivation, Deoxys-II-based encryption
and decryption, signing key generation, message digest signing and
verification.

These can be called in the same way as other precompiles by dispatching
calls to specific well-known contract addresses, as described below.

Input parameters should be packed into a contiguous memory region with
each chunk of data padded to 32 bytes as usual. The recommended way to
construct parameter byte sequences in Solidity is with `abi.encode` and
`abi.decode`, which will transparently handle things like putting
`bytes` lengths in the correct position.

## Library

While it is possible to call the precompiles directly using Yul or, for
example, `abi.encode` and `abi.decode` in Solidity, we recommend always
using the `contracts/Sapphire.sol` wrapper library for a more comfortable
experience. The examples below are written against it. The library is provided
by the `@oasisprotocol/sapphire-contracts` npm package.

```shell
yarn add -D @oasisprotocol/sapphire-contracts
```

Then, you can use the wrapper library inside your `.sol` contract file as
follows:

```solidity
pragma solidity ^0.8.13;

import "@oasisprotocol/sapphire-contracts/contracts/Sapphire.sol";

contract Test {
    constructor() {}
    function test() public view returns (bytes32) {
        return Sapphire.deriveSymmetricKey("public key as bytes32", "private key as bytes32");
    }
}
```

Feel free to discover other convenient libraries for Solidity inside the
`contracts/` folder of the
[Oasis Sapphire repository](https://github.com/oasisprotocol/sapphire-paratime)!

## Generating Pseudo-Random Bytes

### Overview

* Precompile address: `0x0100000000000000000000000000000000000001`
* Parameters: `uint num_bytes, bytes pers`
* Gas cost: 10,000 minimum plus 240 per output word plus 60 per word of
  the personalization string.

Generate `num_bytes` pseudo-random bytes, with an optional
personalization string added into the hashing algorithm to increase
domain separation when needed.

```solidity
bytes memory randomPad = Sapphire.randomBytes(64, "");
```

## X25519 Key Derivation

### Overview

* Precompile address: `0x0100000000000000000000000000000000000002`
* Parameters: `bytes32 public_key, bytes32 private_key`
* Gas cost: 100,000

### Example

```solidity
bytes32 publicKey = ... ;
bytes32 privateKey = ... ;
bytes32 symmetric = Sapphire.deriveSymmetricKey(publicKey, privateKey);
```

## Deoxys-II Encryption

### Overview

* Encryption precompile address: `0x0100000000000000000000000000000000000003`
* Decryption precompile address: `0x0100000000000000000000000000000000000004`
* Parameters: `bytes32 key, bytes32 nonce, bytes text_or_ciphertext, bytes additional_data`
* Gas cost: 50,000 minimum plus 100 per word of input

### Example

```solidity
bytes32 key = ... ;
bytes32 nonce = ... ;
bytes memory text = "plain text";
bytes memory ad = "additional data";
bytes memory encrypted = Sapphire.encrypt(key, nonce, text, ad);
bytes memory decrypted = Sapphire.decrypt(key, nonce, encrypted, ad);
```

## Public/Private Signing Key Pair Generation

### Overview

* Precompile address: `0x0100000000000000000000000000000000000005`
* Parameters: `uint method, bytes seed`
* Return value: `bytes public_key, bytes private_key`
* Gas cost: method-dependent base cost, see below

The available methods are items in the `Sapphire.SigningAlg` enum. Note,
however, that the generation method ignores subvariants, so all three
ed25519-based are equivalent, and all secp256k1-based methods are
equivalent. `Sr25519` is not available and will return an error.

Costs:
* `0` (`Ed25519Oasis`), `1` (`Ed25519Pure`), `2` (`Ed25519PrehashedSha512`) - ed25519: cost 35,000,
* `3` (`Secp256k1Oasis`), `4` (`Secp256k1PrehashedKeccak256`), `5` (`Secp256k1PrehashedSha256`) - secp256k1: cost 110,000.

### Example

Using the Sapphire library:

```solidity
bytes memory seed = hex"0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef";
bytes memory publicKey;
bytes memory privateKey;
(publicKey, privateKey) = Sapphire.generateSigningKeyPair(Sapphire.SigningAlg.Ed25519Pure, seed);
```

## Message Signing

### Overview

* Precompile address: `0x0100000000000000000000000000000000000006`
* Parameters: `uint method, bytes private_key, bytes context_or_digest, bytes message`
* Gas cost: see below for the method-dependent base cost, plus 8 per word of context and message except digest.

The `context_or_digest` and `messages` parameters change in meaning
slightly depending on the method requested. For methods that take a
context value in addition to the message, pass the context in the
`context_or_digest` parameter and use `message` as expected. For methods
that take a pre-existing hash of the message, pass that in
`context_or_digest` and leave `message` empty.

Ensure that the digest matches the selected method when using variants
that take a pre-existing hashes.

Available methods:
* `0` (`Ed25519Oasis`): takes a context, gas cost 75,000,
* `1` (`Ed25519Pure`): pass empty context, gas cost 75,000,
* `2` (`Ed25519PrehashedSha512`):, takes a pre-existing hash, gas cost 75,000,
* `3` (`Secp256k1Oasis`): takes a context, gas cost 150,000,
* `4` (`Secp256k1PrehashedKeccak256`): takes a pre-existing hash, gas cost 150,000,
* `5` (`Secp256k1PrehashedSha256`): takes a pre-existing hash, gas cost 150,000.

### Example

Using the Sapphire library:

```solidity
bytes memory publicKey = ...;
bytes memory privateKey = ...;
bytes memory signature = Sapphire.signMessageWithContext(0, privateKey, "message context", "message to sign");
```

## Signature Verification

### Overview

* Precompile address: `0x0100000000000000000000000000000000000007`
* Parameters: `uint method, bytes public_key, bytes context_or_digest, bytes message, bytes signature`
* Gas cost: see below for the method-dependent base cost, plus 8 per word of context and message.

The `context_or_digest` and `messages` parameters change in meaning
slightly depending on the method requested. For methods that take a
context value in addition to the message, pass the context in the
`context_or_digest` parameter and use `message` as expected. For methods
that take a pre-existing hash of the message, pass that in
`context_or_digest` and leave `message` empty.

Ensure that the digest matches the selected method when using variants
that take a pre-existing hashes.

Available methods:
* `0` (`Ed25519Oasis`): takes a context, gas cost 110,000,
* `1` (`Ed25519Pure`): pass empty context, gas cost 110,000,
* `2` (`Ed25519PrehashedSha512`):, takes a pre-existing hash, gas cost 110,000,
* `3` (`Secp256k1Oasis`): takes a context, gas cost 210,000,
* `4` (`Secp256k1PrehashedKeccak256`): takes a pre-existing hash, gas cost 210,000,
* `5` (`Secp256k1PrehashedSha256`): takes a pre-existing hash, gas cost 210,000.

### Example

Using the Sapphire library:

```solidity
bytes memory publicKey = ...;
bytes memory privateKey = ...;
bytes memory signature = ...;
bool result = Sapphire.verifySignatureWithContext(Sapphire.SigningAlg.Ed25519Oasis, publicKey, signature, "message context", "message to check");
```
