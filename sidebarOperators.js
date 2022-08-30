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
      label: 'Set Up Your Node',
      collapsible: false,
      link: {
        type: 'generated-index',
        description: "This section provides documentation on how to set up an Oasis Node running on your computer.",
        slug: 'operators/set-up-your-node',
      },
      items: [
        {
          type: 'category',
          label: 'Prerequisites',
          link: {
            type: 'generated-index',
            description: "This sections lists hardware and software prerequisites for running an Oasis node.",
            slug: 'operators/set-up-your-node/prerequisites',
          },
          items: [
            'operators/set-up-your-node/prerequisites/hardware-recommendations',
            'operators/set-up-your-node/prerequisites/stake-requirements',
            'operators/set-up-your-node/prerequisites/oasis-node',
            'operators/set-up-your-node/prerequisites/system-configuration',
            'operators/set-up-your-node/prerequisites/set-up-trusted-execution-environment-tee',
          ]
        },
        'operators/set-up-your-node/run-validator',
        'operators/set-up-your-node/run-non-validator',
        'operators/set-up-your-node/run-seed-node',
        'operators/set-up-your-node/run-archive-node',
        'operators/set-up-your-node/run-a-paratime-node',
        'operators/set-up-your-node/run-a-paratime-client-node',
        'operators/set-up-your-node/run-an-ias-proxy',
        'operators/set-up-your-node/creating-an-entity-package',
        'operators/set-up-your-node/amend-commission-schedule',
        'operators/set-up-your-node/governance',
        'operators/set-up-your-node/sentry-node-architecture',
        {
          type: 'category',
          label: 'Maintenance',
          link: {
            type: 'generated-index',
            description: "This section provides documentation on how to maintain your Oasis node setup over long run.",
            slug: 'operators/set-up-your-node/maintenance',
          },
          items: [
            'operators/set-up-your-node/maintenance/wiping-node-state',
            'operators/set-up-your-node/maintenance/handling-network-upgrades',
            'operators/set-up-your-node/maintenance/adding-or-removing-nodes',
            'operators/set-up-your-node/maintenance/refreshing-certificates',
            'operators/set-up-your-node/maintenance/shutting-down-a-node',
          ]
        },
        {
          type: 'category',
          label: 'Advanced',
          link: {
            type: 'generated-index',
            description: "This section provides documentation on advanced usages of the Oasis node.",
            slug: 'operators/set-up-your-node/advanced',
          },
          items: [
            'operators/set-up-your-node/advanced/sync-node-using-state-sync',
            'operators/set-up-your-node/advanced/copy-state-from-one-node-to-the-other',
            'operators/set-up-your-node/advanced/install-oasis-remote-signer-binary',
            'operators/set-up-your-node/advanced/using-ledger-backed-consensus-key-with-a-remote-signer',
          ]
        },
        'operators/set-up-your-node/troubleshooting',
      ]
    },
  ],
};

module.exports = sidebars;
