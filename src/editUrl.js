// @ts-check
const fs = require('fs-extra');
const path = require('path');

const gitModules = {
    'external/adrs/': 'https://github.com/oasisprotocol/adrs/edit/main',
    'external/oasis-core/': 'https://github.com/oasisprotocol/oasis-core/edit/master',
    'external/oasis-core-ledger/': 'https://github.com/oasisprotocol/oasis-core-ledger/edit/master',
    'external/oasis-sdk/': 'https://github.com/oasisprotocol/oasis-sdk/edit/main',
};

/**
 * Generates cross-repo edit URL link.
 *
 * @type {import('@docusaurus/plugin-content-docs').EditUrlFunction}
 */
function editLinkUrl(params) {
    // Resolve symlink, if needed.
    const relFilepath = path.join(params.versionDocsDirPath, params.docPath);
    const p = fs.realpathSync(relFilepath);

    for (const r in gitModules) {
        const regex = new RegExp( `.*${r}(.*)`);
        if (regex.test(p)) {
            // Extract relative filename inside the git submodule.
            const file = regex.exec(p)[1];
            return `${gitModules[r]}/${file}`;
        }
    }

    return `https://github.com/oasisprotocol/docs/edit/main/${relFilepath}`;
}

module.exports = editLinkUrl;
