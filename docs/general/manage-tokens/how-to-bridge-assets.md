# How to Bridge Assets to Oasis Sapphire

This guide shows how to **bridge assets (ETH, USDC, USDT, etc.)** from networks
like Ethereum, BNB Chain, or Polygon to **Oasis Sapphire** - an EVM-compatible
ParaTime with confidential smart contracts.

**Main Bridge:** [**Celer cBridge**][cbridge] - a decentralized, non-custodial
bridge supporting fast transfers from multiple networks.

This guide covers:

- Bridging assets via cBridge
- Transferring ROSE to Sapphire
- Important warnings and FAQs

**Prerequisites:**

- Web3 wallet (e.g. MetaMask) with Oasis Sapphire network added
- Gas fees on source chain (ETH, BNB, etc.)

:::info
Need some **ROSE** on Sapphire for gas fees to use your bridged tokens?
See the [Get ROSE][get-rose] chapter.
:::

:::tip Are you a developer?
Celer cBridge uses Celer Inter-Chain Messaging (IM) protocol to communicate
between the chains. You can learn how build cross-chain dApps on Oasis using
OPL and Celer IM [here](../../build/opl/celer/README.md).
:::

## Using Celer cBridge to Bridge Assets to Sapphire

**Supported assets:** ETH, USDC, USDT, WBTC, BNB, MATIC, OCEAN, wROSE  
**Supported networks:** Ethereum, Polygon, BNB Chain

1.  **Open cBridge and Connect Wallet:** Go to the cBridge web app at
    [**cbridge.celer.network**][cbridge]. Connect your wallet (MetaMask or
    another Web3 wallet) to cBridge. Make sure your wallet is set to the
    **source network** from which you want to bridge. For example, if bridging
    from Ethereum Mainnet, switch to Ethereum in MetaMask; if from BNB Smart
    Chain, switch to BNB Chain, etc.

    ![Celer Bridge](../images/manage-tokens/celer-bridge.png)

2.  **Select Source and Destination Chains:** In the cBridge interface, use the
    drop-down menus to select your **"From" chain and "To" chain**. For example,
    choose **Ethereum** as the source and **Oasis Sapphire** as the destination
    to bridge from Ethereum to Sapphire.

3.  **Choose the Asset to Bridge:** Next, select the token you want to
    transfer. The available token list will update based on the selected
    chains. For instance:

    *   If bridging from Ethereum, you might choose **ETH** or a stablecoin
        like **USDC**. Bridging ETH will result in **WETH on Sapphire**
        (wrapped Ether on Oasis) , and bridging USDC will result in USDC on
        Sapphire (address given by cBridge).

    *   If bridging from BNB Chain to Sapphire, you can select **wROSE** (the
        wrapped ROSE token on BNB Chain).

4.  **Enter Amount and Transfer:** Enter the amount you wish to bridge. The
    interface may display the estimated receive amount after fees. Click
    **Transfer**. For ERC-20 assets, your wallet will first
    ask you to **approve** the cBridge contract to spend that token (e.g.
    approve USDC). Approve the token, then confirm the **bridging transaction**
    in your wallet. This will send the tokens to cBridge on the source chain.

5.  **Confirm and Wait:** After confirming, cBridge will handle the cross-chain
    transfer. The bridging typically completes **within a few minutes**, but
    times vary by chain. You can monitor the transfer status on the cBridge
    interface.

6.  **Receive Tokens on Sapphire:** Tokens arrive at your Sapphire address.
    You may need to add the token contract address in MetaMask to see them.
    See [Contract Addresses][token-addresses] for official token addresses.

:::info
cBridge is **non-custodial** - tokens are sent automatically after
confirmation. Always use the **official URL** and verify **Oasis Sapphire** as
destination.
:::

## Get ROSE to Sapphire (From Exchanges or Oasis Wallet)

You need ROSE on Sapphire for gas fees. For information how to get ROSE, see
our [Get ROSE section][get-rose]

## After Bridging – Using Your Assets on Sapphire

Your bridged tokens are now on Sapphire. To see them in MetaMask, add the
token contract address from our [Contract Addresses][token-addresses] page.

## Warnings and Best Practices

*   **Use Official Links:** Only use official [cBridge][cbridge] URL - beware
    of phishing sites.

*   **Gas Fees:** Need native tokens on source chain + ROSE on Sapphire.
    Without ROSE on Sapphire, you cannot use your bridged tokens.

*   **Transaction Time:** Transfers take a few minutes. Check cBridge status
    if delayed beyond 10-15 minutes.

*   **Hardware Wallets:** Enable "Blind Signing" or "Contract Data" in
    Ledger's Ethereum app for bridge transactions.

*   **Test First:** Do a small test transfer before large amounts.

*   **Fees:** cBridge charges small fees. Check minimum/maximum limits
    in the interface.

*   **Security:** Always bridge to your own wallet first, not directly
    to dApp contracts.

*   **Token Versions:** Verify dApps support your bridged token version.

*   **Mistakes:** Contact bridge support immediately if sent to wrong
    network. Always verify **Oasis Sapphire (chain ID 23294)**.

## FAQs

Check the Bridging section in our [Frequently Asked Questions][faq]

---

For support, join our [community channels][social-media].

[token-addresses]: https://github.com/oasisprotocol/sapphire-paratime/blob/main/docs/addresses.md
[social-media]: ../../get-involved/README.md#social-media-channels
[cbridge]: https://cbridge.celer.network/
[get-rose]: ./README.mdx#get-rose
[faq]: faq.mdx#bridging-and-transferring-assets
