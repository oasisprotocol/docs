# How to Transfer ETH/ERC20 to Emerald ParaTime

This guide will walk you through bringing your assets, i.e. ETH, USDC, USDT,
from Ethereum, BSC, Polygon or Avalanche networks to the Emerald ParaTime using
the Wormhole token bridge.

## About

[Emerald](/dapp/emerald/) is an Oasis ParaTime providing an Ethereum-compatible blockchain for the Oasis Network. If you want to use any dApp for DEX, NFT and similar built on Emerald, you will have to transfer your assets into the Emerald ParaTime.

To transfer your ROSE tokens into Emerald, follow [How to Transfer ROSE into a ParaTime](how-to-transfer-rose-into-paratime.mdx).

To transfer (i.e. bridge and wrap) your ETH and ERC20 tokens, follow this guide. It will show you how to use [Wormhole Bridge](https://wormholebridge.com) to seamlessly transfer your tokens from Ethereum, Solana, Avalanche, BSC, Terra or Polygon to the Oasis Network.

## Using Wormhole Bridge

### Open Wormhole Bridge and Connect your Account

First, get your assets ready in your MetaMask to be transferred over to Oasis. Then navigate to the [Wormhole Bridge](https://wormholebridge.com)'s website and click on _Transfer Tokens_ to open the [Wormhole Bridge Transfer](https://wormholebridge.com/#/transfer) application.

![Wormhole Bridge](../images/manage-tokens/wormhole/index.png)

**Step 1 (Source)** is to point _Source_ to the network from where you want to transfer your tokens to **Ethereum** and set the _Target_ to **Oasis**. Then click _Connect_ to connect your wallet with the Wormhole Bridge.

![Connect your wallet](../images/manage-tokens/wormhole/connect_wallet.png)

### Transfer Assets to Oasis

Now you can select an asset from all available assets in your wallet, e.g. ETH, to be transferred to Oasis.

![Select the asset to be transferred](../images/manage-tokens/wormhole/select_source_dest_amount.png)

:::caution

Make sure, that you always have enough ETH (or other assets) for paying gas fees, not only to transfer (i.e. bridge) the assets to Oasis, but also to redeem any assets back to Ethereum.

:::

Choose the _Amount_ of tokens you want to transfer and click _Next_. If your MetaMask wallet is switched to some other network, the Wormhole bridge will ask you to switch to the correct network (e.g. Ethereum Mainnet).

You will then proceed to **Step 2 (Target)**. Your MetaMask wallet will show up again and ask you to switch to the Emerald Mainnet network because that is where your ETH will be wrapped to wETH.

The recipient address defaults to the source address on the Ethereum network. You can transfer your ETH into a different destination Ethereum account, by switching the currently opened account in MetaMask. The Wormhole Bridge web app will automatically switch the recipient address accordingly.

Next, confirm the recipient address and the amount of WETH tokens to be transferred (i.e. bridged) and click _Next_.

![Confirm your recipient address](../images/manage-tokens/wormhole/switch_to_emerald.png)

**Step 3 (Send tokens)** is to transfer the tokens to the Wormhole Bridge. MetaMask will ask you to switch back to the Ethereum Mainnet so you will be able to confirm your transaction and commence the transfer. Click _Transfer_.

:::info

If you chose to transfer your ETH into a different destination Ethereum account, you will need to switch the currently opened account in MetaMask back to the same account as used in Step 1.

:::

![Send tokens to Wormhole](../images/manage-tokens/wormhole/send_tokens_to_wormhole.png)

Confirm the Transfer of ETH from Ethereum to wETH on Oasis Emerald by clicking _Confirm_.

![Confirm the transfer ETH->WETH](../images/manage-tokens/wormhole/confirm_transaction_ETH_WETH.png)

:::caution

If you use a Ledger hardware wallet backed Ethereum account, you will need to enable "Blind signing" or "Contract data" in the Ethereum Ledger app's settings to be able to sign the transaction.

:::

You will have to wait for the confirmations on Ethereum before redeeming your new wETH tokens in Oasis Emerald.

![Wait for Ethereum confirmations](../images/manage-tokens/wormhole/send_tokens.png)

Now you are ready to redeem your tokens on the Oasis Emerald. Confirm the wallet approval in your MetaMask.

![Confirm Redeeming your wETH](../images/manage-tokens/wormhole/redeem_tokens.png)

Congratulations! You just bridged your first ETH (your chosen asset) to wETH on Oasis Emerald.

![ETH to wETH bridging completed](../images/manage-tokens/wormhole/redeem_tokens2.png)

:::info

We suggest that you add the new contract address for wETH (your newly wrapped asset) immediately after the transaction is confirmed, so you will see them available in your wallet.

:::

## Using Wrapped Assets on Oasis

Now you can start using that wrapped assets across new Oasis dApps like the first DEX build on Emerald - [YuzuSwap](https://yuzu-swap.com), where you can swap, provide liquidity and farm YUZU rewards.

![Start using wrapped assets on Oasis](../images/manage-tokens/wormhole/yuzuswap.png)

:::info

Make sure that your MetaMask is connected to the Emerald Mainnet chain. You
can find the network parameters [here](../../dapp/emerald/README.mdx#rpc-endpoints).

:::
