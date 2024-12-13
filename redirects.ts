import { Options } from '@docusaurus/plugin-client-redirects';

export const redirectsOptions: Options = {
    redirects: [
        // Write down PR responsible for the removal of a page next to the "from" redirect.
        {
            to: '/adrs',
            from: [
                '/adrs/0000-architectural-decision-records', // #200 Restructure docs
                '/adrs/template' // #200 Restructure docs
            ],
        },
        {
            to: '/core/oasis-node/cli#dump',
            from: [
                '/general/manage-tokens/advanced/oasis-cli-tools/list-accounts', // #399 Replace oasis-node with Oasis CLI
            ],
        },
        {
            to: '/general/manage-tokens/',
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
            to: '/general/manage-tokens/cli/account#amend-commission-schedule',
            from: [
                '/general/run-a-node/set-up-your-node/amend-commission-schedule', // #200 Restructure docs
                '/node/run-your-node/validator-node/amend-commission-schedule', // #399 Replace oasis-node with Oasis CLI
            ],
        },
        {
            to: '/general/manage-tokens/cli/account#delegate',
            from: [
                '/general/manage-tokens/advanced/oasis-cli-tools/delegate-tokens', // #399 Replace oasis-node with Oasis CLI
            ]
        },
        {
            to: '/general/manage-tokens/cli/account#deposit',
            from: [
                '/general/manage-tokens/advanced/oasis-cli-tools/deposit-withdraw-tokens-to-from-paratime', // #399 Replace oasis-node with Oasis CLI
            ]
        },
        {
            to: '/general/manage-tokens/cli/account#from-public-key',
            from: [
                '/general/manage-tokens/advanced/oasis-cli-tools/address', // #399 Replace oasis-node with Oasis CLI
            ]
        },
        {
            to: '/general/manage-tokens/cli/account#show',
            from: [
                '/general/manage-tokens/advanced/oasis-cli-tools/get-account-info', // #399 Replace oasis-node with Oasis CLI
                '/general/manage-tokens/advanced/oasis-cli-tools/get-account-nonce', // #399 Replace oasis-node with Oasis CLI
            ]
        },
        {
            to: '/general/manage-tokens/cli/account#transfer',
            from: [
                '/general/manage-tokens/advanced/oasis-cli-tools/transfer-tokens', // #399 Replace oasis-node with Oasis CLI
            ]
        },
        {
            to: '/general/manage-tokens/cli/account#undelegate',
            from: [
                '/general/manage-tokens/advanced/oasis-cli-tools/reclaim-tokens', // #399 Replace oasis-node with Oasis CLI
            ]
        },
        {
            to: '/general/manage-tokens/cli/network#gas-costs',
            from: [
                '/general/manage-tokens/advanced/oasis-cli-tools/gas-costs', // #399 Replace oasis-node with Oasis CLI
            ]
        },
        {
            to: '/general/manage-tokens/cli/network#governance_cast_vote',
            from: [
                '/general/run-a-node/set-up-your-node/governance', // #200 Restructure docs
                '/node/run-your-node/validator-node/governance', // #399 Replace oasis-node with Oasis CLI
            ],
        },
        {
            to: '/general/manage-tokens/cli/network#show-native-token',
            from: [
                '/general/manage-tokens/advanced/oasis-cli-tools/common-staking-info', // #399 Replace oasis-node with Oasis CLI
            ]
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
            to: '/build/',
            from: [
                '/oasis-sdk/', // #200 Restructure docs
                '/general/developer-resources/overview', // #200 Restructure docs
                '/dapp/', // #1058 Rename dapp to build
            ],
        },
        {
            to: '/build/sapphire/',
            from: [
                '/general/developer-resources/sapphire-paratime', // #200 Restructure docs
                '/dapp/sapphire/', // #1058 Rename dapp to build
            ]
        },
        {
            to: '/build/sapphire/quickstart',
            from: [
                '/general/developer-resources/sapphire-paratime/writing-dapps-on-sapphire', // #218 Add sapphire tutorial
                '/dapp/sapphire/writing-dapps-on-sapphire', // #218 Add sapphire tutorial
                '/dapp/sapphire/quickstart', // #1058 Rename dapp to build
            ],
        },
        {
            to: '/general/oasis-network/faq',
            from: '/general/faq/oasis-network-faq', // #200 Restructure docs
        },
        {
            to: '/general/manage-tokens/',
            from: [
              '/general/manage-tokens/overview', // #200 Restructure docs
              '/general/manage-tokens/how-to-transfer-rose-into-paratime', // #777 Revamp manage-tokens chapters
            ]
        },
        {
            to: '/general/manage-tokens/holding-rose-tokens/ledger-wallet/',
            from: [
                '/oasis-core-ledger', // #626 Deprecate oasis-core-ledger
                '/oasis-core-ledger/usage/setup', // #626 Deprecate oasis-core-ledger
                '/oasis-core-ledger/usage/address', // #626 Deprecate oasis-core-ledger
                '/oasis-core-ledger/usage/entity', // #626 Deprecate oasis-core-ledger
                '/oasis-core-ledger/usage/transactions', // #626 Deprecate oasis-core-ledger
                '/oasis-core-ledger/usage/wallets', // #626 Deprecate oasis-core-ledger
                '/oasis-core-ledger/versioning', // #626 Deprecate oasis-core-ledger
                '/oasis-core-ledger/release-process', // #626 Deprecate oasis-core-ledger
            ]
        },
        {
            to: '/general/oasis-network/',
            from: '/general/oasis-network/overview', // #200 Restructure docs
        },
        {
            to: 'https://oasisprotocol.org/',
            from: [
              '/general/oasis-network/why-oasis', // #1052 Redirect why page to OPF
              '/oasis-network-primer/', // #200 Restructure docs
            ]
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
            to: '/node/run-your-node/advanced/remote-signer',
            from: [
                '/node/run-your-node/advanced/using-ledger-backed-consensus-key-with-a-remote-signer', // #626 Deprecate oasis-core-ledger
                '/node/run-your-node/advanced/install-oasis-remote-signer-binary', // #626 Deprecate oasis-core-ledger
            ],
        },
        {
            to: '/node/run-your-node',
            from: [
                '/general/run-a-node/set-up-your-node/run-an-ias-proxy', // #200 Restructure docs
                '/node/run-your-node/ias-proxy', // #1076 Remove IAS Proxy
            ],
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
            to: '/build/tools/build-paratime/',
            from: [
                '/oasis-sdk/runtime/getting-started', // #200 Restructure docs
                '/paratime/', // #1058 Rename dapp to build
            ]
        },
        {
            to: '/node/mainnet/previous-upgrades/damask-upgrade',
            from: '/node/mainnet/damask-upgrade' // #572 Move Damask Upgrade docs
        },
        {
            to: '/node/mainnet/eden-upgrade',
            from: '/node/mainnet/e-upgrade' // #600 Add 23.0 upgrade's name
        },
        {
            to: 'https://api.docs.oasis.io/sol/sapphire-contracts',
            from: '/dapp/sapphire/precompiles' // #688 Migrate dapp/sapphire/precompiles chapter to api.docs.oasis.io
        },
        {
            to: '/build/tools/band',
            from: [
                '/dapp/emerald/integrating-band-oracle-smart-contract', // #907 Move Band oracle to Tools section
                '/dapp/tools/band', // #1058 Rename dapp to build
            ]
        },
        {
            to: '/build/tools/verification',
            from: [
                '/dapp/sapphire/verification', // #1054 Move Sapphire verification to Tools section
                '/dapp/tools/verification', // #1058 Rename dapp to build
            ]
        },
        {
            to: '/build/tools/other-paratimes/emerald/',
            from: [
                '/dapp/emerald/', // #1041 Move Emerald and Cipher to /tools/other-paratimes/
                '/dapp/tools/other-paratimes/emeerald/', // #1058 Rename dapp to build
            ]
        },
        {
            to: '/build/tools/other-paratimes/cipher/',
            from: [
                '/oasis-sdk/contract/getting-started', // #200 Restructure docs'
                '/dapp/cipher/', // #1041 Move Emerald and Cipher to /tools/other-paratimes/
                '/dapp/tools/other-paratimes/cipher/', // #1058 Rename dapp to build
            ]
        },
        {
            to: '/build/rofl/',
            from: '/rofl/', // #1058 Rename dapp to build
        },
        {
            to: '/build/tools/build-paratime/',
            from: '/paratime/', // #1058 Rename dapp to build
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
        if (existingPath.includes('/build/emerald')) {
            return [existingPath.replace('/build/emerald', '/general/developer-resources/emerald-paratime')];
        }
        if (existingPath.includes('/build/cipher')) {
            return [existingPath.replace('/build/cipher', '/oasis-sdk/contract')];
        }
        if (existingPath.includes('/build/tools/build-paratime')) {
            return [existingPath.replace('/build/tools/build-paratime', '/oasis-sdk/runtime')];
        }
        if (existingPath.includes('/core')) {
            return [existingPath.replace('/core', '/oasis-core')];
        }
        return undefined;
    },
};
