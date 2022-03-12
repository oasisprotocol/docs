// @ts-check

/** @type {import('markdownlint').Options} */
const options = {
  config: {
    // TODO: enable some of these rules
    'line-length': false,
    'no-multiple-blanks': false,
    'no-hard-tabs': false,
    'no-space-in-links': false,
    'no-space-in-emphasis': false,
    'blanks-around-fences': false,
    'list-marker-space': false,
    'ol-prefix': false,
    'ul-style': false,
    'ul-indent': false,
    'no-duplicate-header': false,
    'no-emphasis-as-heading': false,
    'no-trailing-punctuation': false,
    'heading-increment': false,
    'first-line-heading': false,
    'fenced-code-language': false,
    'commands-show-output': false,
    'no-inline-html': false,
    'no-alt-text': false,
  },
  customRules: [{
    // Check relative links have a file extension, and file exists
    names: ['relative-links-have-ext'],
    description: 'for Docusaurus routing',
    tags: ['links'],
    information: new URL('https://github.com/oasisprotocol/docs/issues/4'),
    function: ({ name, tokens }, onError) => {
      const fs = require('fs');
      const path = require('path');
      const dir = path.dirname(name);
      for (const token of tokens) {
        if (token.type === 'inline') {
          for (const child of token.children) {
            if (child.type === 'link_open') {
              const [_key, href] = child.attrs.find(([key, value]) => key === 'href');
              const isAbsoluteUrl = new URL(href, 'relative://a.b').protocol !== 'relative:';
              const isAbsolutePathOrNetworkPath = href.startsWith('/');
              const isFragment = href.startsWith('#');

              const isRelativePath = !isAbsoluteUrl && !isAbsolutePathOrNetworkPath && !isFragment;
              if (isRelativePath) {
                const relativePath = href.split('#')[0];
                const missingExtension = !path.extname(relativePath);
                const missingFile = !fs.existsSync(path.join(dir, relativePath));
                if (missingExtension) {
                  const postfixSuggestions = ['.md', '.mdx', 'README.md', 'README.mdx', '/README.md', '/README.mdx', 'index.md', '/index.md'];
                  const goodPostfix = postfixSuggestions.find(
                    postfix => fs.existsSync(path.join(dir, relativePath + postfix))
                  );
                  const postfixColumn = 1 + child.line.indexOf(href) + relativePath.length;
                  const canFix = goodPostfix && child.line.indexOf(href) >= 0;
                  onError({
                    lineNumber: child.lineNumber,
                    context: href,
                    detail: 'Filename extension missing',
                    fixInfo: !canFix ? undefined : {
                      insertText: goodPostfix,
                      editColumn: postfixColumn,
                    },
                  });
                } else if (missingFile) {
                  onError({
                    lineNumber: child.lineNumber,
                    context: href,
                    detail: 'File missing',
                  });
                }
              }
            }
          }
        }
      }
    },
  }],
};

module.exports = options;
