import {expect, test} from '@jest/globals';

import {
  deriveDescriptionFromTree,
  renderMarkdownFromCapturedTree,
  stripNoisyNodes,
  toMarkdownUrl,
  truncate,
} from './markdown';

const t = (value: string) => ({type: 'text', value});
const h = (depth: number, value: string) => ({
  type: 'heading',
  depth,
  children: [t(value)],
});
const p = (value: string) => ({type: 'paragraph', children: [t(value)]});
const link = (url: string, value: string) => ({
  type: 'link',
  url,
  children: [t(value)],
});
const li = (...children: any[]) => ({type: 'listItem', children});
const list = (...items: any[]) => ({type: 'list', children: items});
const root = (...children: any[]) => ({type: 'root', children});

test('toMarkdownUrl: root maps to /index.md (preserves query/hash)', () => {
  expect(toMarkdownUrl('/')).toBe('/index.md');
  expect(toMarkdownUrl('/?q=1#top')).toBe('/index.md?q=1#top');
});

test('toMarkdownUrl: converts internal doc-like paths and preserves query/hash', () => {
  expect(toMarkdownUrl('/build/rofl/?x=1#sec')).toBe('/build/rofl.md?x=1#sec');
  expect(toMarkdownUrl('/build/rofl/index.mdx?x=1#sec')).toBe(
    '/build/rofl.md?x=1#sec',
  );
  expect(toMarkdownUrl('/build/rofl/README.mdx?x=1#sec')).toBe(
    '/build/rofl.md?x=1#sec',
  );
});

test('toMarkdownUrl: converts same-host absolute URLs when siteBase is provided', () => {
  expect(
    toMarkdownUrl(
      'https://docs.oasis.io/build/rofl/?x=1#sec',
      'https://docs.oasis.io/',
    ),
  ).toBe('https://docs.oasis.io/build/rofl.md?x=1#sec');

  expect(
    toMarkdownUrl('https://docs.oasis.io/?q=1#top', 'https://docs.oasis.io/'),
  ).toBe('https://docs.oasis.io/index.md?q=1#top');
});

test('toMarkdownUrl: leaves absolute URLs on other hosts unchanged', () => {
  expect(
    toMarkdownUrl('https://example.com/build/rofl/', 'https://docs.oasis.io/'),
  ).toBe('https://example.com/build/rofl/');
});

test('toMarkdownUrl: does not append .md to asset URLs with file extensions', () => {
  expect(toMarkdownUrl('/static/files/whitepaper.pdf?download=1#page=2')).toBe(
    '/static/files/whitepaper.pdf?download=1#page=2',
  );
  expect(toMarkdownUrl('/img/logo.png#x')).toBe('/img/logo.png#x');
  expect(
    toMarkdownUrl(
      'https://docs.oasis.io/static/files/whitepaper.pdf?download=1#page=2',
      'https://docs.oasis.io/',
    ),
  ).toBe('https://docs.oasis.io/static/files/whitepaper.pdf?download=1#page=2');
});

test('truncate: never exceeds maxLength', () => {
  const text = 'a'.repeat(10_000);
  for (const maxLength of [1, 2, 3, 4, 10, 50, 200]) {
    expect(truncate(text, maxLength)).toHaveLength(maxLength);
  }
});

test('truncate: returns empty when maxLength is non-positive', () => {
  expect(truncate('hello', 0)).toBe('');
  expect(truncate('hello', -1)).toBe('');
});

test('truncate: returns input when already short enough', () => {
  expect(truncate('hello', 10)).toBe('hello');
});

test('truncate: uses word boundary + ellipsis when possible', () => {
  const text = 'hello world from oasis';
  const value = truncate(text, 14);
  expect(value.length).toBeLessThanOrEqual(14);
  expect(value.endsWith('...')).toBe(true);
});

test('deriveDescriptionFromTree: skips 1-word paragraphs', () => {
  const tree = root(
    h(1, 'Title'),
    p('Run'),
    p('Run this command to get node status.'),
  );

  expect(deriveDescriptionFromTree(tree)).toBe(
    'Run this command to get node status.',
  );
});

test('deriveDescriptionFromTree: skips ADR metadata sections', () => {
  const tree = root(
    h(1, 'ADR 0001'),
    h(2, 'Component'),
    p('Oasis Core'),
    h(2, 'Changelog'),
    list(li(p('2020-01-01: Initial version'))),
    h(2, 'Status'),
    p('Accepted'),
    h(2, 'Context'),
    p('This ADR explains the decision.'),
  );

  expect(deriveDescriptionFromTree(tree)).toBe(
    'This ADR explains the decision.',
  );
});

test('deriveDescriptionFromTree: skips image-only paragraphs', () => {
  const tree = root(
    h(1, 'Title'),
    p('Image: Diagram'),
    p('This page explains how to deploy ROFL apps.'),
  );

  expect(deriveDescriptionFromTree(tree)).toBe(
    'This page explains how to deploy ROFL apps.',
  );
});

test('renderMarkdownFromCapturedTree: rewrites .mdx and index links to permalinks', () => {
  const tree = root({
    type: 'paragraph',
    children: [
      link('/build/rofl/quickstart.mdx#prereq', 'Quickstart'),
      t(' '),
      link('/build/rofl/index.mdx#top', 'ROFL'),
      t(' '),
      link('/build/rofl/README.mdx#top', 'ROFL README'),
    ],
  });
  const docsByPermalink = new Map([
    ['/build/rofl/quickstart', {permalink: '/build/rofl/quickstart'}],
    ['/build/rofl/', {permalink: '/build/rofl/'}],
  ]);

  const cleaned = stripNoisyNodes(structuredClone(tree));
  const output = renderMarkdownFromCapturedTree(cleaned, {docsByPermalink});

  expect(output).toContain('](/build/rofl/quickstart#prereq)');
  expect(output).toContain('](/build/rofl/#top)');
  expect(output).not.toContain('/build/rofl/README.mdx');
});

test('renderMarkdownFromCapturedTree: linkTarget md rewrites internal links to .md mirrors', () => {
  const tree = root({
    type: 'paragraph',
    children: [
      link('/build/rofl/quickstart.mdx#prereq', 'Quickstart'),
      t(' '),
      link('/build/rofl/index.mdx#top', 'ROFL'),
      t(' '),
      link('/build/rofl/README.mdx#top', 'ROFL README'),
      t(' '),
      link('../features/?x=1#sec', 'Features'),
    ],
  });

  const docsByPermalink = new Map([
    ['/build/rofl/quickstart', {permalink: '/build/rofl/quickstart'}],
    ['/build/rofl/', {permalink: '/build/rofl/'}],
  ]);

  const cleaned = stripNoisyNodes(structuredClone(tree));
  const output = renderMarkdownFromCapturedTree(cleaned, {
    docsByPermalink,
    currentPermalink: '/build/rofl/workflow/create',
    linkTarget: 'md',
  });

  expect(output).toContain('](/build/rofl/quickstart.md#prereq)');
  expect(output).toContain('](/build/rofl.md#top)');
  expect(output).not.toContain('/build/rofl/README.mdx');
  expect(output).toContain('](/build/rofl/features.md?x=1#sec)');
});

test('renderMarkdownFromCapturedTree: linkTarget md preserves non-markdown asset links', () => {
  const tree = root({
    type: 'paragraph',
    children: [
      link('/static/files/whitepaper.pdf?download=1#page=2', 'Whitepaper'),
    ],
  });

  const cleaned = stripNoisyNodes(structuredClone(tree));
  const output = renderMarkdownFromCapturedTree(cleaned, {
    docsByPermalink: new Map(),
    linkTarget: 'md',
  });

  expect(output).toContain('](/static/files/whitepaper.pdf?download=1#page=2)');
});

test('renderMarkdownFromCapturedTree: rewrites relative reference definitions', () => {
  const tree = root(
    {
      type: 'paragraph',
      children: [
        {
          type: 'linkReference',
          identifier: 'qs',
          label: 'qs',
          referenceType: 'full',
          children: [t('Quickstart')],
        },
      ],
    },
    {
      type: 'definition',
      identifier: 'qs',
      label: 'qs',
      url: '../rofl/quickstart#prereq',
    },
  );

  const docsByPermalink = new Map([
    ['/build/rofl/quickstart', {permalink: '/build/rofl/quickstart'}],
  ]);

  const cleaned = stripNoisyNodes(structuredClone(tree));
  const output = renderMarkdownFromCapturedTree(cleaned, {
    docsByPermalink,
    currentPermalink: '/build/use-cases/key-generation',
  });

  expect(output).toContain('[qs]: /build/rofl/quickstart#prereq');
});

test('renderMarkdownFromCapturedTree: rewrites relative inline links', () => {
  const tree = root({
    type: 'paragraph',
    children: [link('../rofl/quickstart#prereq', 'Quickstart')],
  });

  const docsByPermalink = new Map([
    ['/build/rofl/quickstart', {permalink: '/build/rofl/quickstart'}],
  ]);

  const cleaned = stripNoisyNodes(structuredClone(tree));
  const output = renderMarkdownFromCapturedTree(cleaned, {
    docsByPermalink,
    currentPermalink: '/build/use-cases/key-generation',
  });

  expect(output).toContain('](/build/rofl/quickstart#prereq)');
});

test('renderMarkdownFromCapturedTree: rewrites relative links without canonical docs', () => {
  const tree = root({
    type: 'paragraph',
    children: [link('../features/', 'Other features')],
  });

  const cleaned = stripNoisyNodes(structuredClone(tree));
  const output = renderMarkdownFromCapturedTree(cleaned, {
    docsByPermalink: new Map(),
    currentPermalink: '/build/rofl/workflow/create',
  });

  expect(output).toContain('](/build/rofl/features/)');
});

test('stripNoisyNodes: preserves TabItem labels and HTML text', () => {
  const tree = root(
    {
      type: 'mdxJsxFlowElement',
      name: 'TabItem',
      attributes: [{type: 'mdxJsxAttribute', name: 'label', value: 'macOS'}],
      children: [p('Run the command.')],
    },
    {type: 'html', value: 'Use x<sup>1</sup><br>Next'},
  );

  const cleaned = stripNoisyNodes(structuredClone(tree));
  const output = renderMarkdownFromCapturedTree(cleaned, {
    docsByPermalink: new Map(),
  });

  expect(output).toContain('**Tab**: macOS');
  expect(output).toContain('Run the command.');
  expect(output).toContain('Use x1');
  expect(output).toContain('Next');
  expect(output).not.toContain('<sup>');
  expect(output).not.toContain('<br>');
});

test('stripNoisyNodes: converts mdx img to alt text', () => {
  const tree = root({
    type: 'paragraph',
    children: [
      {
        type: 'mdxJsxTextElement',
        name: 'img',
        attributes: [
          {type: 'mdxJsxAttribute', name: 'alt', value: 'Diagram'},
          {type: 'mdxJsxAttribute', name: 'src', value: 'diagram.svg'},
        ],
        children: [],
      },
    ],
  });

  const cleaned = stripNoisyNodes(structuredClone(tree));
  const output = renderMarkdownFromCapturedTree(cleaned, {
    docsByPermalink: new Map(),
  });

  expect(output).toContain('Image: Diagram');
});

test('stripNoisyNodes: converts DocCard to a link with proper title', () => {
  const tree = root({
    type: 'mdxJsxFlowElement',
    name: 'DocCard',
    attributes: [
      {
        type: 'mdxJsxAttribute',
        name: 'item',
        value: {
          type: 'mdxJsxAttributeValueExpression',
          value: "findSidebarItem('/build/rofl/workflow/deploy')",
        },
      },
    ],
    children: [],
  });

  const docsByPermalink = new Map([
    [
      '/build/rofl/workflow/deploy',
      {permalink: '/build/rofl/workflow/deploy', title: 'Deploy'},
    ],
  ]);

  const cleaned = stripNoisyNodes(structuredClone(tree));
  const output = renderMarkdownFromCapturedTree(cleaned, {docsByPermalink});

  expect(output).toContain('* [Deploy](/build/rofl/workflow/deploy)');
});

test('stripNoisyNodes: preserves admonition titles from hProperties.title', () => {
  const tree = root({
    type: 'containerDirective',
    name: 'tip',
    attributes: {},
    data: {hProperties: {title: 'Web3 gateway'}},
    children: [p('Body text.')],
  });

  const cleaned = stripNoisyNodes(structuredClone(tree));
  const output = renderMarkdownFromCapturedTree(cleaned, {
    docsByPermalink: new Map(),
  });

  expect(output).toContain('**Tip**: Web3 gateway');
  expect(output).toContain('Body text.');
});

test('stripNoisyNodes: converts DocCardList to a list of links with titles', () => {
  const tree = root({
    type: 'mdxJsxFlowElement',
    name: 'DocCardList',
    attributes: [
      {
        type: 'mdxJsxAttribute',
        name: 'items',
        value: {
          type: 'mdxJsxAttributeValueExpression',
          value:
            "[findSidebarItem('/build/rofl/workflow/deploy'), findSidebarItem('/build/rofl/workflow/test')]",
        },
      },
    ],
    children: [],
  });

  const docsByPermalink = new Map([
    [
      '/build/rofl/workflow/deploy',
      {permalink: '/build/rofl/workflow/deploy', title: 'Deploy'},
    ],
    [
      '/build/rofl/workflow/test',
      {permalink: '/build/rofl/workflow/test', title: 'Test'},
    ],
  ]);

  const cleaned = stripNoisyNodes(structuredClone(tree));
  const output = renderMarkdownFromCapturedTree(cleaned, {docsByPermalink});

  expect(output).toContain('* [Deploy](/build/rofl/workflow/deploy)');
  expect(output).toContain('* [Test](/build/rofl/workflow/test)');
});
