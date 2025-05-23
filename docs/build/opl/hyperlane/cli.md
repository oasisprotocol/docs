---
description: Hyperlane CLI for Sapphire
---

# Hyperlane CLI

## Introduction

The [Hyperlane CLI][cli] is the official command-line tool for deploying and managing
Hyperlane infrastructure. It provides a comprehensive set of utilities for:

- **Chain Configuration**: Set up and register new chains with the Hyperlane
network
- **Core Contract Deployment**: Deploy Hyperlane's core contracts (Mailbox, ISM,
etc.) to new chains
- **Warp Route Management**: Configure and deploy token bridges between chains
- **Message Testing**: Send test messages across chains to verify connectivity
- **Registry Management**: Interact with chain metadata and contract addresses

The CLI streamlines the process of connecting new chains to the Hyperlane
network, making cross-chain communication accessible to developers and chain
operators. This modified version includes compatibility fixes for Sapphire's
unique storage requirements.

[cli]: https://docs.hyperlane.xyz/docs/reference/cli

## Installation

Install the Hyperlane CLI globally using npm:

```bash
npm install -g @hyperlane-xyz/cli
```

Alternatively, you can run commands directly without installing globally:

```bash
# Run via NPM's npx command
npx @hyperlane-xyz/cli

# Or via Yarn's dlx command
yarn dlx @hyperlane-xyz/cli
```

## Usage

Once installed, you can run the CLI from anywhere in your terminal:

```bash
hyperlane --help
```

To view available commands and options, use the help flag. Common commands
include:

- `hyperlane relayer` - Start a relayer to facilitate message delivery between
chains.
For more information visited the our [Relayer page][relayer]
- `hyperlane send message` - Send test messages across chains

[relayer]: ./relayer.md

## Hyperlane Core Deployment

For guidance on how to deploy the Hyperlane Core on Sapphire, refer to the
[official deploy documentation][hyperlane-deploy].

[hyperlane-deploy]: https://docs.hyperlane.xyz/docs/deploy-hyperlane
