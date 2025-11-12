import {SidebarsConfig} from '@docusaurus/plugin-content-docs';

export const sidebarBuild: SidebarsConfig = {
  developers: [
    {
      type: 'doc',
      label: 'Overview',
      id: 'build/README',
    },
    {
      type: 'category',
      label: 'Use cases',
      description: 'Task-oriented how-to guides for building apps on Oasis',
      collapsed: false,
      link: {
        type: 'generated-index',
        slug: '/build/use-cases',
      },
      items: [
        'build/use-cases/key-generation',
        'build/use-cases/trustless-agent',
        'build/use-cases/price-oracle',
        'build/use-cases/tgbot',
      ]
    },
    {
      type: 'category',
      label: 'ROFL',
      description: 'A framework that enables offchain computation with private data and verifiable results',
      collapsible: false,
      link: {
        type: 'doc',
        id: 'build/rofl/README',
      },
      items: [
        'build/rofl/quickstart',
        {
          type: 'category',
          label: 'Workflow',
          description: 'Detailed instructions for writing an app in ROFL from scratch',
          link: {
            type: 'doc',
            id: 'build/rofl/workflow/README',
          },
          items: [
            'build/rofl/workflow/prerequisites',
            'build/rofl/workflow/containerize-app',
            'build/rofl/workflow/init',
            'build/rofl/workflow/create',
            'build/rofl/workflow/build',
            'build/rofl/workflow/deploy',
            'build/rofl/workflow/test',
          ]
        },
        {
          type: 'category',
          label: 'Features',
          description: 'Apps in ROFL have powerful features. Learn how to use them.',
          link: {
            type: 'generated-index',
            slug: '/build/rofl/features/',
          },
          items: [
            'build/rofl/features/marketplace',
            'build/rofl/features/secrets',
            'build/rofl/features/storage',
            'build/rofl/features/manifest',
            'build/rofl/features/appd',
            'build/rofl/features/proxy',
          ]
        },
        'build/rofl/troubleshooting',
      ],
    },
    {
      type: 'category',
      label: 'Sapphire',
      description: 'EVM-compatible blockchain featuring encrypted transactions and confidential smart contracts',
      collapsible: false,
      link: {
        type: 'doc',
        id: 'build/sapphire/README',
      },
      items: [
        'build/sapphire/quickstart',
        'build/sapphire/network',
        'build/sapphire/ethereum',
        {
          type: 'category',
          label: 'Develop',
          link: {
            type: 'doc',
            id: 'build/sapphire/develop/README',
          },
          items: [
            'build/sapphire/develop/concept',
            'build/sapphire/develop/browser',
            'build/sapphire/develop/authentication',
            'build/sapphire/develop/gasless',
            'build/sapphire/develop/deployment',
            'build/sapphire/develop/security',
            'build/sapphire/develop/testing',
            'build/sapphire/develop/dappwright',
          ],
        },
        'build/sapphire/examples',
        'build/sapphire/addresses',
      ],
    },
    {
      type: 'category',
      label: 'Oasis Privacy Layer',
      description: 'Cross-chain solution bringing privacy to existing apps on Ethereum and other networks',
      collapsible: true,
      link: {
        type: 'doc',
        id: 'build/opl/README',
      },
      items: [

        {
          type: 'category',
          label: 'Hyperlane Protocol',
          link: {
            type: 'doc',
            id: 'build/opl/hyperlane/README',
          },
          items: [
            'build/opl/hyperlane/relayer',
            'build/opl/hyperlane/pingpong-example',
          ],
        },
        {
          type: 'category',
          label: 'Router Protocol',
          link: {
            type: 'doc',
            id: 'build/opl/router-protocol/README',
          },
          items: [
            'build/opl/router-protocol/pingpong-example',
            'build/opl/router-protocol/interface',
            'build/opl/router-protocol/approve',
          ],
        },
        {
          type: 'category',
          label: 'OPL SDK',
          link: {
            type: 'doc',
            id: 'build/opl/opl-sdk/README',
          },
          items: [
            'build/opl/opl-sdk/ping-example',
          ],
        },
        {
          type: 'category',
          label: 'Celer Inter-Chain Messaging',
          link: {
            type: 'doc',
            id: 'build/opl/celer/README',
          },
          items: [
            'build/opl/celer/ping-example',
            'build/opl/celer/networks',
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'Tools & Services',
      description: 'Oasis integrates with a number of services and provides tooling support for developers using Foundry, Remix (unencrypted transactions only), Sourcify, Docker images, Band, and others.',
      collapsible: true,
      link: {
        type: 'doc',
        id: 'build/tools/README',
      },
      items: [
        {
          type: 'category',
          label: 'Oasis CLI',
          description: 'Oasis command-line interface (CLI) is a powerful all-in-one tool for interacting with the Oasis Network.',
          link: {
            type: 'doc',
            id: 'build/tools/cli/README',
          },
          items: [
            'build/tools/cli/setup',
            'build/tools/cli/network',
            'build/tools/cli/paratime',
            'build/tools/cli/wallet',
            'build/tools/cli/account',
            'build/tools/cli/transaction',
            'build/tools/cli/addressbook',
            'build/tools/cli/rofl',
          ]
        },
        'build/tools/abi-playground',
        'build/tools/verification',
        'build/tools/band',
        'build/tools/localnet',
        'build/tools/remix',
        'build/tools/foundry',
        {
          type: 'category',
          label: 'Build Paratime',
          link: {
            type: 'doc',
            id: 'build/tools/build-paratime/README'
          },
          items: [
            'build/tools/build-paratime/prerequisites',
            'build/tools/build-paratime/minimal-runtime',
            'build/tools/build-paratime/modules',
            'build/tools/build-paratime/reproducibility',
            {
              type: 'link',
              label: 'ParaTime Client TypeScript API',
              href: 'https://api.docs.oasis.io/js/client-rt',
            },
            {
              type: 'link',
              label: 'ParaTime Client Go API',
              href: 'https://pkg.go.dev/github.com/oasisprotocol/oasis-sdk/client-sdk/go/client',
            },
            {
              type: 'link',
              label: 'ParaTime SDK Rust API',
              href: 'https://api.docs.oasis.io/rust/oasis_runtime_sdk',
            },
          ]
        },
        {
          type: 'category',
          label: 'Consensus Layer and Other ParaTimes',
          link: {
            type: 'doc',
            id: 'build/tools/other-paratimes/README',
          },
          items: [
            'build/tools/other-paratimes/network',
            {
              type: 'category',
              label: 'Cipher',
              description: 'Confidential blockchain executing Oasis Wasm smart contracts',
              link: {
                type: 'doc',
                id: 'build/tools/other-paratimes/cipher/README',
              },
              items: [
                'build/tools/other-paratimes/cipher/prerequisites',
                'build/tools/other-paratimes/cipher/network',
                'build/tools/other-paratimes/cipher/hello-world',
                'build/tools/other-paratimes/cipher/confidential-smart-contract',
                {
                  type: 'link',
                  label: 'Rust API',
                  href: 'https://api.docs.oasis.io/rust/oasis_contract_sdk',
                },
              ],
            },
            {
              type: 'category',
              label: 'Emerald',
              description: 'Transparent EVM-compatible blockchain',
              link: {
                type: 'doc',
                id: 'build/tools/other-paratimes/emerald/README',
              },
              items: [
                'build/tools/other-paratimes/emerald/network',
                'build/tools/other-paratimes/emerald/writing-dapps-on-emerald',
              ],
            },
          ],
        },
      ],
    },
  ],
};
