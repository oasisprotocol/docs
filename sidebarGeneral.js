// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  general: [
    {
      type: 'doc',
      label: 'Overview',
      id: 'general/README',
    },
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
            'general/manage-tokens/holding-rose-tokens/ledger-wallet',
          ]
        },
        'general/manage-tokens/how-to-transfer-rose-into-paratime',
        'general/manage-tokens/how-to-transfer-eth-erc20-to-emerald-paratime',
        {
          type: 'category',
          label: 'Oasis CLI',
          link: {
            type: 'doc',
            id: 'general/manage-tokens/cli/README',
          },
          items: [
            'general/manage-tokens/cli/setup',
            'general/manage-tokens/cli/network',
            'general/manage-tokens/cli/paratime',
            'general/manage-tokens/cli/wallet',
            'general/manage-tokens/cli/account',
            'general/manage-tokens/cli/transaction',
            'general/manage-tokens/cli/addressbook',
          ]
        },
        'general/manage-tokens/faq',
      ],
    },
  ],
};

module.exports = sidebars;
