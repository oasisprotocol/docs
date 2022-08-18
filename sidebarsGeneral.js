// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  general: [
    'README',
    {
      type: 'category',
      label: 'Oasis Network',
      collapsible: false,
      link: {
        type: 'doc',
        id: 'oasis-network/overview',
      },
      items: [
        'oasis-network/network-parameters',
        'oasis-network/genesis-doc',
        {
          type: 'link',
          label: 'Why Oasis?',
          href: '/oasis-network-primer/',
        },
        {
          type: 'link',
          label: 'ROSE Token Metrics',
          href: '/oasis-network-primer/token-metrics-and-distribution/',
        },
        {
          type: 'link',
          label: 'Papers',
          href: 'https://oasisprotocol.org/papers',
        },
        'oasis-network/connect-with-us',
        'oasis-network/faq',
      ],
    },
    {
      type: 'category',
      label: 'Manage your Tokens',
      collapsible: false,
      link: {
        type: 'doc',
        id: 'manage-tokens/overview',
      },
      items: [
        'manage-tokens/terminology',
        'manage-tokens/staking-and-delegating',
        {
          type: 'category',
          label: 'Oasis Wallets',
          link: {
            type: 'doc',
            id: 'manage-tokens/oasis-wallets/README',
          },
          items: [
            'manage-tokens/oasis-wallets/web',
            'manage-tokens/oasis-wallets/browser-extension',
          ]
        },
        {
          type: 'category',
          label: '3rd Party Custody & Wallets',
          link: {
            type: 'doc',
            id: 'manage-tokens/holding-rose-tokens/README',
          },
          items: [
            'manage-tokens/holding-rose-tokens/custody-providers',
            'manage-tokens/holding-rose-tokens/bitpie-wallet',
            'manage-tokens/holding-rose-tokens/ledger-wallet',
          ]
        },
        'manage-tokens/how-to-transfer-rose-into-evm-paratime',
        'manage-tokens/how-to-transfer-eth-erc20-to-emerald-paratime',
        'manage-tokens/faq',
        {
          type: 'category',
          label: 'Advanced',
          link: {
            type: 'doc',
            id: 'manage-tokens/advanced/README',
          },
          items: [
            'manage-tokens/advanced/file-based-signer',
            {
              type: 'category',
              label: 'Oasis CLI Tools',
              link: {
                type: 'doc',
                id: 'manage-tokens/advanced/oasis-cli-tools/README',
              },
              items: [
                'manage-tokens/advanced/oasis-cli-tools/prerequisites',
                'manage-tokens/advanced/oasis-cli-tools/setup',
                'manage-tokens/advanced/oasis-cli-tools/common-staking-info',
                'manage-tokens/advanced/oasis-cli-tools/list-accounts',
                'manage-tokens/advanced/oasis-cli-tools/get-account-info',
                'manage-tokens/advanced/oasis-cli-tools/get-account-nonce',
                'manage-tokens/advanced/oasis-cli-tools/address',
                'manage-tokens/advanced/oasis-cli-tools/transfer-tokens',
                'manage-tokens/advanced/oasis-cli-tools/delegate-tokens',
                'manage-tokens/advanced/oasis-cli-tools/reclaim-tokens',
                'manage-tokens/advanced/oasis-cli-tools/deposit-withdraw-tokens-to-from-paratime',
                'manage-tokens/advanced/oasis-cli-tools/gas-costs',
              ]
            },
          ]
        },
      ],
    },
    {
      type: 'category',
      label: 'Contribute to the Network',
      collapsible: false,
      items: [
        'contribute-to-the-network/run-validator',
        'contribute-to-the-network/run-a-paratime-node',
        'contribute-to-the-network/network-governance',
        'contribute-to-the-network/contribution-guidelines',
      ],
    },
    {
      type: 'category',
      label: 'Mainnet',
      collapsible: false,
      items: [
        'mainnet/damask-upgrade',
        {
          type: 'category',
          label: 'Previous Upgrades',
          link: {
            type: 'generated-index',
              description: "This section provides documentation on previous upgrades of Oasis Network's Mainnet.",
              slug: 'mainnet/previous-upgrades',
          },
          items: [
            'mainnet/previous-upgrades/cobalt-upgrade',
            'mainnet/previous-upgrades/mainnet-upgrade',
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'Oasis Protocol Foundation',
      collapsible: false,
      items: [
        {
          type: 'category',
          label: 'The Testnet',
          link: {
            type: 'doc',
            id: 'foundation/testnet/README',
          },
          items: [
            'foundation/testnet/upgrade-log',
          ],
        },
        'foundation/delegation-policy'
      ],
    },
    {
      type: 'category',
      label: 'Community Resources',
      collapsible: false,
      items: [
        'community-resources/community-hub',
        'community-resources/community-made-resources',
        'community-resources/token-delivery-and-kyc',

      ],
    },
  ],
};

module.exports = sidebars;
