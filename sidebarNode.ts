import {SidebarsConfig} from '@docusaurus/plugin-content-docs';

export const sidebarNode: SidebarsConfig = {
  operators: [
    {
      type: 'doc',
      label: 'Overview',
      id: 'node/README',
    },
    {
      type: 'category',
      label: 'Network Information',
      description: 'These are the current parameters for the network.',
      collapsible: false,
      link: {
        type: 'doc',
        id: 'node/network/README',
      },
      items: [
        'node/network/mainnet',
        'node/network/testnet',
      ],
    },
    {
      type: 'category',
      label: 'Run Your Node',
      description:
        'The Oasis Network consists of several types of nodes, each serving distinct roles to maintain the functionality, security, and decentralization of the network.',
      collapsible: false,
      link: {
        type: 'doc',
        id: 'node/run-your-node/README',
      },
      items: [
        {
          type: 'category',
          label: 'Prerequisites',
          link: {
            type: 'generated-index',
            description:
              'This section lists hardware and software prerequisites for running an Oasis node.',
            slug: 'node/run-your-node/prerequisites',
          },
          items: [
            'node/run-your-node/prerequisites/hardware-recommendations',
            'node/run-your-node/prerequisites/cloud-providers',
            'node/run-your-node/prerequisites/stake-requirements',
            'node/run-your-node/prerequisites/oasis-node',
            'node/run-your-node/prerequisites/system-configuration',
            'node/run-your-node/prerequisites/set-up-tee',
          ],
        },
        'node/run-your-node/validator-node',
        'node/run-your-node/non-validator-node',
        'node/run-your-node/seed-node',
        'node/run-your-node/archive-node',
        'node/run-your-node/paratime-node',
        {
          type: 'category',
          label: 'ParaTime Client Node',
          link: {
            type: 'doc',
            id: 'node/run-your-node/paratime-client-node',
          },
          items: ['node/run-your-node/paratime-observer-node'],
        },
        'node/run-your-node/rofl-node',
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
        'node/run-your-node/sentry-node',
        {
          type: 'category',
          label: 'Maintenance',
          link: {
            type: 'generated-index',
            description:
              'This section provides documentation on how to maintain your Oasis node setup over long run.',
            slug: 'node/run-your-node/maintenance',
          },
          items: [
            'node/run-your-node/maintenance/wiping-node-state',
            'node/run-your-node/maintenance/handling-network-upgrades',
            'node/run-your-node/maintenance/adding-or-removing-nodes',
            'node/run-your-node/maintenance/refreshing-certificates',
            'node/run-your-node/maintenance/shutting-down-a-node',
          ],
        },
        {
          type: 'category',
          label: 'Advanced',
          link: {
            type: 'generated-index',
            description:
              'This section provides documentation on advanced usages of the Oasis node.',
            slug: 'node/run-your-node/advanced',
          },
          items: [
            'node/run-your-node/advanced/sync-node-using-state-sync',
            'node/run-your-node/advanced/pruning',
            'node/run-your-node/advanced/copy-state-from-one-node-to-the-other',
            'node/run-your-node/advanced/remote-signer',
          ],
        },
        'node/run-your-node/troubleshooting',
      ],
    },
    {
      type: 'doc',
      label: 'Web3 Gateway',
      id: 'node/web3',
    },
    {
      type: 'doc',
      label: 'gRPC Proxy',
      id: 'node/grpc',
    },
    {
      type: 'category',
      label: 'Reference',
      collapsible: true,
      link: {
        type: 'generated-index',
        description: 'Reference guide for node operators.',
        slug: 'node/reference',
      },
      items: [
        'node/reference/genesis-doc',
        {
          type: 'category',
          label: 'Network Upgrades',
          link: {
            type: 'generated-index',
            description:
              "This section provides information about previous upgrades.",
            slug: 'node/reference/upgrades',
          },
          items: [
            'node/reference/upgrades/damask-upgrade',
            'node/reference/upgrades/cobalt-upgrade',
            'node/reference/upgrades/mainnet-upgrade',
          ],
        },
        {
          type: 'category',
          label: 'Upgrade Logs',
          link: {
            type: 'generated-index',
            description:
              "This section provides upgrade logs.",
            slug: 'node/reference/upgrade-logs',
          },
          items: [
            {
              type: 'doc',
              id: 'node/reference/upgrade-logs/mainnet',
              label: 'Mainnet',
            },
            {
              type: 'doc',
              id: 'node/reference/upgrade-logs/testnet',
              label: 'Testnet',
            },
          ],
        },
      ],
    },
  ],
};
