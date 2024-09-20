import {SidebarsConfig} from '@docusaurus/plugin-content-docs';

export const sidebarROFL: SidebarsConfig = {
  rofl: [
    {
      type: 'doc',
      label: 'Overview',
      id: 'rofl/README',
    },
    'rofl/prerequisites',
    'rofl/app',
    {
      type: 'doc',
      label: 'Deployment',
      id: 'rofl/deployment',
    },
    'rofl/trust-root',
  ],
};
