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
            to: '/general/contribute-to-the-network/delegation-policy',
            from: '/general/foundation/delegation-policy'
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
            to: '/operators/',
            from: '/general/run-a-node/node-operator-overview',
        },
        {
            to: '/operators/mainnet/',
            from: '/general/oasis-network/network-parameters'
        },
        {
            to: '/operators/mainnet/upgrade-log',
            from: '/general/run-a-node/upgrade-log'
        },
        {
            to: '/operators/run-your-node/archive-node',
            from: '/general/run-a-node/set-up-your-node/run-archive-node'
        },
        {
            to: '/operators/run-your-node/genesis-doc',
            from: '/general/oasis-network/genesis-doc'
        },
        {
            to: '/operators/run-your-node/ias-proxy',
            from: '/general/run-a-node/set-up-your-node/run-an-ias-proxy'
        },
        {
            to: '/operators/run-your-node/non-validator-node',
            from: '/general/run-a-node/set-up-your-node/run-non-validator'
        },
        {
            to: '/operators/run-your-node/paratime-client-node',
            from: '/general/run-a-node/set-up-your-node/run-a-paratime-client-node'
        },
        {
            to: '/operators/run-your-node/paratime-node',
            from: '/general/run-a-node/set-up-your-node/run-a-paratime-node'
        },
        {
            to: '/operators/run-your-node/seed-node',
            from: '/general/run-a-node/set-up-your-node/run-seed-node'
        },
        {
            to: '/operators/run-your-node/sentry-node',
            from: '/general/run-a-node/set-up-your-node/sentry-node-architecture'
        },
        {
            to: '/operators/run-your-node/validator-node/',
            from: ['/general/run-a-node/set-up-your-node/run-validator', '/general/run-a-node/set-up-your-node/creating-an-entity-package']
        },
        {
            to: '/operators/run-your-node/validator-node/amend-commission-schedule',
            from: '/general/run-a-node/set-up-your-node/amend-commission-schedule'
        },
        {
            to: '/operators/run-your-node/validator-node/governance',
            from: '/general/run-a-node/set-up-your-node/governance'
        },
        {
            to: '/operators/run-your-node/troubleshooting',
            from: '/general/run-a-node/troubleshooting'
        },
        {
            to: '/operators/testnet/',
            from: '/general/foundation/testnet/'
        },          {
            to: '/operators/testnet/upgrade-log',
            from: '/general/foundation/testnet/upgrade-log'
        },
        {
            to: '/general/contribute-to-the-network/token-delivery-and-kyc',
            from: '/general/community-resources/token-delivery-and-kyc'
        },
        {
            to: '/general/oasis-network/',
            from: ['/general/community-resources/community-hub', '/general/community-resources/community-made-resources', '/general/oasis-network/connect-with-us']
        }
    ],
    createRedirects(existingPath) {
        // #119 Add /oasis-core/adr/* -> /adrs/* redirection
        if (existingPath.includes('/adrs')) {
            return [existingPath.replace('/adrs', '/oasis-core/adr')];
        }
        // #200 Restructure docs
        if (existingPath.includes('/operators/mainnet')) {
            return [existingPath.replace('/operators/mainnet', '/general/mainnet')];
        }
        if (existingPath.includes('/operators/run-your-node/advanced')) {
            return [existingPath.replace('/operators/run-your-node/advanced', '/general/run-a-node/advanced')];
        }
        if (existingPath.includes('/operators/run-your-node/prerequisites')) {
            return [existingPath.replace('/operators/run-your-node/prerequisites', '/general/run-a-node/prerequisites')];
        }
        if (existingPath.includes('/operators/run-your-node/maintenance')) {
            return [existingPath.replace('/operators/run-your-node/maintenance', '/general/run-a-node/maintenance-guides')];
        }
        if (existingPath.includes('/developers/emerald')) {
            return [existingPath.replace('/developers/emerald', '/general/developer-resources/emerald-paratime')];
        }
        if (existingPath.includes('/developers/sapphire')) {
            return [existingPath.replace('/developers/sapphire', '/general/developer-resources/sapphire-paratime')];
        }
        if (existingPath.includes('/developers/sdk')) {
            return [existingPath.replace('/developers/sdk', '/oasis-sdk')];
        }
        if (existingPath.includes('/core')) {
            return [existingPath.replace('/core', '/oasis-core')];
        }
        return undefined;
    },
};

module.exports = redirectsOptions
