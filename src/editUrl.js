// @ts-check
const fs = require('fs-extra');
const path = require('path');

const gitModules = {
    'external/adrs/': 'https://github.com/oasisprotocol/adrs/{mode}/main/',
    'external/cli/': 'https://github.com/oasisprotocol/cli/{mode}/master/',
    'external/oasis-core/': 'https://github.com/oasisprotocol/oasis-core/{mode}/stable/22.2.x/',
    'external/oasis-core-ledger/': 'https://github.com/oasisprotocol/oasis-core-ledger/{mode}/master/',
    'external/oasis-sdk/': 'https://github.com/oasisprotocol/oasis-sdk/{mode}/main/',
};

/**
 * Generates cross-repo edit URL link.
 *
 * @type {import('@docusaurus/plugin-content-docs').EditUrlFunction}
 */
function editLinkUrl(params) {
    const relFilepath = path.join(params.versionDocsDirPath, params.docPath);
    return linkUrl(relFilepath, 'edit');
}

/**
 * Generates cross-repo view URL link (e.g. for viewing example sources).
 */
function viewLinkUrl(relFilePath) {
    return linkUrl(relFilePath, 'blob');
}

function linkUrl(filename, mode) {
    // Resolve composed paths and symlinks, if needed.
    filename = fs.realpathSync(filename);

    // Obtain relative filename to project root.
    filename = path.relative(process.cwd(), filename)
    for (const r in gitModules) {
        if (filename.startsWith(r)) {
            // Extract relative filename inside the git submodule.
            return filename.replace(r, gitModules[r]).replace("{mode}", mode);
        }
    }

    return `https://github.com/oasisprotocol/docs/{mode}/main/${filename}`.replace("{mode}", mode);

}

module.exports = {editLinkUrl, viewLinkUrl};
