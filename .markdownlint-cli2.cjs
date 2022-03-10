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
};

module.exports = options;
