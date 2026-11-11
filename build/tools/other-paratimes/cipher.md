# Cipher ParaTime

Source: https://docs.oasis.io/build/tools/other-paratimes/cipher/

Cipher is a confidential ParaTime for executing Wasm smart contracts.

As an officially supported ParaTime by the Oasis Protocol Foundation, Cipher
allows for:

* Flexibility: developer can define which data to store in a public
  and which data in the (more expensive) confidential storage
* Security: the [Rust language] primarily used for writing Wasm smart contracts
  is known for its strict memory management and was developed specifically to
  avoid memory leaks
* Scalability: increased throughput of transactions
* Low-cost: 99%+ lower fees than Ethereum
* 6 second finality (1 block)
* Cross-chain bridge to enable cross-chain interoperability (upcoming)

If you're looking for EVM-compatible ParaTimes, check out the
[Emerald](https://docs.oasis.io/build/tools/other-paratimes/emerald.md) and the confidential
[Sapphire](https://docs.oasis.io/build/sapphire.md) paratimes.

[Rust language]: https://www.rust-lang.org/

## Network Information

See crucial network information [here][network].

[network]: https://docs.oasis.io/build/tools/other-paratimes/cipher/network.md

## Smart Contract Development

Cipher implements the [Oasis Contract SDK] API. To learn how to write a
confidential smart contract in Rust and deploy it on Cipher, read the related
Oasis Contract SDK chapters:

* [Prerequisites](https://docs.oasis.io/build/tools/other-paratimes/cipher/prerequisites.md)

- [Hello World](https://docs.oasis.io/build/tools/other-paratimes/cipher/hello-world.md)

* [Confidential Hello World](https://docs.oasis.io/build/tools/other-paratimes/cipher/confidential-smart-contract.md)

## See also

* [Manage your Tokens](https://docs.oasis.io/general/manage-tokens.md)

* [ParaTime Node](https://docs.oasis.io/node/run-your-node/paratime-node.md)

* [ParaTime Client Node](https://docs.oasis.io/node/run-your-node/paratime-client-node.md)

* [Emerald ParaTime](https://docs.oasis.io/build/tools/other-paratimes/emerald.md)

* [Sapphire ParaTime](https://docs.oasis.io/build/sapphire.md)

[Oasis Contract SDK]: https://github.com/oasisprotocol/oasis-sdk/tree/main/contract-sdk

---

*To find navigation and other pages in this documentation, fetch the llms.txt file at: https://docs.oasis.io/llms.txt*
