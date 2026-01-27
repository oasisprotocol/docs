# Quickstart

Source: https://docs.oasis.io/build/sapphire/quickstart

In this tutorial, you will build and deploy a unique dApp that requires
confidentiality to work. By the end of the tutorial, you should feel
comfortable setting up your EVM development environment to target Sapphire,
and know how and when to use confidentiality.

The expected completion time of this tutorial is 15 minutes.

## Create a Sapphire-Native dApp

Porting an existing EVM app is cool, and will provide benefits such as
protection against MEV.
However, starting from scratch with confidentiality in mind can unlock some
really novel dApps and provide a [higher level of security].

One simple-but-useful dApp that takes advantage of confidentiality is a
[dead person's switch] that reveals a secret (let's say the encryption key to a
data trove) if the operator fails to re-up before too long.
Let's make it happen!

[higher level of security]: https://docs.oasis.io/build/sapphire/develop.md

[dead person's switch]: https://en.wikipedia.org/wiki/Dead_man%27s_switch

### Init a new Hardhat project

We're going to use Hardhat with TypeScript which relies on NodeJS, but Sapphire
should be compatible with your dev environment of choice. See examples in
[Go][Oasis starter project for Go] and
[Python][Oasis starter project for Python] at the end of this chapter. Let us
know if things are not as expected!

[Oasis starter project for Go]: https://github.com/oasisprotocol/demo-starter-go

[Oasis starter project for Python]: https://github.com/oasisprotocol/demo-starter-py

1. Make & enter a new directory:

   ```sh
   mkdir quickstart && cd quickstart
   ```

2. Create a TypeScript project and install the project dependencies:

   ```sh
   npx hardhat@2 init
   ```

3. Add [`@oasisprotocol/sapphire-hardhat`] as dependency:

   **Tab**: npm

   ```shell
   npm install -D @oasisprotocol/sapphire-hardhat
   ```

   **Tab**: pnpm

   ```shell
   pnpm add -D @oasisprotocol/sapphire-hardhat
   ```

   **Tab**: Yarn

   ```shell
   yarn add --dev @oasisprotocol/sapphire-hardhat
   ```

### Add the Sapphire Testnet to Hardhat

Open up your `hardhat.config.ts` and import `sapphire-hardhat`.

```typescript {2}
import { HardhatUserConfig } from "hardhat/config";
import "@oasisprotocol/sapphire-hardhat";
import "@nomicfoundation/hardhat-toolbox";
import "./tasks";

const accounts = process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : {
  mnemonic: "test test test test test test test test test test test junk",
  path: "m/44'/60'/0'/0",
  initialIndex: 0,
  count: 20,
  passphrase: "",
};
```

By importing `@oasisprotocol/sapphire-hardhat`, **any network config entry
corresponding to the Sapphire's chain ID will automatically be wrapped with
Sapphire specifics for encrypting and signing the transactions**.

Next, let's add an account with a private key from an environment variable:

```typescript {6-12}
import { HardhatUserConfig } from "hardhat/config";
import "@oasisprotocol/sapphire-hardhat";
import "@nomicfoundation/hardhat-toolbox";
import "./tasks";

const accounts = process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : {
  mnemonic: "test test test test test test test test test test test junk",
  path: "m/44'/60'/0'/0",
  initialIndex: 0,
  count: 20,
  passphrase: "",
};
```

Finally, let's add the [Sapphire Testnet] network to the network property of
`HardhatUserConfig`:

```typescript {4-19}
const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.24",
    settings: {
      evmVersion: "paris",
    },
  },
  networks: {
    sapphire: {
      url: "https://sapphire.oasis.io",
      chainId: 0x5afe,
      accounts,
    },
    "sapphire-testnet": {
      url: "https://testnet.sapphire.oasis.io",
      accounts,
      chainId: 0x5aff,
    },
    "sapphire-localnet": {
      // docker run -it -p8544-8548:8544-8548 ghcr.io/oasisprotocol/sapphire-localnet
      url: "http://localhost:8545",
      chainId: 0x5afd,
      accounts,
    },
  },
};
```

### Get some Sapphire Testnet tokens

Now for the fun part. As you have configured the Sapphire Test network, get
some native TEST tokens. Hit up the one and only [Oasis Testnet faucet], select
"Sapphire" and enter your wallet address. Submit the form and TEST be on your
way.

[Oasis Testnet faucet]: https://faucet.testnet.oasis.io

[Sapphire Testnet]: https://docs.oasis.io/build/sapphire/network.md

### Get the Contract

This is a Sapphire tutorial and you're already a Solidity expert, so let's not
bore you with explaining the gritty details of the contract.
Start by pasting `Vigil.sol` into `contracts/Vigil.sol`.

1. Create a new file called `Vigil.sol` under `contracts/`:
2. Paste the following contract into it:

&#x20;Vigil.sol contract&#x20;

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract Vigil {
    struct SecretMetadata {
        address creator;
        string name;
        /// @notice How long (in seconds) the secret should remain so past the creator's last update.
        uint256 longevity;
    }

    event SecretCreated(
        address indexed creator,
        string indexed name,
        uint256 index
    );

    SecretMetadata[] public _metas;
    bytes[] private _secrets;
    /// @dev The unix timestamp at which the address was last seen.
    mapping(address => uint256) public _lastSeen;

    function createSecret(
        string calldata name,
        uint256 longevity,
        bytes calldata secret
    ) external {
        _updateLastSeen();
        _metas.push(
            SecretMetadata({
                creator: msg.sender,
                name: name,
                longevity: longevity
            })
        );
        _secrets.push(secret);
        emit SecretCreated(msg.sender, name, _metas.length - 1);
    }

    /// Reveal the secret at the specified index.
    function revealSecret(uint256 index) external view returns (bytes memory) {
        require(index < _metas.length, "no such secret");
        address creator = _metas[index].creator;
        uint256 expiry = _lastSeen[creator] + _metas[index].longevity;
        require(block.timestamp >= expiry, "not expired");
        return _secrets[index];
    }

    /// Return the time (in seconds since the epoch) at which the owner was last seen, or zero if never seen.
    function getLastSeen(address owner) external view returns (uint256) {
        return _lastSeen[owner];
    }

    function getMetas(uint256 offset, uint256 count)
        external
        view
        returns (SecretMetadata[] memory)
    {
        if (offset >= _metas.length) return new SecretMetadata[](0);
        uint256 c = offset + count <= _metas.length
            ? count
            : _metas.length - offset;
        SecretMetadata[] memory metas = new SecretMetadata[](c);
        for (uint256 i = 0; i < c; ++i) {
            metas[i] = _metas[offset + i];
        }
        return metas;
    }

    function refreshSecrets() external {
        _updateLastSeen();
    }

    function _updateLastSeen() internal {
        _lastSeen[msg.sender] = block.timestamp;
    }
}
```

#### Vigil.sol, the interesting parts

The key state variables are:

```solidity
    SecretMetadata[] public _metas;
    bytes[] private _secrets;
```

* `_metas` is marked with `public` visibility, so despite the state itself being
  encrypted and not readable directly, Solidity will generate a getter that will
  do the decryption for you.
* `_secrets` is `private` and therefore truly secret; only the contract can
  access the data contained in this mapping.

And the methods we'll care most about are

* `createSecret`, which adds an entry to both `_metas` and `_secrets`.
* `revealSecret`, which acts as an access-controlled getter for the data
  contained with `_secrets`. Due to trusted execution and confidentiality, the
  only way that the secret will get revealed is if execution proceeds all the
  way to the end of the function and does not revert.

The rest of the methods are useful if you actually intended to use the contract,
but they demonstrate that developing for Sapphire is essentially the same as for
Ethereum. You can even write tests against the Hardhat network and use Hardhat
plugins.

### Add the Tasks

We will use [Hardhat tasks] to automate the deployment and testing of the
Vigil contract.

1. Create a new file called `index.ts` under `tasks/`:
2. Paste the following tasks to the `tasks/index.ts`:

&#x20;tasks/index.ts&#x20;

```typescript
import { task } from "hardhat/config";

task("deploy").setAction(async (_args, hre) => {
  const Vigil = await hre.ethers.getContractFactory("Vigil");
  const vigil = await Vigil.deploy();
  const vigilAddr = await vigil.waitForDeployment();

  console.log(`Vigil address: ${vigilAddr.target}`);
  return vigilAddr.target;
});

task("create-secret")
  .addParam("address", "contract address")
  .setAction(async (args, hre) => {
    const vigil = await hre.ethers.getContractAt("Vigil", args.address);

    const tx = await vigil.createSecret(
      "ingredient",
      30 /* seconds */,
      Buffer.from("brussels sprouts"),
    );
    console.log("Storing a secret in", tx.hash);
  });

task("check-secret")
  .addParam("address", "contract address")
  .setAction(async (args, hre) => {
    const vigil = await hre.ethers.getContractAt("Vigil", args.address);

    try {
      console.log("Checking the secret");
      await vigil.revealSecret(0);
      console.log("Uh oh. The secret was available!");
      process.exit(1);
    } catch (e: any) {
      console.log("failed to fetch secret:", e.message);
    }
    console.log("Waiting...");

    await new Promise((resolve) => setTimeout(resolve, 30_000));
    console.log("Checking the secret again");
    const secret = await vigil.revealSecret.staticCallResult(0); // Get the value.
    console.log(
      "The secret ingredient is",
      Buffer.from(secret[0].slice(2), "hex").toString(),
    );
  });

task("full-vigil").setAction(async (_args, hre) => {
  await hre.run("compile");

  const address = await hre.run("deploy");

  await hre.run("create-secret", { address });
  await hre.run("check-secret", { address });
});
```

3. Import the tasks inside `hardhat.config.ts`:

```typescript {4}
import { HardhatUserConfig } from "hardhat/config";
import "@oasisprotocol/sapphire-hardhat";
import "@nomicfoundation/hardhat-toolbox";
import "./tasks";

const accounts = process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : {
  mnemonic: "test test test test test test test test test test test junk",
  path: "m/44'/60'/0'/0",
  initialIndex: 0,
  count: 20,
  passphrase: "",
};
```

[Hardhat tasks]: https://hardhat.org/hardhat-runner/docs/guides/tasks

### Run the Contract

And to wrap things up, we'll put `Vigil` through its paces.
First, let's see what's actually going on.

After deploying the contract, we can create a secret, check that it's not
readable, wait a bit, and then check that it has become readable.
Pretty cool if you ask me!

Anyway, make it happen by running

```shell
PRIVATE_KEY="0x..." npx hardhat full-vigil --network sapphire-testnet
```

And if you see something like the following, you'll know you're well on the road
to deploying confidential dApps on Sapphire.

```
Vigil deployed to: 0x74dC4879B152FDD1DDe834E9ba187b3e14f462f1
Storing a secret in 0x13125d868f5fb3cbc501466df26055ea063a90014b5ccc8dfd5164dc1dd67543
Checking the secret
failed to fetch secret: reverted: not expired
Waiting...
Checking the secret again
The secret ingredient is brussels sprouts
```

## All done!

Congratulations, you made it through the Sapphire tutorial! If you want to dive
deeper, please check out the [develop] chapter and join the discussion on the
[#dev-central Discord channel][social-media].

Best of luck on your future forays into confidentiality!

**Info**: Example: Hardhat

Visit the Sapphire ParaTime repository to download the [Hardhat][hardhat-example]
example of this quickstart.

**Info**: Example: Starter project

If your project involves building a web frontend, we recommend that you check
out the official [Oasis starter] files.

[Oasis starter]: https://github.com/oasisprotocol/demo-starter

**Info**: Example: Go and Python

Are you building your dApp in languages other than TypeScript? Check out the
official [Oasis starter project for Go] and the [Oasis starter project for Python].

## See also

* [Browser Support](https://docs.oasis.io/build/sapphire/develop/browser.md)

- [ParaTime Client Node](https://docs.oasis.io/node/run-your-node/paratime-client-node.md)

* [Oasis Web3 Gateway for your EVM ParaTime](https://docs.oasis.io/node/web3.md)

[social-media]: https://docs.oasis.io/get-involved.md#social-media-channels

[develop]: https://docs.oasis.io/build/sapphire/develop.md

[hardhat-example]: https://github.com/oasisprotocol/sapphire-paratime/tree/main/examples/hardhat

[`@oasisprotocol/sapphire-hardhat`]: https://www.npmjs.com/package/@oasisprotocol/sapphire-hardhat

---

*To find navigation and other pages in this documentation, fetch the llms.txt file at: https://docs.oasis.io/llms.txt*
