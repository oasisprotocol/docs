import {SidebarsConfig} from '@docusaurus/plugin-content-docs';

export const sidebarCore: SidebarsConfig = {
  oasisCore: [
    {
      type: 'doc',
      label: 'Overview',
      id: 'core/README',
    },
    {
      type: 'category',
      label: 'Development Setup',
      collapsible: false,
      link: {
        type: 'generated-index',
        description: 'This section provides information on how to compile and configure complete Oasis Network stack locally in order for you to start exploring and contributing to the Oasis Core.',
        slug: 'core/development-setup',
      },
      items: [
        {
          type: 'category',
          label: 'Build Environment Setup and Building',
          link: {
            type: 'generated-index',
            slug: 'core/development-setup/build-environment-setup-and-building',
          },
          items: [
            'core/development-setup/prerequisites',
            'core/development-setup/building',
          ],
        },
        {
          type: 'category',
          label: 'Running Tests and Development Networks',
          link: {
            type: 'generated-index',
            slug: 'core/development-setup/running-tests-and-development-networks',
          },
          items: [
            'core/development-setup/running-tests',
            'core/development-setup/oasis-net-runner',
            'core/development-setup/single-validator-node-network',
            'core/development-setup/deploying-a-runtime',
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'High-Level Components',
      collapsible: false,
      link: {
        type: 'generated-index',
        slug: 'core/high-level-components',
      },
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
          link: {
            type: 'generated-index',
            slug: 'core/oasis-node',
          },
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
      link: {
        type: 'generated-index',
        slug: 'core/common-functionality',
      },
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
      link: {
        type: 'generated-index',
        slug: 'core/processes',
      },
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
      label: 'ADRs',
      href: '/adrs'
    },
    {
      type: 'link',
      label: 'Core Client TypeScript API',
      href: 'https://api.docs.oasis.io/js/client',
    },
    {
      type: 'link',
      label: 'Core Client Go API',
      href: 'https://pkg.go.dev/github.com/oasisprotocol/oasis-core/go',
    },
  ],
};
