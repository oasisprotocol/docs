---
description: Considerations for creating dapps on Sapphire
---

# Creating dapps for Sapphire

This page mainly describes the differences between Sapphire and Ethereum
since there are a number of excellent tutorials on developing for Ethereum.
If you don't know where to begin, the [Hardhat tutorial], [Solidity docs], and
[Emerald dapp tutorial] are great places to start. You can continue following
this guide once you've set up your development environment and have deployed
your contract to a non-confidential EVM network (e.g., Ropsten, Emerald).


[Hardhat tutorial]: https://hardhat.org/tutorial
[Solidity docs]: https://docs.soliditylang.org/en/v0.8.15/solidity-by-example.html
[Emerald dapp tutorial]: ../emerald-paratime/writing-dapps-on-emerald.md

## Oasis Consensus Layer and Sapphire ParaTime

The Oasis Network consists of the consensus layer and a number of ParaTimes.
ParaTimes are independent replicated state machines that settle transactions
using the consensus layer (to learn more, check the [Oasis Network Overview]
[overview chapter]). Sapphire is a ParaTime which implements the Ethereum
Virtual Machine (EVM).

The minimum and also expected block time in Sapphire is **6 seconds**. Any
Sapphire transaction will require at least this amount of time to be executed,
and probably no more.

ParaTimes, Sapphire included, are not allowed to directly access your tokens stored
in consensus layer accounts. You will need to _deposit_ tokens from your consensus
account to Sapphire. Consult the [How to transfer ROSE into an EVM ParaTime]
[how-to-deposit-rose] chapter to learn more.


[overview chapter]: ../../general/oasis-network/README.mdx
[how-to-deposit-rose]: ../../general/manage-tokens/how-to-transfer-rose-into-evm-paratime.mdx
[Testnet faucet]: https://faucet.testnet.oasis.dev/

## Testnet and Mainnet

The Sapphire ParaTime is currently deployed on Testnet, with Mainnet deployment planned for later in 2022.
The Testnet should be considered unstable software and may have its state wiped at any
time. As the name implies, only use the Testnet for testing unless you're testing how angry
your users get when state is wiped.

:::danger Never deploy production services on Testnet

Because Testnet state can be wiped in the future, you should **never** deploy a
production service on the Testnet! Just don't do it!

:::

:::tip

For testing purposes, visit our [Testnet faucet] to obtain some TEST which you
can then use on the Sapphire Testnet to pay for gas fees. The faucet supports
sending TEST both to your consensus layer address or to your address inside the
ParaTime.

:::

[network-parameters]: ../../operators/mainnet/README.md
[Testnet]: ../../operators/testnet/README.md

## Sapphire vs Ethereum

The Sapphire ParaTime is generally compatible with Ethereum, the EVM, and all of the
user and developer tooling that you already use. There are a few breaking changes,
but we think that you'll like them:

* Contract state is only visible to the contract that wrote it. With respect
  to the contract API, it's as if all state variables are declared as `private`, but
  with the further restriction that not even full nodes can read the values. Public or
  access-controlled values are provided instead through explicit getters.
* Transactions and calls are end-to-end encrypted into the contract. Only the caller
  and the contract can see the data sent to/received from the ParaTime. This ends up
  defeating most of the utility of block explorers, however.
* The `from` address using of calls is derived from a signature attached to the call.
  Unsigned calls have their sender set to the zero address. This allows contract authors
  to write getters that release secrets to authenticated callers, but without
  requiring a transaction to be posted on-chain.

In addition to confidentiality, you get a few extra benefits including the ability to generate private
entropy, and make signatures on-chain. An example of a dapp that uses both is a HSM contract
that generates an Ethereum wallet and signs transactions sent to it via transactions.

Otherwise Sapphire is like Emerald, which is like a fast, cheap Ethereum.

## Integrating Sapphire

Once ROSE tokens are [deposited into Sapphire], it should be painless for users to begin
using dapps. To achieve this ideal user experience, we have to modify the dapp a little,
but it's made simple by our compatibility library, (coming soon).

There are compatibility layers in other languages, which may be found in [the repo].


[deposited into Sapphire]: ../../general/manage-tokens/how-to-transfer-rose-into-evm-paratime.mdx
[the repo]: https://github.com/oasisprotocol/sapphire-paratime/tree/main/clients

## Writing Secure dapps

### Wallets

Sapphire is compatible with popular self-custodial wallets including MetaMask,
Ledger, Brave, and so forth. You can also use libraries like Web3.js and Ethers
to create programmatic wallets. In general, if it generates secp256k1 signatures,
it'll work just fine.

### Languages & Frameworks

Sapphire is programmable using any language that targets the EVM, such as Solidity
and Vyper. If you prefer to use an Ethereum framework like Hardhat or Truffle, you
can also use those with Sapphire; all you need to do is set your Web3 gateway URL.
You can find the details of the Oasis Sapphire Web3 gateway
[here](/developers/sapphire-paratime#web3-gateway).


### Transactions & Calls

Transactions and calls must be encrypted and signed for maximum security. You can
use the (coming soon) JS package to make your life easy. It'll
handle cryptography and signing for you.

You should be aware that taking actions based on the value of private data may
leak the private data through side channels like time spent and gas use. If you
need to branch on private data, you should in most cases ensure that both
branches exhibit similar time/gas and storage patterns.

Another thing to keep in mind is that `msg.sender` will be zeroed for calls that are
not signed. If you want to use `msg.sender` for access control, the call must be
signed. If you want to avoid signature popups in the user's wallet, just set the
`from` address to all zeros. The JS library will do this for you.

### Contract State

The Sapphire state model is like Ethereum's except for all state being encrypted
and not accessible to anyone except the contract. The contract, executing in an
active (attested) Oasis compute node is the only entity that can request its
state encryption key from the Oasis key manager. Both the keys and values of the
items stored in state are encrypted, but the size of either is *not* hidden. You
app may need to pad state items to a constant length, or use other obfuscation.
Observers may also be able to infer computation based on storage access patterns,
so you might need to obfuscate that, too.

Contract state may be made available to third parties through logs/events, or
explicit getters.

### Contract Logs

Contract logs/events (e.g., those emitted by the Solidity `emit` keyword)
are exactly like Ethereum. Data contained in events is *not* encrypted.
Precompiled contracts are available to help you encrypt data that you can
then pack into an event, however.

:::danger Unmodified contracts may leak state through logs

Base contracts like those provided by OpenZeppelin often emit logs containing
private information. If you don't know they're doing that, you might undermine
the confidentiality of your state. As a concrete example, the ERC-20 spec
requires implementers to emit an `event Transfer(from, to, amount)`, which is
obviously problematic if you're writing a confidential token. What you can
do instead is fork that contract and remove the offending emissions.

:::


### Precompiles

Sapphire provides a few extra precompiled contracts that you may find useful.
:::note

Some of these may not be available for use initially, but all are coming soon.

:::

* `0x010000000000000000000000000000000000000000`  
  `randomBytes(uint256 numWords) returns (bytes)`  
  Generates cryptographically secure bytes. Reverts if there is not enough entropy.
* `0x010000000000000000000000000000000000000001`  
  `k256Sign(bytes32 key, bytes32 dataHash) returns (bytes32 r, bytes32 s, bytes32 v)`  
  Signs the provided data hash using the provided secp256k1 private key.
* `0x010000000000000000000000000000000000000002`  
  `deoxysii256Encrypt(bytes32 key, bytes data) returns (bytes)`  
  Encrypts the provided data using Deoxys-II with provided (random uniform) key
  returning `nonce || ciphertext || tag`.
