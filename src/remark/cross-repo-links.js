const visit = require('unist-util-visit');

const cliRegex = /https:\/\/github\.com\/oasisprotocol\/cli\/blob\/master\/docs\/(.*)\.mdx?(#.*)?/;
const oasisSdkContractRegex = /https:\/\/github\.com\/oasisprotocol\/oasis-sdk\/blob\/main\/docs\/contract\/(.*)\.mdx?(#.*)?/;
const oasisSdkRuntimeRegex = /https:\/\/github\.com\/oasisprotocol\/oasis-sdk\/blob\/main\/docs\/runtime\/(.*)\.mdx?(#.*)?/;
const oasisCoreRegex = /https:\/\/github\.com\/oasisprotocol\/oasis-core\/blob\/master\/docs\/(.*)\.mdx?(#.*)?/;
const oasisCoreLedgerRegex = /https:\/\/github\.com\/oasisprotocol\/oasis-core-ledger\/blob\/master\/docs\/(.*)\.mdx?(#.*)?/;
const adrsRegex = /https:\/\/github\.com\/oasisprotocol\/adrs\/blob\/main\/(.*)\.mdx?(#.*)?/;
const docsRegex = /https:\/\/github\.com\/oasisprotocol\/docs\/blob\/main\/docs\/(.*)\.mdx?(#.*)?/;

const indexReadmeRegex = /(index|README)($|#)/;

module.exports = function (options) {
    /**
     * Replace github.com URLs pointing to markdown files of the docs/ folders in various github
     * repos with relative website links depending on the specific component.
     *
     * Examples:
     * https://github.com/oasisprotocol/oasis-sdk/blob/main/docs/runtime/prerequisites.md ->
     *   /paratime/prerequisites
     * https://github.com/oasisprotocol/oasis-core/blob/master/docs/runtime/index.md ->
     *   /core/runtime/
     * https://github.com/oasisprotocol/docs/blob/main/docs/node/genesis-doc.md#committee-scheduler ->
     *   /node/genesis-doc#committee-scheduler
     */
    function visitor(node) {
        if (oasisSdkContractRegex.test(node.url)) {
            node.url = node.url.replace(oasisSdkContractRegex, '/dapp/cipher/$1$2');
        } else if (oasisSdkRuntimeRegex.test(node.url)) {
            node.url = node.url.replace(oasisSdkRuntimeRegex, '/paratime/$1$2');
        } else if (cliRegex.test(node.url)) {
            node.url = node.url.replace(cliRegex, '/general/manage-tokens/cli/$1$2');
        } else if (oasisCoreRegex.test(node.url)) {
            node.url = node.url.replace(oasisCoreRegex, '/core/$1$2');
        } else if (oasisCoreLedgerRegex.test(node.url)) {
            node.url = node.url.replace(adrsRegex, '/oasis-core-ledger/$1$2');
        } else if (adrsRegex.test(node.url)) {
            node.url = node.url.replace(adrsRegex, '/adrs/$1$2');
        } else if (docsRegex.test(node.url)) {
            node.url = node.url.replace(docsRegex, '/$1$2');
        } else {
            return;
        }

        // Trim trailing "index" or "README" in URLs.
        node.url = node.url.replace(indexReadmeRegex, '$2');
    }

    function transform(tree) {
        visit(tree, ['definition', 'link', 'linkReference'], visitor);
    }

    return transform;
};
