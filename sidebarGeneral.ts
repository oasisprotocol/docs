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
      description: 'The Oasis Network is a Layer 1 decentralized blockchain network designed to be uniquely scalable, privacy-first and versatile.',
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
      description: 'The native token on Oasis Mainnet is called ROSE. Learn how to manage them.',
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
          description: "There is a number of 3rd party services, tools and wallets out there which support the Oasis network. Some of them are categorized below. Keep in mind that these products were developed by 3rd parties and the Oasis Protocol Foundation cannot be held responsible for any security vulnerabilities or malicious activity.",
          link: {
            type: 'generated-index',
            slug: 'general/manage-tokens/holding-rose-tokens',
          },
          items: [
            'general/manage-tokens/holding-rose-tokens/custody-providers',
            'general/manage-tokens/holding-rose-tokens/ledger-wallet',
          ]
        },
        'general/manage-tokens/how-to-bridge-assets',
        'general/manage-tokens/faq',
      ],
    },
  ],
};
