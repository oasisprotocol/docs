import {SidebarsConfig} from '@docusaurus/plugin-content-docs';

export const sidebarGeneral: SidebarsConfig = {
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
        'general/oasis-network/token-metrics-and-distribution',
        'general/oasis-network/papers',
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
          label: 'ROSE Wallet',
          link: {
            type: 'generated-index',
            description: "The Oasis team developed two wallets specialized for the Oasis Network transactions. You can learn how to use them below.",
            slug: 'general/manage-tokens/oasis-wallets',
          },
          items: [
            {
              type: 'doc',
              label: 'Web',
              id: 'general/manage-tokens/oasis-wallets/web'
            },
            {
              type: 'doc',
              label: 'Browser Extension',
              id: 'general/manage-tokens/oasis-wallets/browser-extension'
            }
          ]
        },
        {
          type: 'category',
          label: '3rd Party Wallets and Services',
          link: {
            type: 'generated-index',
            description: "There is a number of 3rd party services, tools and wallets out there which support the Oasis network. Some of them are categorized below. Keep in mind that these products were developed by 3rd parties and the Oasis Protocol Foundation cannot be held responsible for any security vulnerabilities or malicious activity.",
            slug: 'general/manage-tokens/holding-rose-tokens',
          },
          items: [
            'general/manage-tokens/holding-rose-tokens/custody-providers',
            'general/manage-tokens/holding-rose-tokens/ledger-wallet',
          ]
        },
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
            'general/manage-tokens/cli/rofl',
          ]
        },
        'general/manage-tokens/faq',
      ],
    },
  ],
};
