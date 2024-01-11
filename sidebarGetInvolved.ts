import {SidebarsConfig} from '@docusaurus/plugin-content-docs';

export const sidebarGetInvolved: SidebarsConfig = {
  getInvolved: [
    'get-involved/README',
    {
      type: 'link',
      label: 'Become our Ambassador',
      href: 'https://oasisprotocol.org/ambassador-program',
    },
    {
      type: 'link',
      label: 'Become our Influencer',
      href: 'https://oasisprotocol.org/influencer',
    },
    {
      type: 'link',
      label: 'Apply for Grant',
      href: 'https://oasisprotocol.org/grant-programs',
    },
    {
      type: 'link',
      label: 'Join our University Program',
      href: 'https://oasisprotocol.org/university-program',
    },
    {
      type: 'link',
      label: 'Follow Community Portal',
      href: 'https://oasisrose.garden',
    },
    {
      type: 'category',
      label: 'Run a Node',
      collapsible: false,
      link: {
        type: 'generated-index',
        slug: 'get-involved/run-node',
      },
      items: [
        'get-involved/run-node/validator-node',
        'get-involved/run-node/paratime-node',
      ],
    },
    'get-involved/oasis-core',
    'get-involved/network-governance',
    'get-involved/delegation-policy',
    'get-involved/token-delivery-and-kyc',
  ],
};
