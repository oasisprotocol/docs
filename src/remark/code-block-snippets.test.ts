import {expect, test} from '@jest/globals';
import {visitor} from './code-block-snippets';

// #region test-region
// This is to test including
// some region of
// the code inside
// the code snippet.
// #endregion test-region

test('basic', () => {
    let node = {
        type: 'paragraph',
        children: [{
            type: 'image',
            alt: 'code js',
            url: 'src/remark/code-block-snippets.test.ts',
            title: 'Some title',
        }],
    };

    visitor(node);

    expect(node.type).toBe('code');
    expect(node.lang).toBe('js');
    expect(node.meta).toBe('title="Some title"');
    expect(node.value).not.toBeNull();
});

test('line-number', () => {
    let node = {
        type: 'paragraph',
        children: [{
            type: 'image',
            alt: 'code js',
            url: 'src/remark/code-block-snippets.test.ts#L3',
            title: 'Some title',
        }],
    };

    visitor(node);

    expect(node.type).toBe('code');
    expect(node.lang).toBe('js');
    expect(node.meta).toBe('title="Some title"');
    expect(node.value.split("\n").length).toBe(1);
});

test('line-numbers', () => {
    let node = {
        type: 'paragraph',
        children: [{
            type: 'image',
            alt: 'code js',
            url: 'src/remark/code-block-snippets.test.ts#L2-L4',
            title: 'Some title',
        }],
    };

    visitor(node);

    expect(node.type).toBe('code');
    expect(node.meta).toBe('title="Some title"');
    expect(node.value.split("\n").length).toBe(3);
});

test('region', () => {
    let node = {
        type: 'paragraph',
        children: [{
            type: 'image',
            alt: 'code js',
            url: 'src/remark/code-block-snippets.test.ts#test-region',
            title: 'Some title',
        }],
    };

    visitor(node);

    expect(node.type).toBe('code');
    expect(node.lang).toBe('js');
    expect(node.meta).toBe('title="Some title"');
    // @ts-expect-error TODO: code block can't link to source
    expect(node.url.endsWith('L5-L8')).toBe(true);
    expect(node.value.split("\n").length).toBe(4);
});

test('highlight-line-numbers-lang', () => {
    let node = {
        type: 'paragraph',
        children: [{
            type: 'image',
            alt: 'code text 4-6', // {4-6} curly brackets are automatically stripped.
            url: 'src/remark/code-block-snippets.test.ts',
        }],
    };

    visitor(node);

    expect(node.type).toBe('code');
    expect(node.meta).toBe('{4-6}');
});

test('highlight-line-numbers-lang-title', () => {
    let node = {
        type: 'paragraph',
        children: [{
            type: 'image',
            alt: 'code text 4-6', // {4-6} curly brackets are automatically stripped.
            url: 'src/remark/code-block-snippets.test.ts',
            title: 'Some title',
        }],
    };

    visitor(node);

    expect(node.type).toBe('code');
    expect(node.lang).toBe('text');
    expect(node.meta).toBe('{4-6} title="Some title"');
});

test('invalid-file', () => {
    let node = {
        type: 'paragraph',
        children: [{
            type: 'image',
            alt: 'code ts',
            url: 'src/remark/foobar.ts',
            title: 'Some title',
        }],
    };

    expect(() => {visitor(node)}).toThrow('ENOENT: no such file or directory, open \'src/remark/foobar.ts\'');
});

test('invalid-region', () => {
    let node = {
        type: 'paragraph',
        children: [{
            type: 'image',
            alt: 'code js',
            url: 'src/remark/code-block-snippets.test.ts#some-nonexistent-region',
            title: 'Some title',
        }],
    };

    expect(() => {visitor(node)}).toThrow(ReferenceError);
});

test('invalid-line-numbers', () => {
    let node = {
        type: 'paragraph',
        children: [{
            type: 'image',
            alt: 'code js',
            url: 'src/remark/code-block-snippets.test.ts#L2-L400',
            title: 'Some title',
        }],
    };

    expect(() => {visitor(node)}).toThrow(ReferenceError);
});

test('code-in-separate-paragraph', () => {
    let node = {
        type: 'paragraph',
        children: [{
            type: 'image',
            alt: 'code js',
            url: 'src/remark/code-block-snippets.test.ts',
            title: 'Some title',
        }, {
            type: 'text',
            value: 'some-text',
        }],
    };

    visitor(node);
    expect(node.type).toBe('paragraph');
    node.children.pop();

    node.children = [{ type: 'text',value: 'some-text' }, ...node.children];
    visitor(node);
    expect(node.type).toBe('paragraph');

    node.children.push({ type: 'text', value: 'some-text' });
    visitor(node);
    expect(node.type).toBe('paragraph');
});
