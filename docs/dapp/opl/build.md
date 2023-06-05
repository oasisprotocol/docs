# Build

Now that we have written our two smart contracts, let's compile and deploy them!

### Compiling

Compile both the host and enclave smart contracts by invoking:

```sh
npx hardhat compile
```

### Deploying

We can make deployments easier by using [Hardhat deploy](https://github.com/wighawag/hardhat-deploy).

```sh
npm install -D hardhat-deploy
```


Add the following configuration changes to your `hardhat.config.ts`:

```diff
diff --git a/backend/hardhat.config.ts b/backend/hardhat.config.ts
index cd8df42..0875e8e 100644
--- a/backend/hardhat.config.ts
+++ b/backend/hardhat.config.ts
@@ -1,8 +1,70 @@
-import { HardhatUserConfig } from "hardhat/config";
+import '@oasisprotocol/sapphire-hardhat';
 import "@nomicfoundation/hardhat-toolbox";
+import { HardhatUserConfig, task } from 'hardhat/config';
+
+const accounts = process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [];
+
+task('deploy-ballot-box')
+  .addParam('hostNetwork')
+  .setAction(async (args, hre) => {
+    await hre.run('compile');
+    const ethers = hre.ethers;
+    const BallotBoxV1 = await ethers.getContractFactory('BallotBoxV1');
+    const signer = ethers.provider.getSigner();
+    const signerAddr = await signer.getAddress();
+
+    // Start by predicting the address of the DAO contract.
+    const hostConfig = hre.config.networks[args.hostNetwork];
+    if (!('url' in hostConfig)) throw new Error(`${args.hostNetwork} not configured`);
+    const provider = new ethers.providers.JsonRpcProvider(hostConfig.url);
+    let nonce = await provider.getTransactionCount(signerAddr);
+    if (args.hostNetwork === 'local') nonce++;
+    const daoAddr = ethers.utils.getContractAddress({ from: signerAddr, nonce });
+
+    const ballotBox = await BallotBoxV1.deploy(daoAddr);
+    await ballotBox.deployed();
+    console.log('expected DAO', daoAddr);
+    console.log('BallotBox', ballotBox.address);
+    return ballotBox.address;
+  });
+
+task('deploy-dao')
+  .addParam('ballotBoxAddr')
+  .setAction(async (args, hre) => {
+    await hre.run('compile');
+    const DAOV1 = await hre.ethers.getContractFactory('DAOV1');
+    const dao = await DAOV1.deploy(args.ballotBoxAddr);
+    await dao.deployed();
+    console.log('DAO', dao.address);
+    return dao;
+  });
+
+task('deploy-local').setAction(async (_args, hre) => {
+    await hre.run('compile');
+    const ballotBox = await hre.run('deploy-ballot-box', { hostNetwork: 'local' });
+    await hre.run('deploy-dao', { ballotBoxAddr: ballotBox });
+  });
 
 const config: HardhatUserConfig = {
   solidity: "0.8.18",
+  networks: {
+    hardhat: {
+      chainId: 1337, // @see https://hardhat.org/metamask-issue.html
+    },
+    local: {
+      url: 'http://127.0.0.1:8545',
+    },
+    bsc_testnet: {
+      url: 'https://data-seed-prebsc-1-s1.binance.org:8545',
+      chainId: 97,
+      accounts,
+    },
+    sapphire_testnet: {
+      url: 'https://testnet.sapphire.oasis.dev',
+      chainId: 0x5aff,
+      accounts,
+    },
+  }
 };
 
 export default config;
```

#### Localhost

We can start local Hardhat node again:

```sh
npx hardhat node
```

Our deploy should succeed locally.

```sh
npx hardhat deploy-local --network localhost
Nothing to compile
No need to generate any newer typings.
Nothing to compile
No need to generate any newer typings.
expected DAO 0xa513E6E4b8f2a923D98304ec87F64353C4D5C853
BallotBox 0x0165878A594ca255338adfa4d48449f69242Eb8F
Nothing to compile
No need to generate any newer typings.
DAO 0xa513E6E4b8f2a923D98304ec87F64353C4D5C853
```

We will use these addresses in our frontend application.

#### Testnet

We can likewise deploy to OPL [Testnet](../../dapp/sapphire/guide#testnet-and-mainnet) with Sapphire.

In this case, we should prepare a wallet with Testnet tokens on both BNB Smart
Chain [Faucet](https://testnet.bnbchain.org/faucet-smart) and Sapphire [faucet](https://faucet.testnet.oasis.dev).

We will use a common private key for both the host and enclave smart contracts.

```sh
export PRIVATE_KEY=
```

Deploy with the testnet parameters.

```sh
npx hardhat deploy-ballot-box --network sapphire_testnet --host-network bsc_testnet
Nothing to compile
No need to generate any newer typings.
expected DAO 0xFBcb580DD6D64fbF7caF57FB0439502412324179
BallotBox 0xFb40591a8df155da291A4B52E4Df9901a95b7C06
```

Then, use the ballot box address below.

```sh
npx hardhat deploy-dao --network bsc-testnet --ballot-box-addr {BALLOT_BOX_ADDR}
```
