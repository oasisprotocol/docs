// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  paratime: [
    'paratime/README',
    'paratime/prerequisites',
    'paratime/minimal-runtime',
    'paratime/modules',
    'paratime/reproducibility',
    {
      type: 'link',
      label: 'Rust API',
      href: 'https://api.docs.oasis.dev/oasis-sdk/oasis_runtime_sdk',
    },
  ],
};

module.exports = sidebars;
