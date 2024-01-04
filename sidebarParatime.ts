import {SidebarsConfig} from '@docusaurus/plugin-content-docs';

export const sidebarParaTime: SidebarsConfig = {
  paratime: [
    {
      type: 'doc',
      label: 'Overview',
      id: 'paratime/README',
    },
    'paratime/prerequisites',
    'paratime/minimal-runtime',
    'paratime/modules',
    'paratime/reproducibility',
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
  ],
};
