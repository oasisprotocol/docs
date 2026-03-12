# Runtime Off-Chain Logic (ROFL)

Source: https://docs.oasis.io/build/rofl/

*ROFL-powered apps* are applications running on Oasis nodes inside a *Trusted
Execution Environment (TEE)* that are managed through the Oasis Sapphire
blockchain.

ROFL supports:

* **Docker-like containers** or **single-executable** apps depending on your
  TCB demand and threat model
* **Privacy and integrity** through Intel SGX/TDX including fully auditable
  history of updates
* **Uncensorable** registration, management and deployment of your app on a
  permissionless pool of ROFL nodes **including billing**
* **Built-in Key Management Service** (KMS) for storing your app secrets and
  secure derivation of keys within TEE
* **Integration with Oasis Sapphire** enables EVM-compatible smart contracts to
  verify the ROFL transaction origin

Image: ROFL diagram

ROFL powers private trading and chat bots, provable AI learning, price
oracles, home automation, VPNs and fair gaming!

## Build Your Application for ROFL

Developers can easily wrap their existing apps into a ROFL-powered app!

* [Quickstart](https://docs.oasis.io/build/rofl/quickstart.md)

* [Trustless Price Oracle](https://docs.oasis.io/build/use-cases/price-oracle.md)

* [Private Telegram Chat Bot](https://docs.oasis.io/build/use-cases/tgbot.md)

[Prerequisites]: https://docs.oasis.io/build/rofl/workflow/prerequisites.md

## See also

* [/build/rofl/features/](https://docs.oasis.io/build/rofl/features.md)

* [How to ROFLize an App?](https://docs.oasis.io/build/rofl/workflow.md)

* [Sapphire ParaTime](https://docs.oasis.io/build/sapphire.md)

* [ROFL Node](https://docs.oasis.io/node/run-your-node/rofl-node.md)

[Oasis Runtime SDK]: https://github.com/oasisprotocol/oasis-sdk/tree/main/runtime-sdk

---

*To find navigation and other pages in this documentation, fetch the llms.txt file at: https://docs.oasis.io/llms.txt*
