// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  developers: [
    'developers/README',
    {
      type: 'category',
      label: 'Emerald ParaTime',
      link: {
        type: 'doc',
        id: 'developers/emerald/README',
      },
      items: [
        'developers/emerald/writing-dapps-on-emerald',
        'developers/emerald/integrating-band-oracle-smart-contract',
      ],
    },
    {
      type: 'category',
      label: 'Sapphire ParaTime',
      link: {
        type: 'doc',
        id: 'developers/sapphire/README',
      },
      items: [
        'developers/sapphire/writing-dapps-on-sapphire',
      ],
    },
    'developers/cipher/README',
    {
      type: 'category',
      label: 'Oasis SDK',
      collapsible: false,
      link: {
        type: 'doc',
        id: 'developers/sdk/README',
      },
      items: [
        {
          type: 'category',
          label: 'Runtimes',
          link: {
            type: 'generated-index',
            slug: 'developers/sdk/runtime',
          },
          items: [
            'developers/sdk/runtime/prerequisites',
            'developers/sdk/runtime/minimal-runtime',
            'developers/sdk/runtime/modules',
            'developers/sdk/runtime/reproducibility',
            {
              type: 'link',
              label: 'Rust API',
              href: 'https://api.docs.oasis.dev/oasis-sdk/oasis_runtime_sdk',
            },
          ],
        },
        {
          type: 'category',
          label: 'Smart Contracts',
          link: {
            type: 'generated-index',
            slug: 'developers/sdk/contract',
          },
          items: [
            'developers/sdk/contract/prerequisites',
            'developers/sdk/contract/hello-world',
            'developers/sdk/contract/confidential-smart-contract',
            {
              type: 'link',
              label: 'Rust API',
              href: 'https://api.docs.oasis.dev/oasis-sdk/oasis_contract_sdk',
            },
          ],
        },
        {
          type: 'category',
          label: 'Client',
          link: {
            type: 'generated-index',
            slug: 'developers/sdk/client',
          },
          items: [
            {
              type: 'link',
              label: 'Go API',
              href: 'https://pkg.go.dev/github.com/oasisprotocol/oasis-sdk/client-sdk/go/client',
            }
          ],
        },
      ],
    },
  ],
};

module.exports = sidebars;
