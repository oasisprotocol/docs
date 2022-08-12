// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  operators: [
    'README',
    {
      type: 'category',
      label: 'Prerequisites',
      collapsible: false,
      link: {
        type: 'doc',
        id: 'prerequisites/README',
      },
      items: [
        'prerequisites/hardware-recommendations',
        'prerequisites/stake-requirements',
        'prerequisites/oasis-node',
        'prerequisites/system-configuration',
        'prerequisites/set-up-trusted-execution-environment-tee',
      ]
    },
    {
      type: 'category',
      label: 'Set Up Your Node',
      collapsible: false,
      link: {
        type: 'doc',
        id: 'set-up-your-node/README',
      },
      items: [
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
      ]
    },
    {
      type: 'category',
      label: 'Advanced',
      collapsible: false,
      link: {
        type: 'doc',
        id: 'advanced/README',
      },
      items: [
        'advanced/sync-node-using-state-sync',
        'advanced/copy-state-from-one-node-to-the-other',
        'advanced/install-oasis-remote-signer-binary',
        'advanced/using-ledger-backed-consensus-key-with-a-remote-signer',
      ]
    },
    {
      type: 'category',
      label: 'Node Maintenance',
      collapsible: false,
      link: {
        type: 'doc',
        id: 'maintenance-guides/README',
      },
      items: [
        'maintenance-guides/wiping-node-state',
        'maintenance-guides/handling-network-upgrades',
        'maintenance-guides/adding-or-removing-nodes',
        'maintenance-guides/refreshing-certificates',
        'maintenance-guides/shutting-down-a-node',
      ]
    },
    'troubleshooting',
    'upgrade-log',
  ],
};

module.exports = sidebars;
