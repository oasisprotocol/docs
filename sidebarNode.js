// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  operators: [
    {
      type: 'doc',
      label: 'Overview',
      id: 'node/README',
    },
    {
      type: 'category',
      label: 'Mainnet',
      collapsible: false,
      link: {
        type: 'doc',
        id: 'node/mainnet/README',
      },
      items: [
        'node/mainnet/damask-upgrade',
        {
          type: 'category',
          label: 'Previous Upgrades',
          link: {
            type: 'generated-index',
            description: "This section provides documentation on previous upgrades of Oasis Network's Mainnet.",
            slug: 'node/mainnet/previous-upgrades',
          },
          items: [
            'node/mainnet/previous-upgrades/cobalt-upgrade',
            'node/mainnet/previous-upgrades/mainnet-upgrade',
          ],
        },
        'node/mainnet/upgrade-log',
      ],
    },
    {
      type: 'category',
      label: 'Testnet',
      collapsible: false,
      link: {
        type: 'doc',
        id: 'node/testnet/README',
      },
      items: [
        'node/testnet/upgrade-log',
      ],
    },
    'node/genesis-doc',
    {
      type: 'category',
      label: 'Run Your Node',
      collapsible: false,
      link: {
        type: 'generated-index',
        description: "This section provides documentation on how to set up an Oasis Node running on your computer.",
        slug: 'node/run-your-node',
      },
      items: [
        {
          type: 'category',
          label: 'Prerequisites',
          link: {
            type: 'generated-index',
            description: "This sections lists hardware and software prerequisites for running an Oasis node.",
            slug: 'node/run-your-node/prerequisites',
          },
          items: [
            'node/run-your-node/prerequisites/hardware-recommendations',
            'node/run-your-node/prerequisites/stake-requirements',
            'node/run-your-node/prerequisites/oasis-node',
            'node/run-your-node/prerequisites/system-configuration',
            'node/run-your-node/prerequisites/set-up-trusted-execution-environment-tee',
          ]
        },
        {
          type: 'category',
          label: 'Validator Node',
          link: {
            type: 'doc',
            id: 'node/run-your-node/validator-node/README',
          },
          items: [
            'node/run-your-node/validator-node/governance',
            'node/run-your-node/validator-node/amend-commission-schedule',
          ],
        },
        'node/run-your-node/non-validator-node',
        'node/run-your-node/seed-node',
        'node/run-your-node/archive-node',
        'node/run-your-node/paratime-node',
        'node/run-your-node/paratime-client-node',
        {
          type: 'category',
          label: 'Key Manager Node',
          link: {
            type: 'doc',
            id: 'node/run-your-node/keymanager-node/README',
          },
          items: [
            'node/run-your-node/keymanager-node/signing-key-manager-policy',
            'node/run-your-node/keymanager-node/key-manager-upgrade',
          ],
        },
        'node/run-your-node/ias-proxy',
        'node/run-your-node/sentry-node',
        {
          type: 'category',
          label: 'Maintenance',
          link: {
            type: 'generated-index',
            description: "This section provides documentation on how to maintain your Oasis node setup over long run.",
            slug: 'node/run-your-node/maintenance',
          },
          items: [
            'node/run-your-node/maintenance/wiping-node-state',
            'node/run-your-node/maintenance/handling-network-upgrades',
            'node/run-your-node/maintenance/adding-or-removing-nodes',
            'node/run-your-node/maintenance/refreshing-certificates',
            'node/run-your-node/maintenance/shutting-down-a-node',
          ]
        },
        {
          type: 'category',
          label: 'Advanced',
          link: {
            type: 'generated-index',
            description: "This section provides documentation on advanced usages of the Oasis node.",
            slug: 'node/run-your-node/advanced',
          },
          items: [
            'node/run-your-node/advanced/sync-node-using-state-sync',
            'node/run-your-node/advanced/copy-state-from-one-node-to-the-other',
            'node/run-your-node/advanced/install-oasis-remote-signer-binary',
            'node/run-your-node/advanced/using-ledger-backed-consensus-key-with-a-remote-signer',
          ]
        },
        'node/run-your-node/troubleshooting',
      ]
    },
    {
      type: 'doc',
      label: 'Web3 Gateway',
      id: 'node/web3',
    },
  ],
};

module.exports = sidebars;
