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
      label: 'Sapphire',
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
          ],
        },
        'build/sapphire/examples',
        'build/sapphire/addresses',
      ],
    },
    {
      type: 'category',
      label: 'ROFL',
      collapsible: false,
      link: {
        type: 'doc',
        id: 'build/rofl/README',
      },
      items: [
        'build/rofl/prerequisites',
        'build/rofl/app',
        {
          type: 'doc',
          label: 'Deployment',
          id: 'build/rofl/deployment',
        },
        'build/rofl/features',
        'build/rofl/resources',
      ],
    },
    {
      type: 'category',
      label: 'Oasis Privacy Layer',
      collapsible: false,
      link: {
        type: 'doc',
        id: 'build/opl/README',
      },
      items: [
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
        {
          type: 'category',
          label: 'Hyperlane Protocol',
          link: {
            type: 'doc',
            id: 'build/opl/hyperlane/README',
          },
          items: [
            'build/opl/hyperlane/cli',
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
      ],
    },
    {
      type: 'category',
      label: 'Tools & Services',
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
