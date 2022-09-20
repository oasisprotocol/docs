# Quickstart

<p style={{width: '100%'}}>
<iframe style={{margin: 'auto', display:'block'}} width="560" height="315" src="https://www.youtube-nocookie.com/embed/ePp1fFSmKgI" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</p>

In this tutorial, you'll port an Eth project in under 10 minutes, and then go on
to deploy a unique dApp that requires confidentiality to work.
By the end of the tutorial, you should feel comfortable setting up your Eth
development environment to target Sapphire, and know how and when to use
confidentiality.

The expected completion time of this tutorial is 30 minutes.

## Port an Eth project

### Setup

Start by installing [Truffle](https://github.com/trufflesuite/truffle#install).

Then, run these commands in your terminal:

```sh
mkdir MetaCoin && cd MetaCoin
truffle unbox MetaCoin
git init
git add :/ && git commit -m "Initial commit"
pnpm init && pnpm add -D @truffle/hdwallet-provider
```

:::tip

This tutorial uses [pnpm](https://pnpm.io/installation), an efficient Node
package manager. You can just as easily use `npm` or `yarn` by replacing
`pnpm` with either of those.

:::

### Deploy to Emerald (non-confidential EVM)

#### Get some Emerald Testnet tokens

In order to deploy to the Emerald Testnet, we'll need some tokens.
Get those by heading to [Oasis Testnet faucet] and selecting "Emerald" as
the first dropdown.
Set the second box to the address of a burner wallet.
It'll take a few moments to receive your tokens after submitting the form.

[Oasis Testnet faucet]: https://faucet.testnet.oasis.dev/

#### Add the Emerald Testnet to Truffle

Apply this patch to `truffle-config.js`:

```diff
diff --git a/truffle-config.js b/truffle-config.js
index 68d534c..15c671d 100644
--- a/truffle-config.js
+++ b/truffle-config.js
@@ -22,7 +22,7 @@
 // const mnemonic = process.env["MNEMONIC"];
 // const infuraProjectId = process.env["INFURA_PROJECT_ID"];

-// const HDWalletProvider = require('@truffle/hdwallet-provider');
+const HDWalletProvider = require('@truffle/hdwallet-provider');

 module.exports = {
   /**
@@ -53,6 +53,14 @@ module.exports = {
     //   network_id: 5,       // Goerli's id
     //   chain_id: 5
     // }
+    // This is Testnet! If you want Mainnet, add a new network config item.
+    emerald: {
+      provider: () =>
+        new HDWalletProvider([process.env.PRIVATE_KEY], "https://testnet.emerald.oasis.dev"),
+      network_id: 0xa515,
+    },
   },

   // Set default mocha options here, use special reporters etc.
```

#### Do the Truffle Thing

You'll want a script to run some methods on the contract.
Pop open your favorite editor and paste in this code:

```typescript
const keccak256 = require("web3").utils.keccak256;

const MetaCoin = artifacts.require("MetaCoin");

async function exerciseContract() {
  const mc = await MetaCoin.deployed();

  const tx = await mc.sendCoin(mc.address, 42);
  console.log(`\nSent some coins in ${tx.tx}.`);
  const t = tx.logs[0].args;
  console.log(`A Transfer(${t[0]}, ${t[0]}, ${t[2].toNumber()}) was emitted.`);

  const storageSlot = await new Promise((resolve, reject) => {
    const getStoragePayload = {
      method: "eth_getStorageAt",
      params: [
        mc.address,
        keccak256(
          "0x" + "00".repeat(12) + mc.address.slice(2) + "00".repeat(32)
        ),
        "latest",
      ],
      jsonrpc: "2.0",
      id: "test",
    };
    mc.contract.currentProvider.send(getStoragePayload, (err, res) => {
      if (err) reject(err);
      else resolve(res.result);
    });
  });
  console.log(`The balance storage slot contains ${storageSlot}.`);

  const balance = await mc.getBalance(mc.address);
  console.log(`The contract now has balance: ${balance.toNumber()}.`);
}

module.exports = async function (callback) {
  try {
    await exerciseContract();
  } catch (e) {
    console.error(e);
  }
  callback();
};
```

Save it to `scripts/exercise.contract.js`.
We'll use it in just a bit.

Next, you can run the following and see the contract being deployed.

```sh
PRIVATE_KEY="0x..." truffle migrate --network emerald
```

Everything should be succeeding so far.

Finally, run this line and observe some output.

```
> PRIVATE_KEY="0x..." truffle exec --network emerald scripts/exercise.contract.js`

Sent some coins in 0xf415ab586ef1c6c61b84b3bd803ae322f375d1d3164aa8ac13c9ae83c698a002
A Transfer(0x56e5F834F88F9f7631E9d6a43254e173478cE06a, 0x56e5F834F88F9f7631E9d6a43254e173478cE06a, 42) was emitted.
The balance storage slot contains 0x2a.
The contract now has balance: 42
```

Great!
That'll be the baseline for our confidential deployment.

### Deploy to Sapphire (confidential EVM)

#### Get some Sapphire Testnet tokens

Now for the fun part.
As for Emerald, we need to configure the Sapphire network and get some tokens.
Hit up the one and only [Oasis Testnet faucet] and this time select "Sapphire".
Submit the form and on your way.

#### Add the Sapphire Testnet to Truffle

And another diff for your applying pleasure:

```diff
diff --git a/truffle-config.js b/truffle-config.js
index 7af2f42..0cd9d36 100644
--- a/truffle-config.js
+++ b/truffle-config.js
@@ -58,6 +58,11 @@ module.exports = {
         new HDWalletProvider([process.env.PRIVATE_KEY], "https://testnet.emerald.oasis.dev"),
       network_id: 0xa515,
     },
+    // This is Testnet! If you want Mainnet, add a new network config item.
+    sapphire: {
+      provider: () =>
+        new HDWalletProvider([process.env.PRIVATE_KEY], "https://testnet.sapphire.oasis.dev"),
+      network_id: 0x5aff,
+    },
   },

   // Set default mocha options here, use special reporters etc.
```

#### Port to Sapphire

Here's where things start to get interesting.
We're going to add confidentiality to this starter project in exactly two lines
of code.

You'll need to grab the Sapphire compatibility library
([@oasisprotocol/sapphire-paratime]), so make that happen by issuing

```sh
pnpm add -D @oasisprotocol/sapphire-paratime # npm also works
```

So far so good.
Next, import it by adding this line to the top of `truffle-config.js`:

```typescript
const sapphire = require('@oasisprotocol/sapphire-paratime');
```

That's the first line of code.
Here's the second:

```diff
diff --git a/truffle-config.js b/truffle-config.js
index 0cd9d36..7db7cf8 100644
--- a/truffle-config.js
+++ b/truffle-config.js
@@ -60,7 +60,7 @@ module.exports = {
     },
     sapphire: {
       provider: () =>
-        new HDWalletProvider([process.env.PRIVATE_KEY], "https://testnet.sapphire.oasis.dev"),
+        sapphire.wrap(new HDWalletProvider([process.env.PRIVATE_KEY], "https://testnet.sapphire.oasis.dev")),
       network_id: 0x5aff,
     },
   },
```

This `wrap` function takes any kind of provider or signer you've got and turn
it into one that works with Sapphire and confidentiality.
For the most part, wrapping your signer/provider is the most you'll need to do
to get your dApp running on Sapphire, but that's not a complete story since an
unmodified contract may leak state through normal operation.

And now for the moment we've all been waiting for:

```
> PRIVATE_KEY="0x..." truffle migrate --network sapphire
> PRIVATE_KEY="0x..." truffle exec --network sapphire scripts/exercise.contract.js

Sent some coins in 0x6dc6774addf4c5c68a9b2c6b5e5634263e734d321f84012ab1b4cbe237fbe7c2.
A Transfer(0x56e5F834F88F9f7631E9d6a43254e173478cE06a, 0x56e5F834F88F9f7631E9d6a43254e173478cE06a, 42) was emitted.
The balance storage slot contains 0x0.
The contract now has balance: 42.
```

So basically nothing changed, which is pretty much what we're going for.
But take a look at that second to last line where it says what's in the storage
slot. Before, it said `0x2a`, but now it says `0x0`.

Clearly the slot does contain data or else the contract balance couldn't have
been returned.
What's happened here is that the Web3 gateway does not have the key used to
decrypt the storage slot, so a default value is returned.

Indeed, the gateway does not even have the key needed to decrypt the _key_ in
the MKVS; it can tell _that_ a storage slot was written, but not which one
(although it can make a very good guess by reading the contract code).

All in all, you can see that confidentiality is in effect, but it's not
something end-users need to think too much about.

[@oasisprotocol/sapphire-paratime]: https://www.npmjs.com/package/@oasisprotocol/sapphire-paratime

## Create a Sapphire-Native dApp

Porting an existing Eth app is cool, and can already provide benefits like
protecting against MEV.
However, starting from scratch with confidentiality in mind can unlock some
really novel dApps and provide a [higher level of security].

One simple-but-useful dApp that takes advantage of confidentiality is a
[dead person's switch] that reveals a secret (let's say the encryption key to a
data trove) if the operator fails to re-up before too long.
Let's make it happen!

[higher level of security]: guide.md#writing-secure-dapps
[dead person's switch]: https://en.wikipedia.org/wiki/Dead_man's_switch

### Init a new Hardhat project

We're going to use Hardhat this time because it's very convenient to use.

1. Make & enter a new directory
2. `npx hardhat` then create a TypeScript project.
3. Install `@nomicfoundation/hardhat-toolbox` and its peer dependencies.

### Add the Sapphire Testnet to Hardhat

Open up your `hardhat.config.ts` and drop in these lines.
They should remind you a lot about what happened with Truffle.

```diff
diff --git a/hardhat.config.ts b/hardhat.config.ts
index 414e974..49c95f9 100644
--- a/hardhat.config.ts
+++ b/hardhat.config.ts
@@ -3,6 +3,15 @@ import "@nomicfoundation/hardhat-toolbox";

 const config: HardhatUserConfig = {
   solidity: "0.8.9",
+  networks: {
+    sapphire: {
+      // This is Testnet! If you want Mainnet, add a new network config item.
+      chainId: 0x5aff,
+      url: "https://testnet.sapphire.oasis.dev",
+      accounts: [
+        process.env.PRIVATE_KEY ?? Buffer.alloc(0, 32).toString("hex"),
+      ],
+    },
+  },
 };

 export default config;
```

### Get the Contract

This is a Sapphire tutorial and you're already a Solidity expert, so let's not
bore you with explaining the gritty details of the contract.
Start by pasting [Vigil.sol] into `contracts/Vigil.sol`.

While you're there, also place [run-vigil.ts] into `scripts/run-vigil.ts`.
We'll need that later.

[Vigil.sol]: https://github.com/oasisprotocol/sapphire-paratime/blob/main/examples/hardhat/contracts/Vigil.sol
[run-vigil.ts]: https://github.com/oasisprotocol/sapphire-paratime/blob/main/examples/hardhat/scripts/run-vigil.ts

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
Ethereum.
You can even write tests against the Hardhat network and use Hardhat plugins.

### Run the Contract

And to wrap things up, we'll put `Vigil` through its paces.
First, let's see what's actually going on.

At the top of the file, we have our favorite import,
[`@oasisprotocol/sapphire-paratime`].
Unlike for Truffle, we have to "manually" wrap the signer since the Hardhat
config only takes a private key. We do that at the top of `main`.

After deploying the contract, we can create a secret, check that it's not
readable, wait a bit, and then check that it has become readable.
Pretty cool if you ask me!

Anyway, make it happen by running

```sh
PRIVATE_KEY="0x..." pnpm hardhat run scripts/run-vigil.ts --network sapphire
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

Congratulations, you made it through the Sapphire tutorial! If you have any
questions, please check out the [guide] and join the discussion on the
[#sapphire-paratime Discord channel][social-media].

Best of luck on your future forays into confidentiality!

[social-media]: ../../get-involved/README.md#social-media-channels
[guide]: guide.md
