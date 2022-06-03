// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  docs: [
    'README',
    {
      type: 'category',
      label: 'Oasis Network',
      collapsible: false,
      items: [
        'oasis-network/overview',
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
      ],
    },
    {
      type: 'category',
      label: 'Run a Node',
      collapsible: false,
      items: [
        'run-a-node/node-operator-overview',
        {
          type: 'category',
          label: 'Prerequisites',
          link: {
            type: 'doc',
            id: 'run-a-node/prerequisites/README',
          },
          items: [
              'run-a-node/prerequisites/hardware-recommendations',
              'run-a-node/prerequisites/stake-requirements',
              'run-a-node/prerequisites/oasis-node',
              'run-a-node/prerequisites/system-configuration',
              'run-a-node/prerequisites/set-up-trusted-execution-environment-tee',
          ]
        },
        {
          type: 'category',
          label: 'Set Up Your Node',
          link: {
            type: 'doc',
            id: 'run-a-node/set-up-your-node/README',
          },
          items: [
            'run-a-node/set-up-your-node/run-validator',
            'run-a-node/set-up-your-node/run-non-validator',
            'run-a-node/set-up-your-node/run-seed-node',
            'run-a-node/set-up-your-node/run-a-paratime-node',
            'run-a-node/set-up-your-node/run-a-paratime-client-node',
            'run-a-node/set-up-your-node/run-an-ias-proxy',
            'run-a-node/set-up-your-node/creating-an-entity-package',
            'run-a-node/set-up-your-node/amend-commission-schedule',
            'run-a-node/set-up-your-node/governance',
            'run-a-node/set-up-your-node/sentry-node-architecture',
          ]
        },
        {
          type: 'category',
          label: 'Advanced',
          link: {
            type: 'doc',
            id: 'run-a-node/advanced/README',
          },
          items: [
            'run-a-node/advanced/sync-node-using-state-sync',
            'run-a-node/advanced/copy-state-from-one-node-to-the-other',
            'run-a-node/advanced/install-oasis-remote-signer-binary',
            'run-a-node/advanced/using-ledger-backed-consensus-key-with-a-remote-signer',
          ]
        },
        {
          type: 'category',
          label: 'Node Maintenance',
          link: {
            type: 'doc',
            id: 'run-a-node/maintenance-guides/README',
          },
          items: [
            'run-a-node/maintenance-guides/wiping-node-state',
            'run-a-node/maintenance-guides/handling-network-upgrades',
            'run-a-node/maintenance-guides/adding-or-removing-nodes',
            'run-a-node/maintenance-guides/refreshing-certificates',
            'run-a-node/maintenance-guides/shutting-down-a-node',
          ]
        },
        'run-a-node/troubleshooting',
        'run-a-node/upgrade-log',
      ],
    },
    {
      type: 'category',
      label: 'Manage your Tokens',
      collapsible: false,
      items: [
        'manage-tokens/overview',
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
        'manage-tokens/how-to-transfer-rose-into-emerald-paratime',
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
            type: 'doc',
            id: 'mainnet/previous-upgrades/README',
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
      label: 'Developer Resources',
      collapsible: false,
      items: [
        'developer-resources/overview',
        {
          type: 'category',
          label: 'Emerald ParaTime',
          link: {
            type: 'doc',
            id: 'developer-resources/emerald-paratime/README',
          },
          items: [
            'developer-resources/emerald-paratime/writing-dapps-on-emerald',
            'developer-resources/emerald-paratime/integrating-band-oracle-smart-contract',
          ],
        },
        {
          type: 'link',
          label: 'Oasis Core Documentation',
          href: '/oasis-core'
        },
        {
          type: 'link',
          label: 'Oasis SDK Documentation',
          href: '/oasis-sdk'
        },
        {
          type: 'link',
          label: 'Oasis ADRs',
          href: '/adrs'
        },
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
    {
      type: 'category',
      label: 'Frequently Asked Questions',
      collapsible: false,
      items: [
        'faq/oasis-network-faq',
      ],
    },
  ],
};

module.exports = sidebars;
