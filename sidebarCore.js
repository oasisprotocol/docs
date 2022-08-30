// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  oasisCore: [
    {
      type: 'doc',
      label: 'Introduction to Oasis Core',
      id: 'core/README',
    },
    {
      type: 'category',
      label: 'Development Setup',
      collapsible: false,
      link: {
        type: 'doc',
        id: 'core/development-setup/README',
      },
      items: [
        'core/development-setup/prerequisites',
        'core/development-setup/building',
        'core/development-setup/running-tests',
        'core/development-setup/oasis-net-runner',
        'core/development-setup/single-validator-node-network',
        'core/development-setup/deploying-a-runtime',
      ],
    },
    {
      type: 'category',
      label: 'High-Level Components',
      collapsible: false,
      items: [
        {
          type: 'category',
          label: 'Consensus Layer',
          link: {
            type: 'doc',
            id: 'core/consensus/README',
          },
          items: [
            'core/consensus/transactions',
            {
              type: 'category',
              label: 'Services',
              link: {
                type: 'generated-index',
                title: 'Services',
                slug: 'core/consensus/services',
              },
              items: [
                'core/consensus/services/epochtime',
                'core/consensus/services/beacon',
                'core/consensus/services/staking',
                'core/consensus/services/registry',
                'core/consensus/services/scheduler',
                'core/consensus/services/governance',
                'core/consensus/services/roothash',
                'core/consensus/services/keymanager',
              ],
            },
            'core/consensus/genesis',
            'core/consensus/test-vectors',
          ],
        },
        {
          type: 'category',
          label: 'Runtime Layer',
          link: {
            type: 'doc',
            id: 'core/runtime/README',
          },
          items: [
            'core/runtime/runtime-host-protocol',
            'core/runtime/identifiers',
            'core/runtime/messages',
          ],
        },
        {
          type: 'category',
          label: 'Oasis Node',
          items: [
            'core/oasis-node/rpc',
            'core/oasis-node/metrics',
            {
              type: 'doc',
              id: 'core/oasis-node/cli',
              label: 'oasis-node CLI'
            }
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'Common Functionality',
      collapsible: false,
      items: [
        'core/encoding',
        'core/crypto',
        {
          type: 'category',
          label: 'Protocols',
          items: [
            'core/authenticated-grpc',
          ],
        },
        'core/mkvs',
      ],
    },
    {
      type: 'category',
      label: 'Processes',
      collapsible: false,
      items: [
        'core/release-process',
        'core/versioning',
        {
          type: 'doc',
          id: 'core/SECURITY',
          label: 'Security',
        },
      ],
    },
    {
      type: 'link',
      label: 'Oasis Core Ledger',
      href: '/oasis-core-ledger'
    },
    {
      type: 'link',
      label: 'ADRs',
      href: '/adrs'
    },
  ],
};

module.exports = sidebars;
