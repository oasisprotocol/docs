// @ts-check

/** @type {import('@docusaurus/plugin-client-redirects').PluginOptions} */
const redirectsOptions = {
    redirects: [
        // Write down PR responsible for the removal of a page next to the "from" redirect.
        // TODO: Add fragments (anchors) in "to" URLs once https://github.com/facebook/docusaurus/issues/6845 is implemented. Since then, put the fragment name in the comment.
        {
            to: '/adrs',
            from: [
                '/adrs/0000-architectural-decision-records', // #200 Restructure docs
                '/adrs/template' // #200 Restructure docs
            ],
        },
        {
            to: '/core/oasis-node/cli',
            from: [
                '/general/manage-tokens/advanced/oasis-cli-tools/list-accounts', // #list // #399 Replace oasis-node with Oasis CLI
            ],
        },
        {
            to: '/general/manage-tokens/how-to-transfer-rose-into-paratime',
            from: [
                '/general/manage-tokens/how-to-transfer-rose-into-emerald-paratime', // #171 Add sapphire docs
                '/general/manage-tokens/how-to-transfer-rose-into-evm-paratime', // #200 Restructure docs
            ],
        },
        {
            to: '/general/manage-tokens/faq', // #how-can-i-transfer-rose-tokens-from-my-bitpie-wallet-to-my-oasis-wallet
            from: '/general/manage-tokens/holding-rose-tokens/bitpie-wallet', // #475 Delete bitpie-wallet.md
        },
        {
            to: '/general/manage-tokens/cli',
            from: [
                '/general/manage-tokens/advanced', // #399 Replace oasis-node with Oasis CLI
                '/general/manage-tokens/advanced/oasis-cli-tools/', // #399 Replace oasis-node with Oasis CLI
                '/general/manage-tokens/advanced/file-based-signer', // #399 Replace oasis-node with Oasis CLI
            ],
        },
        {
            to: '/general/manage-tokens/cli/account',
            from: [
                '/general/manage-tokens/advanced/oasis-cli-tools/deposit-withdraw-tokens-to-from-paratime', // #deposit // #399 Replace oasis-node with Oasis CLI
                '/general/manage-tokens/advanced/oasis-cli-tools/get-account-info', // #show // #399 Replace oasis-node with Oasis CLI
                '/general/manage-tokens/advanced/oasis-cli-tools/get-account-nonce', // #show // #399 Replace oasis-node with Oasis CLI
                '/general/manage-tokens/advanced/oasis-cli-tools/address', // #from-public-key // #399 Replace oasis-node with Oasis CLI
                '/general/manage-tokens/advanced/oasis-cli-tools/transfer-tokens', // #transfer // #399 Replace oasis-node with Oasis CLI
                '/general/manage-tokens/advanced/oasis-cli-tools/delegate-tokens', // #delegate // #399 Replace oasis-node with Oasis CLI
                '/general/manage-tokens/advanced/oasis-cli-tools/reclaim-tokens', // #undelegate // #399 Replace oasis-node with Oasis CLI
                '/general/run-a-node/set-up-your-node/amend-commission-schedule', // #amend-commission-schedule // #200 Restructure docs
                '/node/run-your-node/validator-node/amend-commission-schedule', // #amend-commission-schedule // #399 Replace oasis-node with Oasis CLI
            ],
        },
        {
            to: '/general/manage-tokens/cli/network',
            from: [
                '/general/manage-tokens/advanced/oasis-cli-tools/common-staking-info', // #show-native-token // #399 Replace oasis-node with Oasis CLI
                '/general/manage-tokens/advanced/oasis-cli-tools/gas-costs', // #gas-costs // #399 Replace oasis-node with Oasis CLI
                '/general/run-a-node/set-up-your-node/governance', // #governance_cast_vote // #200 Restructure docs
                '/node/run-your-node/validator-node/governance', // #governance_cast_vote // #399 Replace oasis-node with Oasis CLI
            ],
        },
        {
            to: '/general/manage-tokens/cli/setup',
            from: [
                '/general/manage-tokens/advanced/oasis-cli-tools/prerequisites', // #399 Replace oasis-node with Oasis CLI
                '/general/manage-tokens/advanced/oasis-cli-tools/setup', // #399 Replace oasis-node with Oasis CLI
            ]
        },
        {
            to: '/get-involved/',
            from: [
                '/general/community-resources/community-hub', // #200 Restructure docs
                '/general/community-resources/community-made-resources', // #200 Restructure docs
                '/general/oasis-network/connect-with-us', // #200 Restructure docs
            ],
        },
        {
            to: '/get-involved/delegation-policy',
            from: '/general/foundation/delegation-policy', // #200 Restructure docs
        },
        {
            to: '/get-involved/oasis-core',
            from: '/general/contribute-to-the-network/contribution-guidelines', // #200 Restructure docs
        },
        {
            to: '/get-involved/run-node/validator-node',
            from: '/general/contribute-to-the-network/run-validator', // #200 Restructure docs
        },
        {
            to: '/get-involved/run-node/paratime-node',
            from: '/general/contribute-to-the-network/run-a-paratime-node', // #200 Restructure docs
        },
        {
            to: '/get-involved/network-governance',
            from: '/general/contribute-to-the-network/network-governance', // #200 Restructure docs
        },
        {
            to: '/get-involved/token-delivery-and-kyc',
            from: '/general/community-resources/token-delivery-and-kyc', // #200 Restructure docs
        },
        {
            to: '/dapp/',
            from: [
                '/oasis-sdk/', // #200 Restructure docs
                '/general/developer-resources/overview' // #200 Restructure docs
            ],
        },
        {
            to: '/dapp/cipher/',
            from: '/oasis-sdk/contract/getting-started', // #200 Restructure docs
        },
        {
            to: '/dapp/sapphire/',
            from: '/general/developer-resources/sapphire-paratime', // #200 Restructure docs
        },
        {
            to: '/dapp/sapphire/quickstart',
            from: [
                '/general/developer-resources/sapphire-paratime/writing-dapps-on-sapphire', // #218 Add sapphire tutorial
                '/dapp/sapphire/writing-dapps-on-sapphire', // #218 Add sapphire tutorial
            ],
        },
        {
            to: '/general/oasis-network/faq',
            from: '/general/faq/oasis-network-faq', // #200 Restructure docs
        },
        {
            to: '/general/manage-tokens/',
            from: '/general/manage-tokens/overview', // #200 Restructure docs
        },
        {
            to: '/general/oasis-network/',
            from: '/general/oasis-network/overview', // #200 Restructure docs
        },
        {
            to: '/general/oasis-network/why-oasis',
            from: '/oasis-network-primer/', // #200 Restructure docs
        },
        {
            to: '/general/oasis-network/token-metrics-and-distribution',
            from: '/oasis-network-primer/token-metrics-and-distribution', // #200 Restructure docs
        },
        {
            to: '/node/',
            from: '/general/run-a-node/node-operator-overview', // #200 Restructure docs
        },
        {
            to: '/node/mainnet/',
            from: '/general/oasis-network/network-parameters', // #200 Restructure docs
        },
        {
            to: '/node/mainnet/upgrade-log',
            from: '/general/run-a-node/upgrade-log', // #200 Restructure docs
        },
        {
            to: '/node/run-your-node/archive-node',
            from: '/general/run-a-node/set-up-your-node/run-archive-node', // #200 Restructure docs
        },
        {
            to: '/node/genesis-doc',
            from: '/general/oasis-network/genesis-doc', // #200 Restructure docs
        },
        {
            to: '/node/run-your-node/ias-proxy',
            from: '/general/run-a-node/set-up-your-node/run-an-ias-proxy', // #200 Restructure docs
        },
        {
            to: '/node/run-your-node/non-validator-node',
            from: '/general/run-a-node/set-up-your-node/run-non-validator', // #200 Restructure docs
        },
        {
            to: '/node/run-your-node/paratime-client-node',
            from: '/general/run-a-node/set-up-your-node/run-a-paratime-client-node', // #200 Restructure docs
        },
        {
            to: '/node/run-your-node/paratime-node',
            from: '/general/run-a-node/set-up-your-node/run-a-paratime-node', // #200 Restructure docs
        },
        {
            to: '/node/run-your-node/seed-node',
            from: '/general/run-a-node/set-up-your-node/run-seed-node', // #200 Restructure docs
        },
        {
            to: '/node/run-your-node/sentry-node',
            from: '/general/run-a-node/set-up-your-node/sentry-node-architecture', // #200 Restructure docs
        },
        {
            to: '/node/run-your-node/validator-node',
            from: [
                '/general/run-a-node/set-up-your-node/run-validator', // #200 Restructure docs
                '/general/run-a-node/set-up-your-node/creating-an-entity-package', // #200 Restructure docs
            ],
        },
        {
            to: '/node/run-your-node/troubleshooting',
            from: '/general/run-a-node/troubleshooting', // #200 Restructure docs
        },
        {
            to: '/node/testnet/',
            from: '/general/foundation/testnet/', // #200 Restructure docs
        },
        {
            to: '/node/testnet/upgrade-log',
            from: '/general/foundation/testnet/upgrade-log', // #200 Restructure docs
        },
        {
            to: '/paratime/',
            from: '/oasis-sdk/runtime/getting-started' // #200 Restructure docs
        },
        {
            to: '/node/mainnet/previous-upgrades/damask-upgrade',
            from: '/node/mainnet/damask-upgrade' // #572 Move Damask Upgrade docs
        },
        {
            to: '/node/mainnet/eden-upgrade',
            from: '/node/mainnet/e-upgrade' // #600 Add 23.0 upgrade's name
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
