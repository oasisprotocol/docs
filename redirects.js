// @ts-check

/** @type {import('@docusaurus/plugin-client-redirects').PluginOptions} */
const redirectsOptions = {
    redirects: [
        {
            to: '/general/manage-tokens/how-to-transfer-rose-into-paratime',
            from: [
                '/general/manage-tokens/how-to-transfer-rose-into-emerald-paratime', // #171 Add sapphire docs
                '/general/manage-tokens/how-to-transfer-rose-into-evm-paratime', // #200 Restructure docs
            ],
        },
        // #200 Restructure docs
        {
            to: '/adrs',
            from: ['/adrs/0000-architectural-decision-records', '/adrs/template'],
        },
        {
            to: '/get-involved/',
            from: ['/general/community-resources/community-hub', '/general/community-resources/community-made-resources', '/general/oasis-network/connect-with-us'],
        },
        {
            to: '/get-involved/delegation-policy',
            from: '/general/foundation/delegation-policy',
        },
        {
            to: '/get-involved/oasis-core',
            from: '/general/contribute-to-the-network/contribution-guidelines',
        },
        {
            to: '/get-involved/run-node/validator-node',
            from: '/general/contribute-to-the-network/run-validator',
        },
        {
            to: '/get-involved/run-node/paratime-node',
            from: '/general/contribute-to-the-network/run-a-paratime-node',
        },
        {
            to: '/get-involved/network-governance',
            from: '/general/contribute-to-the-network/network-governance',
        },
        {
            to: '/get-involved/token-delivery-and-kyc',
            from: '/general/community-resources/token-delivery-and-kyc',
        },
        {
            to: '/dapp/',
            from: ['/oasis-sdk/', '/general/developer-resources/overview'],
        },
        {
            to: '/dapp/cipher/',
            from: '/oasis-sdk/contract/getting-started',
        },
	{
            to: '/dapp/sapphire/',
            from: '/general/developer-resources/sapphire-paratime',
	},
	{
            to: '/dapp/sapphire/quickstart',
            from: ['/general/developer-resources/sapphire-paratime/writing-dapps-on-sapphire', '/dapp/sapphire/writing-dapps-on-sapphire'], // #218 Add sapphire tutorial
	},
        {
            to: '/general/oasis-network/faq',
            from: '/general/faq/oasis-network-faq',
        },
        {
            to: '/general/manage-tokens/',
            from: '/general/manage-tokens/overview',
        },
        {
            to: '/general/oasis-network/',
            from: '/general/oasis-network/overview',
        },
        {
            to: '/general/oasis-network/why-oasis',
            from: '/oasis-network-primer/',
        },
        {
            to: '/general/oasis-network/token-metrics-and-distribution',
            from: '/oasis-network-primer/token-metrics-and-distribution',
        },
        {
            to: '/node/',
            from: '/general/run-a-node/node-operator-overview',
        },
        {
            to: '/node/mainnet/',
            from: '/general/oasis-network/network-parameters',
        },
        {
            to: '/node/mainnet/upgrade-log',
            from: '/general/run-a-node/upgrade-log',
        },
        {
            to: '/node/run-your-node/archive-node',
            from: '/general/run-a-node/set-up-your-node/run-archive-node',
        },
        {
            to: '/node/genesis-doc',
            from: '/general/oasis-network/genesis-doc',
        },
        {
            to: '/node/run-your-node/ias-proxy',
            from: '/general/run-a-node/set-up-your-node/run-an-ias-proxy',
        },
        {
            to: '/node/run-your-node/non-validator-node',
            from: '/general/run-a-node/set-up-your-node/run-non-validator',
        },
        {
            to: '/node/run-your-node/paratime-client-node',
            from: '/general/run-a-node/set-up-your-node/run-a-paratime-client-node',
        },
        {
            to: '/node/run-your-node/paratime-node',
            from: '/general/run-a-node/set-up-your-node/run-a-paratime-node',
        },
        {
            to: '/node/run-your-node/seed-node',
            from: '/general/run-a-node/set-up-your-node/run-seed-node',
        },
        {
            to: '/node/run-your-node/sentry-node',
            from: '/general/run-a-node/set-up-your-node/sentry-node-architecture',
        },
        {
            to: '/node/run-your-node/validator-node/',
            from: ['/general/run-a-node/set-up-your-node/run-validator', '/general/run-a-node/set-up-your-node/creating-an-entity-package'],
        },
        {
            to: '/node/run-your-node/validator-node/amend-commission-schedule',
            from: '/general/run-a-node/set-up-your-node/amend-commission-schedule',
        },
        {
            to: '/node/run-your-node/validator-node/governance',
            from: '/general/run-a-node/set-up-your-node/governance',
        },
        {
            to: '/node/run-your-node/troubleshooting',
            from: '/general/run-a-node/troubleshooting',
        },
        {
            to: '/node/testnet/',
            from: '/general/foundation/testnet/',
        },
        {
            to: '/node/testnet/upgrade-log',
            from: '/general/foundation/testnet/upgrade-log',
        },
        {
            to: '/paratime/',
            from: '/oasis-sdk/runtime/getting-started'
        },
    ],
    createRedirects(existingPath) {
        // #119 Add /oasis-core/adr/* -> /adrs/* redirection
        if (existingPath.includes('/adrs')) {
            return [existingPath.replace('/adrs', '/oasis-core/adr')];
        }
        // #200 Restructure docs
        if (existingPath.includes('/node/mainnet')) {
            return [existingPath.replace('/node/mainnet', '/general/mainnet')];
        }
        if (existingPath.includes('/node/run-your-node/advanced')) {
            return [existingPath.replace('/node/run-your-node/advanced', '/general/run-a-node/advanced')];
        }
        if (existingPath.includes('/node/run-your-node/prerequisites')) {
            return [existingPath.replace('/node/run-your-node/prerequisites', '/general/run-a-node/prerequisites')];
        }
        if (existingPath.includes('/node/run-your-node/maintenance')) {
            return [existingPath.replace('/node/run-your-node/maintenance', '/general/run-a-node/maintenance-guides')];
        }
        if (existingPath.includes('/dapp/emerald')) {
            return [existingPath.replace('/dapp/emerald', '/general/developer-resources/emerald-paratime')];
        }
        if (existingPath.includes('/dapp/cipher')) {
            return [existingPath.replace('/dapp/cipher', '/oasis-sdk/contract')];
        }
        if (existingPath.includes('/paratime')) {
            return [existingPath.replace('/paratime', '/oasis-sdk/runtime')];
        }
        if (existingPath.includes('/core')) {
            return [existingPath.replace('/core', '/oasis-core')];
        }
        return undefined;
    },
};

module.exports = redirectsOptions
