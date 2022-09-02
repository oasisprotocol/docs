// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  operators: [
    'operators/README',
    {
      type: 'category',
      label: 'Mainnet',
      collapsible: false,
      link: {
        type: 'doc',
        id: 'operators/mainnet/README',
      },
      items: [
        'operators/mainnet/damask-upgrade',
        {
          type: 'category',
          label: 'Previous Upgrades',
          link: {
            type: 'generated-index',
            description: "This section provides documentation on previous upgrades of Oasis Network's Mainnet.",
            slug: 'operators/mainnet/previous-upgrades',
          },
          items: [
            'operators/mainnet/previous-upgrades/cobalt-upgrade',
            'operators/mainnet/previous-upgrades/mainnet-upgrade',
          ],
        },
        'operators/mainnet/upgrade-log',
      ],
    },
    {
      type: 'category',
      label: 'Testnet',
      collapsible: false,
      link: {
        type: 'doc',
        id: 'operators/testnet/README',
      },
      items: [
        'operators/testnet/upgrade-log',
      ],
    },
    {
      type: 'category',
      label: 'Run Your Node',
      collapsible: false,
      link: {
        type: 'generated-index',
        description: "This section provides documentation on how to set up an Oasis Node running on your computer.",
        slug: 'operators/run-your-node',
      },
      items: [
        'operators/run-your-node/genesis-doc',
        {
          type: 'category',
          label: 'Prerequisites',
          link: {
            type: 'generated-index',
            description: "This sections lists hardware and software prerequisites for running an Oasis node.",
            slug: 'operators/run-your-node/prerequisites',
          },
          items: [
            'operators/run-your-node/prerequisites/hardware-recommendations',
            'operators/run-your-node/prerequisites/stake-requirements',
            'operators/run-your-node/prerequisites/oasis-node',
            'operators/run-your-node/prerequisites/system-configuration',
            'operators/run-your-node/prerequisites/set-up-trusted-execution-environment-tee',
          ]
        },
        {
          type: 'category',
          label: 'Validator Node',
          link: {
            type: 'doc',
            id: 'operators/run-your-node/validator-node/README',
          },
          items: [
            'operators/run-your-node/validator-node/governance',
            'operators/run-your-node/validator-node/amend-commission-schedule',
          ],
        },
        'operators/run-your-node/non-validator-node',
        'operators/run-your-node/seed-node',
        'operators/run-your-node/archive-node',
        'operators/run-your-node/paratime-node',
        'operators/run-your-node/paratime-client-node',
        'operators/run-your-node/ias-proxy',
        'operators/run-your-node/sentry-node',
        {
          type: 'category',
          label: 'Maintenance',
          link: {
            type: 'generated-index',
            description: "This section provides documentation on how to maintain your Oasis node setup over long run.",
            slug: 'operators/run-your-node/maintenance',
          },
          items: [
            'operators/run-your-node/maintenance/wiping-node-state',
            'operators/run-your-node/maintenance/handling-network-upgrades',
            'operators/run-your-node/maintenance/adding-or-removing-nodes',
            'operators/run-your-node/maintenance/refreshing-certificates',
            'operators/run-your-node/maintenance/shutting-down-a-node',
          ]
        },
        {
          type: 'category',
          label: 'Advanced',
          link: {
            type: 'generated-index',
            description: "This section provides documentation on advanced usages of the Oasis node.",
            slug: 'operators/run-your-node/advanced',
          },
          items: [
            'operators/run-your-node/advanced/sync-node-using-state-sync',
            'operators/run-your-node/advanced/copy-state-from-one-node-to-the-other',
            'operators/run-your-node/advanced/install-oasis-remote-signer-binary',
            'operators/run-your-node/advanced/using-ledger-backed-consensus-key-with-a-remote-signer',
          ]
        },
        'operators/run-your-node/troubleshooting',
      ]
    },
  ],
};

module.exports = sidebars;
