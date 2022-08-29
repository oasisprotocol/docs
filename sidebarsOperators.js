// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  operators: [
    'README',
    {
      type: 'category',
      label: 'Mainnet',
      collapsible: false,
      link: {
        type: 'doc',
        id: 'mainnet/README',
      },
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
        'mainnet/upgrade-log',
      ],
    },
    {
      type: 'category',
      label: 'Testnet',
      collapsible: false,
      link: {
        type: 'doc',
        id: 'testnet/README',
      },
      items: [
        'testnet/upgrade-log',
      ],
    },
    {
      type: 'category',
      label: 'Set Up Your Node',
      collapsible: false,
      link: {
        type: 'generated-index',
        description: "This section provides documentation on how to set up an Oasis Node running on your computer.",
        slug: 'set-up-your-node',
      },
      items: [
        {
          type: 'category',
          label: 'Prerequisites',
          link: {
            type: 'generated-index',
            description: "This sections lists hardware and software prerequisites for running an Oasis node.",
            slug: 'set-up-your-node/prerequisites',
          },
          items: [
            'set-up-your-node/prerequisites/hardware-recommendations',
            'set-up-your-node/prerequisites/stake-requirements',
            'set-up-your-node/prerequisites/oasis-node',
            'set-up-your-node/prerequisites/system-configuration',
            'set-up-your-node/prerequisites/set-up-trusted-execution-environment-tee',
          ]
        },
        'set-up-your-node/run-validator',
        'set-up-your-node/run-non-validator',
        'set-up-your-node/run-seed-node',
        'set-up-your-node/run-archive-node',
        'set-up-your-node/run-a-paratime-node',
        'set-up-your-node/run-a-paratime-client-node',
        'set-up-your-node/run-an-ias-proxy',
        'set-up-your-node/creating-an-entity-package',
        'set-up-your-node/amend-commission-schedule',
        'set-up-your-node/governance',
        'set-up-your-node/sentry-node-architecture',
        {
          type: 'category',
          label: 'Maintenance',
          link: {
            type: 'generated-index',
            description: "This section provides documentation on how to maintain your Oasis node setup over long run.",
            slug: 'set-up-your-node/maintenance',
          },
          items: [
            'set-up-your-node/maintenance/wiping-node-state',
            'set-up-your-node/maintenance/handling-network-upgrades',
            'set-up-your-node/maintenance/adding-or-removing-nodes',
            'set-up-your-node/maintenance/refreshing-certificates',
            'set-up-your-node/maintenance/shutting-down-a-node',
          ]
        },
        {
          type: 'category',
          label: 'Advanced',
          link: {
            type: 'generated-index',
            description: "This section provides documentation on advanced usages of the Oasis node.",
            slug: 'set-up-your-node/advanced',
          },
          items: [
            'set-up-your-node/advanced/sync-node-using-state-sync',
            'set-up-your-node/advanced/copy-state-from-one-node-to-the-other',
            'set-up-your-node/advanced/install-oasis-remote-signer-binary',
            'set-up-your-node/advanced/using-ledger-backed-consensus-key-with-a-remote-signer',
          ]
        },
        'set-up-your-node/troubleshooting',
      ]
    },
  ],
};

module.exports = sidebars;
