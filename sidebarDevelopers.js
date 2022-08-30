// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  developers: [
    'developers/README',
    {
      type: 'category',
      label: 'Emerald ParaTime',
      collapsible: false,
      link: {
        type: 'doc',
        id: 'developers/emerald-paratime/README',
      },
      items: [
        'developers/emerald-paratime/writing-dapps-on-emerald',
        'developers/emerald-paratime/integrating-band-oracle-smart-contract',
      ],
    },
    {
      type: 'category',
      label: 'Sapphire ParaTime',
      collapsible: false,
      link: {
        type: 'doc',
        id: 'developers/sapphire-paratime/README',
      },
      items: [
        'developers/sapphire-paratime/writing-dapps-on-sapphire',
      ],
    },
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
          label: 'Smart Contracts',
          collapsible: false,
          items: [
            'developers/sdk/contract/README',
            'developers/sdk/contract/hello-world',
            'developers/sdk/contract/confidential-smart-contract',
          ],
        },
        {
          type: 'category',
          label: 'Runtimes',
          collapsible: false,
          items: [
            'developers/sdk/runtime/README',
            'developers/sdk/runtime/minimal-runtime',
            'developers/sdk/runtime/modules',
            'developers/sdk/runtime/reproducibility',
          ],
        },
        {
          type: 'category',
          label: 'Reference',
          collapsible: false,
          items: [
            {
              type: 'link',
              label: 'Runtime SDK',
              href: 'https://api.docs.oasis.dev/oasis-sdk/oasis_runtime_sdk',
            },
            {
              type: 'link',
              label: 'Contract SDK',
              href: 'https://api.docs.oasis.dev/oasis-sdk/oasis_contract_sdk',
            },
            {
              type: 'category',
              label: 'Client SDK',
              items: [
                {
                  type: 'link',
                  label: 'Go',
                  href: 'https://pkg.go.dev/github.com/oasisprotocol/oasis-sdk/client-sdk/go/client',
                }
              ]
            }
          ],
        },
      ],
    },
  ],
};

module.exports = sidebars;
