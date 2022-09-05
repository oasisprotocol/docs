// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  general: [
    'general/README',
    {
      type: 'category',
      label: 'Oasis Network',
      collapsible: false,
      link: {
        type: 'doc',
        id: 'general/oasis-network/README',
      },
      items: [
        'general/oasis-network/why-oasis',
        'general/oasis-network/token-metrics-and-distribution',
        {
          type: 'link',
          label: 'Papers',
          href: 'https://oasisprotocol.org/papers',
        },
        'general/oasis-network/connect-with-us',
        'general/oasis-network/faq',
      ],
    },
    {
      type: 'category',
      label: 'Manage your Tokens',
      collapsible: false,
      link: {
        type: 'doc',
        id: 'general/manage-tokens/README',
      },
      items: [
        'general/manage-tokens/terminology',
        'general/manage-tokens/staking-and-delegating',
        {
          type: 'category',
          label: 'Oasis Wallets',
          link: {
            type: 'doc',
            id: 'general/manage-tokens/oasis-wallets/README',
          },
          items: [
            'general/manage-tokens/oasis-wallets/web',
            'general/manage-tokens/oasis-wallets/browser-extension',
          ]
        },
        {
          type: 'category',
          label: '3rd Party Custody & Wallets',
          link: {
            type: 'generated-index',
            description: "This document provides an overview of 3rd party custody and wallet solutions supported by the Oasis Network for managing ROSE tokens.",
            slug: 'general/manage-tokens/holding-rose-tokens',
          },
          items: [
            'general/manage-tokens/holding-rose-tokens/custody-providers',
            'general/manage-tokens/holding-rose-tokens/bitpie-wallet',
            'general/manage-tokens/holding-rose-tokens/ledger-wallet',
          ]
        },
        'general/manage-tokens/how-to-transfer-rose-into-paratime',
        'general/manage-tokens/how-to-transfer-eth-erc20-to-emerald-paratime',
        'general/manage-tokens/faq',
        {
          type: 'category',
          label: 'Advanced',
          link: {
            type: 'doc',
            id: 'general/manage-tokens/advanced/README',
          },
          items: [
            'general/manage-tokens/advanced/file-based-signer',
            {
              type: 'category',
              label: 'Oasis CLI Tools',
              link: {
                type: 'doc',
                id: 'general/manage-tokens/advanced/oasis-cli-tools/README',
              },
              items: [
                'general/manage-tokens/advanced/oasis-cli-tools/prerequisites',
                'general/manage-tokens/advanced/oasis-cli-tools/setup',
                'general/manage-tokens/advanced/oasis-cli-tools/common-staking-info',
                'general/manage-tokens/advanced/oasis-cli-tools/list-accounts',
                'general/manage-tokens/advanced/oasis-cli-tools/get-account-info',
                'general/manage-tokens/advanced/oasis-cli-tools/get-account-nonce',
                'general/manage-tokens/advanced/oasis-cli-tools/address',
                'general/manage-tokens/advanced/oasis-cli-tools/transfer-tokens',
                'general/manage-tokens/advanced/oasis-cli-tools/delegate-tokens',
                'general/manage-tokens/advanced/oasis-cli-tools/reclaim-tokens',
                'general/manage-tokens/advanced/oasis-cli-tools/deposit-withdraw-tokens-to-from-paratime',
                'general/manage-tokens/advanced/oasis-cli-tools/gas-costs',
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
        'general/contribute-to-the-network/run-validator',
        'general/contribute-to-the-network/run-a-paratime-node',
        'general/contribute-to-the-network/network-governance',
        'general/contribute-to-the-network/contribution-guidelines',
        'general/contribute-to-the-network/delegation-policy'
      ],
    },
    {
      type: 'category',
      label: 'Community Resources',
      collapsible: false,
      items: [
        'general/community-resources/community-hub',
        'general/community-resources/community-made-resources',
        'general/community-resources/token-delivery-and-kyc',
      ],
    },
  ],
};

module.exports = sidebars;
