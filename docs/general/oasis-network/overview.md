---
description: An overview of Oasis Network Architecture and Key Technological Benefits
---

# Overview of the Oasis Network

The Oasis Network is a Layer 1 decentralized blockchain network designed to be uniquely scalable, privacy-first and versatile.

The Network has two main architectural components, the Consensus Layer and the ParaTime Layer.

1. The **Consensus Layer** is a scalable, high-throughput, secure, proof-of-stake consensus run by a decentralized set of validator nodes.
2. The **ParaTime Layer** hosts many parallel runtimes (ParaTimes), each representing a replicated compute environment with shared state.

![Oasis architectural design including ParaTime and Consensus Layers](../images/architecture/technology_scalability.svg)

## Technology Highlights

* **Separates consensus and execution into two layers** — the Consensus Layer and The ParaTime Layer — for better scalability and increased versatility.

* Separation of consensus and execution allows **multiple ParaTimes to process transactions in parallel**, meaning complex workloads processed on one ParaTime won’t slow down faster, simpler transactions on another.

* The ParaTime Layer is entirely decentralized, allowing **anyone to develop and build their own ParaTime**. Each ParaTime can be developed in isolation to meet the needs of a specific application, such as confidential compute, open or closed committees, and more.

* The network’s sophisticated discrepancy detection makes Oasis **more efficient than sharding and parachains** — requiring a smaller replication factor for the same level of security.

* **The network has broad support for confidential computing technology**. The Oasis Eth/WASI Runtime is an open source example of a confidential ParaTime that uses secure enclaves to keep data private while being processed.

## Benefits of the Oasis Network Technology Stack

### Scalability

The Oasis Network’s impressive scalability is achieved through a cutting-edge set of features that provide faster transaction speeds and higher throughput than other networks. The top-tier performance of the network is largely due to its separation of compute and consensus operations into the Consensus Layer and ParaTime Layer. This separation allows multiple ParaTimes to process transactions in parallel, meaning complex workloads processed on one ParaTime won’t slow down faster, simpler transactions on another. Plus, the network’s sophisticated discrepancy detection makes Oasis more efficient than sharding and parachains — requiring a smaller replication factor for the same level of security.

### Privacy-First

The Oasis Network designed the first ever confidential ParaTime with support for confidential smart contracts. In a confidential ParaTime, nodes are required to use a type of secure computing technology called a TEE (Trusted Execution Environment.) TEEs act as a hypothetical black box for smart contract execution in a confidential ParaTime. Encrypted data goes into the black box along with the smart contract, data is decrypted, processed by the smart contract, and then encrypted before it is sent out of the TEE. This process ensures that data remains confidential, and is never leaked to the node operator or application developer

The Oasis Eth/WASI Runtime is an open source example of a confidential ParaTime that uses Intel SGX. Other secure compute technology, such as ZKP, HE, or other secure enclaves, can also be used. In the future we hope to support additional computation techniques such as secure multi-party compute, federated learning and more.

Confidentiality unlocks a range of new use cases on blockchain by allowing personal or sensitive data, such as their social security number, bank statements, health information to be used by apps on the Oasis Network — something incredibly risky on other Layer 1 networks.

### Versatility

Designed to support the next generation of blockchain applications, the Oasis Network is incredibly versatile, agile, and customizable. Namely, each ParaTime can be developed in isolation to meet the needs of a specific application. ParaTimes committees can be made large or small, open or closed, allowing for faster or more secure execution depending on the requirements of a particular use case. Nodes can be required to have specific hardware, such as Secure Enclaves in a confidential ParaTime. Each ParaTime can similarly run different Runtime VMs (ParaTime Engines) such as EVM backwards compatible engine, Rust based smart contract language, or a Data tokenization engine. Finally to support enterprise and developer use cases, ParaTimes can be made Permissioned or Permissionless — allowing consortiums to have their own closed ParaTime, or communities to have full decentralized open ParaTimes.

The versatility of the ParaTime Layer allows the Oasis Network to expand and grow to address a broad set of new and exciting use cases, while still maintaining the same core ledger and consensus layer.
