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

You should be able to start your localhost Hardhat node.

```sh
cd backend
npx hardhat node
```

We will later run a similar command to compile our smart contracts.

```sh
npx hardhat compile
```
