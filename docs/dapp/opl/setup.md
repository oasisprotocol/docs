# Setup

Let's get started and make our new project. You will need [Node.js](https://nodejs.org/en/download)
version [18](https://nodejs.org/en/blog/announcements/v18-release-announce).

We will be using a monorepo for both the frontend and backend of our dApp.

```shell
mkdir opl-secret-ballot;
mkdir opl-secret-ballot/backend;
mkdir opl-secret-ballot/frontend;
```

Our smart contracts will live inside a Hardhat project under
`opl-secret-ballot/backend`, and our VueJS app will be in the
`opl-secret-ballot/frontend`.

## Workspace

We suggest using [`pnpm`](https://pnpm.io/motivation), and creating a workspace
file `opl-secret-ballot/pnpm-workspace.yaml` with the following content:

```yaml
packages: [frontend, backend]
```

## Hardhat

Let's create a new Hardhat project.

:::info

Currently we are compatible with Hardhat up to `2.19`. You may need to
specify the version of Hardhat to install.

:::

```shell
cd opl-secret-ballot/backend && npx hardhat init
```

When initializing the Hardhat application, we would like to use the `backend`
directory as the project root.

```shell
Hardhat project root: · /Users/oasis/opl-secret-ballot/backend
```

We would like to set `@oasisprotocol/secret-ballot-backend` as the package name
inside `package.json` at `version` of `1.0.0`.

Finally, we need to install the following dependencies:
- `@oasisprotocol/sapphire-contracts` contains the OPL Solidity smart contracts.
- `@oasisprotocol/sapphire-hardhat` integrates Sapphire using the Hardhat
config file.
- `@openzeppelin/contracts` contains standardized DAO contracts which we will
use to build the secret ballot application.

```shell npm2yarn
npm install -D @openzeppelin/contracts @oasisprotocol/sapphire-contracts @oasisprotocol/sapphire-hardhat
```

You should be able to start your localhost Hardhat node.
