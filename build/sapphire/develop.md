# Develop on Sapphire

Source: https://docs.oasis.io/build/sapphire/develop/

As Sapphire is EVM-compatible, you can use the same dev tooling as you would
when building on Ethereum. Additionally, we build tools to support you in
creating secure and confidential dApps.

Feel free to check out the [Concepts] page to get a better understanding of the
transaction flow and the contract state.

[Concepts]: https://docs.oasis.io/build/sapphire/develop/concept.md

## Contract Development

Sapphire is programmable using any language that targets the EVM, such as Solidity,
Fe or Vyper. If you prefer to use an Ethereum framework like Hardhat or Foundry,
you can also use those with Sapphire; all you need to do is set your Web3 gateway URL.
You can find the details of the Oasis Sapphire Web3 endpoints
on the [Network information] page.

[Network information]: https://docs.oasis.io/build/sapphire/network.md#rpc-endpoints

### Features

* [Deployment Patterns](https://docs.oasis.io/build/sapphire/develop/deployment.md)

* [Gasless Transactions](https://docs.oasis.io/build/sapphire/develop/gasless.md)

* [Security](https://docs.oasis.io/build/sapphire/develop/security.md)

* [View-Call Authentication](https://docs.oasis.io/build/sapphire/develop/authentication.md)

[Randomness, Subcalls and More Precompiles][sapphire-contracts] in the contracts API reference

[sapphire-contracts]: https://api.docs.oasis.io/sol/sapphire-contracts

## Frontend Development

To connect your frontend to your smart contracts, see the [Browser] chapter.

[Browser]: https://docs.oasis.io/build/sapphire/develop/browser.md

## Backend Development

If you want to connect and execute transactions from your backend.
Sapphire has three clients in different programming languages:

| Language       | Package                                            | API Reference | GitHub              |
| -------------- | -------------------------------------------------- | ------------- | ------------------- |
| **Javascript** | [@oasisprotocol/sapphire-paratime][sapphire-npmjs] | [API][js-api] | [GitHub][js-github] |
| **Go**         | [@oasisprotocol/sapphire-paratime][go-pkg]         | [API][go-api] | [GitHub][go-github] |
| **Python**     |                                                    | [API][py-api] | [GitHub][py-github] |

[sapphire-npmjs]: https://www.npmjs.com/package/@oasisprotocol/sapphire-paratime

[go-pkg]: https://pkg.go.dev/github.com/oasisprotocol/sapphire-paratime/clients/go

[js-api]: https://api.docs.oasis.io/js/sapphire-paratime

[go-api]: https://pkg.go.dev/github.com/oasisprotocol/sapphire-paratime/clients/go

[py-api]: https://api.docs.oasis.io/py/sapphirepy/

[js-github]: https://github.com/oasisprotocol/sapphire-paratime/tree/main/clients/js/README.md

[go-github]: https://github.com/oasisprotocol/sapphire-paratime/tree/main/clients/go/README.md

[Py-github]: https://github.com/oasisprotocol/sapphire-paratime/tree/main/clients/py/README.md

## Testing

[Test][testing] confidential contracts with Hardhat or Ethers.

[testing]: https://docs.oasis.io/build/sapphire/develop/testing.md

## Examples

See our [Examples] page for demo dApps that bring all the above together.

[examples]: https://docs.oasis.io/build/sapphire/examples.md

## Tools and Services

* [ABI Playground](https://docs.oasis.io/build/tools/abi-playground.md)

* [Localnet](https://docs.oasis.io/build/tools/localnet.md)

* [Remix](https://docs.oasis.io/build/tools/remix.md)

* [Contract Verification](https://docs.oasis.io/build/tools/verification.md)

* [Band Oracle](https://docs.oasis.io/build/tools/band.md)

Should you have any questions or ideas to share, feel free to reach out to us
on [discord and other social media channels][social-media].

[social-media]: https://docs.oasis.io/get-involved.md#social-media-channels

---

*To find navigation and other pages in this documentation, fetch the llms.txt file at: https://docs.oasis.io/llms.txt*
