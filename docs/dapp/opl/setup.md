# Setup

Let's get started and make our new project. You will need [Node.js](https://nodejs.org/en/download)
18.

We will be using a monorepo for both the frontend and backend of our dApp.

```sh
mkdir opl-secret-ballot;
mkdir opl-secret-ballot/backend;
mkdir opl-secret-ballot/frontend;
```

Our smart contracts will live inside a Hardhat project under
`opl-secret-ballot/backend`, and our VueJS app will be in the
`opl-secret-ballot/frontend`.

## Hardhat

Let's create a new Hardhat project.

```sh
cd opl-secret-ballot/backend && npx hardhat
```

When initializing the Hardhat application, we would like to use the `backend`
directory as the project root.

```sh
Hardhat project root: · /Users/oasis/opl-secret-ballot/backend
```

Finally, we need to install the following dependencies:
- `@oasisprotocol/sapphire-contracts` contains the OPL Solidity smart contracts.
- `@oasisprotocol/sapphire-hardhat` integrates Sapphire using the Hardhat
config file.
- `@openzeppelin/contracts` contains standardized DAO contracts which we will
use to build the secret ballot application.

```sh
npm install -D @openzeppelin/contracts @oasisprotocol/sapphire-contracts @oasisprotocol/sapphire-hardhat
```

You should be able to start your localhost Hardhat node.
