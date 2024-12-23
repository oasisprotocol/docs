import {SidebarsConfig} from '@docusaurus/plugin-content-docs';

export const sidebarDapp: SidebarsConfig = {
  developers: [
    {
      type: 'doc',
      label: 'Overview',
      id: 'dapp/README',
    },
    {
      type: 'category',
      label: 'Sapphire',
      link: {
        type: 'doc',
        id: 'dapp/sapphire/README',
      },
      items: [
        'dapp/sapphire/quickstart',
        'dapp/sapphire/network',
        'dapp/sapphire/guide',
        'dapp/sapphire/browser',
        'dapp/sapphire/authentication',
        'dapp/sapphire/gasless',
        'dapp/sapphire/addresses',
        'dapp/sapphire/deployment',
        'dapp/sapphire/security',
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
    {
      type: 'category',
      label: 'Oasis Privacy Layer',
      link: {
        type: 'doc',
        id: 'dapp/opl/README',
      },
      items: [
        {
          type: 'category',
          label: 'OPL SDK',
          link: {
            type: 'doc',
            id: 'dapp/opl/opl-sdk/README',
          },
          items: [
            'dapp/opl/opl-sdk/ping-example',
          ],
        },
        {
          type: 'category',
          label: 'Celer Inter-Chain Messaging',
          link: {
            type: 'doc',
            id: 'dapp/opl/celer/README',
          },
          items: [
            'dapp/opl/celer/ping-example',
            'dapp/opl/celer/networks',
          ],
        },
        {
          type: 'category',
          label: 'Router Protocol',
          link: {
            type: 'doc',
            id: 'dapp/opl/router-protocol/README',
          },
          items: [
            'dapp/opl/router-protocol/pingpong-example',
            'dapp/opl/router-protocol/interface',
            'dapp/opl/router-protocol/approve',
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'Tools & Services',
      link: {
        type: 'doc',
        id: 'dapp/tools/README',
      },
      items: [
        'dapp/tools/abi-playground',
        'dapp/tools/verification',
        'dapp/tools/band',
        'dapp/tools/localnet',
        'dapp/tools/remix',
        {
          type: 'category',
          label: 'Other Paratimes',
          link: {
            type: 'doc',
            id: 'dapp/tools/other-paratimes/README',
          },
          items: [
            {
              type: 'category',
              label: 'Emerald',
              link: {
                type: 'doc',
                id: 'dapp/tools/other-paratimes/emerald/README',
              },
              items: [
                'dapp/tools/other-paratimes/emerald/network',
                'dapp/tools/other-paratimes/emerald/writing-dapps-on-emerald',
              ],
            },
            {
              type: 'category',
              label: 'Cipher',
              link: {
                type: 'doc',
                id: 'dapp/tools/other-paratimes/cipher/README',
              },
              items: [
                'dapp/tools/other-paratimes/cipher/prerequisites',
                'dapp/tools/other-paratimes/cipher/network',
                'dapp/tools/other-paratimes/cipher/hello-world',
                'dapp/tools/other-paratimes/cipher/confidential-smart-contract',
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
