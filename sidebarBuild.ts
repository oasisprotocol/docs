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
          label: 'Build',
          link: {
            type: 'doc',
            id: 'build/sapphire/build/README',
          },
          items: [
            'build/sapphire/build/concept',
            'build/sapphire/build/browser',
            'build/sapphire/build/clients',
            'build/sapphire/build/authentication',
            'build/sapphire/build/gasless',
            'build/sapphire/build/deployment',
            'build/sapphire/build/security',
            {
              type: 'link',
              label: 'TypeScript API',
              href: 'https://api.docs.oasis.io/js/sapphire-paratime',
            },
            {
              type: 'link',
              label: 'Solidity API',
              href: 'https://api.docs.oasis.io/sol/sapphire-contracts',
            },
          ],
        },
        'build/sapphire/examples',
        'build/sapphire/addresses',
      ],
      collapsed: false
    },
    {
      type: 'category',
      label: 'ROFL',
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
        'build/rofl/trust-root',
      ],
      collapsed: false
    },
    {
      type: 'category',
      label: 'Oasis Privacy Layer',
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
      collapsed: false
    },
    {
      type: 'category',
      label: 'Tools & Services',
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
      collapsed: false
    },
  ],
};
