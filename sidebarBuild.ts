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
      label: 'ROFL',
      description: 'Runtime OFf-chain Logic (ROFL) apps are a mechanism to augment the deterministic on-chain backend with verifiable off-chain applications',
      collapsible: false,
      link: {
        type: 'doc',
        id: 'build/rofl/README',
      },
      items: [
        'build/rofl/quickstart',
        'build/rofl/prerequisites',
        'build/rofl/app',
        'build/rofl/deployment',
        {
          type: 'category',
          label: 'Features',
          description: 'Containerized ROFL apps automatically have access to some useful features that ease development. This chapter provides an introduction to these features.',
          link: {
            type: 'generated-index',
            slug: '/build/rofl/features',
          },
          items: [
            'build/rofl/features/marketplace',
            'build/rofl/features/secrets',
            'build/rofl/features/storage',
            'build/rofl/features/manifest',
            'build/rofl/features/rest',
            'build/rofl/features/proxy',
            'build/rofl/features/testing',
          ]
        },
        'build/rofl/troubleshooting',
      ],
    },
    {
      type: 'category',
      label: 'Sapphire',
      description: 'Sapphire is our official confidential ParaTime for smart contract development with Ethereum Virtual Machine (EVM) compatibility.',
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
      description: 'The Oasis Privacy Layer (OPL) is a powerful solution that enables developers to integrate privacy features into their decentralized applications (dApps) across multiple EVM-compatible networks.',
      collapsible: false,
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
      collapsible: false,
      link: {
        type: 'doc',
        id: 'build/tools/README',
      },
      items: [
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
          label: 'Other Paratimes',
          link: {
            type: 'doc',
            id: 'build/tools/other-paratimes/README',
          },
          items: [
            {
              type: 'category',
              label: 'Emerald',
              link: {
                type: 'doc',
                id: 'build/tools/other-paratimes/emerald/README',
              },
              items: [
                'build/tools/other-paratimes/emerald/network',
                'build/tools/other-paratimes/emerald/writing-dapps-on-emerald',
              ],
            },
            {
              type: 'category',
              label: 'Cipher',
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
            }
          ],
        },
      ],
    },
  ],
};
