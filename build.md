# Build on Oasis

Source: https://docs.oasis.io/build/

The best way to start learning is by example! If you want to jumpstart
right into it, check out our use cases that combine TEE and blockchain to
build trustless distributed apps.

* [Cross-Chain Key Generation (EVM / Base)](https://docs.oasis.io/build/use-cases/key-generation.md)

* [Trustless AI Agent](https://docs.oasis.io/build/use-cases/trustless-agent.md)

* [Private Telegram Chat Bot](https://docs.oasis.io/build/use-cases/tgbot.md)

* [Trustless Price Oracle](https://docs.oasis.io/build/use-cases/price-oracle.md)

## The Oasis SDK

Image: Oasis architectural design including ParaTime and consensus layers

### ROFL-Powered Apps

[Runtime off-chain logic (ROFL)][rofl] enables you to wrap applications in
trusted environment (TEE) containers managed through [Sapphire]. This
framework is ideal for deploying provably trusted oracles, compute-expensive
tasks in AI or a backend for interactive games.

* [Runtime Off-Chain Logic (ROFL)](https://docs.oasis.io/build/rofl.md)

### Smart Contracts

Smart Contracts are deployed to [Sapphire], an EVM-compatible Layer 1
blockchain assuring confidential smart contract state. Extra on-chain
features in your contracts such as the random number generator, cryptography,
a cross-chain [privacy layer](https://docs.oasis.io/build/opl.md) and ROFL verification are
supported.

* [Sapphire ParaTime](https://docs.oasis.io/build/sapphire.md)

[rofl]: https://docs.oasis.io/build/rofl.md

[Sapphire]: https://docs.oasis.io/build/sapphire.md

### Web Browser

Sapphire supports optional encrypted transactions and queries through
client-side end-to-end encryption. Modern Web3 libraries running in a [web
browser] are supported.

[web browser]: https://docs.oasis.io/build/sapphire/develop/browser.md

* [Browser Support](https://docs.oasis.io/build/sapphire/develop/browser.md)

### Server-Side Apps

End-to-end encrypted transactions and queries are often required by server-side
applications running either inside ROFL or outside of the TEE. Check out our
comprehensive [API reference guide] for your preferred programming language to
learn how to integrate with Oasis network.

[API reference guide]: https://api.docs.oasis.io

---

*To find navigation and other pages in this documentation, fetch the llms.txt file at: https://docs.oasis.io/llms.txt*
