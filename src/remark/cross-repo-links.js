const visit = require('unist-util-visit');

const oasisSdkRegex = /https:\/\/github\.com\/oasisprotocol\/oasis-sdk\/blob\/main\/docs\/(.*)\.mdx?(#.*)?/;
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
     * https://github.com/oasisprotocol/oasis-sdk/blob/main/docs/runtime/getting-started.md ->
     *   /developers/sdk/runtime/getting-started
     * https://github.com/oasisprotocol/oasis-core/blob/master/docs/runtime/index.md ->
     *   /core/runtime/
     * https://github.com/oasisprotocol/docs/blob/main/docs/general/oasis-network/genesis-doc.md#committee-scheduler ->
     *   /general/oasis-network/genesis-doc#committee-scheduler
     */
    function visitor(node) {
        if (oasisSdkRegex.test(node.url)) {
            node.url = node.url.replace(oasisSdkRegex, '/developers/sdk/$1$2');
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

        // Trim trailing "index" and "README" in URLs.
        node.url = node.url.replace(indexReadmeRegex, '$2');
    }

    function transform(tree) {
        visit(tree, ['definition', 'link', 'linkReference'], visitor);
    }

    return transform;
};
