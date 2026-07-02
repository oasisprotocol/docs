# Relayer

Source: https://docs.oasis.io/build/opl/hyperlane/relayer

[Relayers][relayer] are off-chain agents that transport messages between chains.

[relayer]: https://docs.hyperlane.xyz/docs/protocol/agents/relayer

## Run a Relayer

The easiest way to run a relayer is with the **[Hyperlane CLI]**.

[Hyperlane CLI]: https://docs.hyperlane.xyz/docs/reference/developer-tools/cli

1. Export your private key to be used with the CLI

   ```shell
   export HYP_KEY='<YOUR_PRIVATE_KEY>'
   ```
2. Start a relayer which watches `Arbitrum Sepolia` & `SapphireTestnet`

   ```shell
   hyperlane relayer --chains sapphiretestnet,arbitrumsepolia
   ```

**Info**: Chain Configs

`Sapphire Testnet` is registered in the *Hyperlane Registry*, if you deploy
the *Hyperlane Core* on `Sapphire Testnet` yourself, make sure you have
*Hyperlane* config files similar to the ones below in
`$HOME/.hyperlane/chains/sapphiretestnet`.

&#x20;metadata.yaml&#x20;

```yaml
# yaml-language-server: $schema=../schema.json
blockExplorers:
  - apiUrl: https://nexus.oasis.io/v1/
    family: other
    name: Oasis Explorer
    url: https://explorer.oasis.io/testnet/sapphire
chainId: 23295
displayName: Sapphire Testnet
domainId: 23295
isTestnet: true
name: sapphiretestnet
nativeToken:
  decimals: 18
  name: TEST
  symbol: TEST
protocol: ethereum
rpcUrls:
  - http: https://testnet.sapphire.oasis.io
technicalStack: other
```

&#x20;addresses.yaml&#x20;

```yaml
domainRoutingIsmFactory: "0x3497967f8E5041f486eC559E6B760d8f051A034C"
interchainAccountIsm: "0xD84DE931A0EDA06Af3944a4e9933c24f3B56DCaC"
interchainAccountRouter: "0xFdca43771912CE5F5B4D869B0c05df0b6eF8aEFc"
mailbox: "0x79d3ECb26619B968A68CE9337DfE016aeA471435"
proxyAdmin: "0x5Ed8004e3352df333901b0B2E98Bd98C3B4AA59A"
staticAggregationHookFactory: "0x212c232Ee07E187CF9b4497A30A3a4D034aAC4D6"
staticAggregationIsmFactory: "0xE25A539AdCa1Aac56549997f2bB88272c5D9498c"
staticMerkleRootMultisigIsmFactory: "0x9851EC4C62943E9974370E87E93CE552abE7705E"
staticMerkleRootWeightedMultisigIsmFactory: "0x688dE6d0aBcb60a711f149c274014c865446b49D"
staticMessageIdMultisigIsmFactory: "0xFE0937b1369Bbba59211c4119B91984FF450ccf1"
staticMessageIdWeightedMultisigIsmFactory: "0x1de05675c8cd512A30c17Ea0a3491d74eF290994"
testRecipient: "0x7bf548104F8f500C563Aa6DC7FbF3b1ad93E4E03"
validatorAnnounce: "0xB119f96a106919489b6495128f30e7088e55B05c"
```

**Tip**: Agents

For a more complex validator and relayer setup, check Hyperlane's **[Local Agents guide]**
or the more production ready **[Agent Operators guide]**.

[Local Agents guide]: https://docs.hyperlane.xyz/docs/guides/deploy-hyperlane-local-agents

[Agent Operators guide]: https://docs.hyperlane.xyz/docs/operate/overview-agents

---

*To find navigation and other pages in this documentation, fetch the llms.txt file at: https://docs.oasis.io/llms.txt*
