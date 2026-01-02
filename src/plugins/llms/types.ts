import type {Node} from 'unist';

export interface MdastNode extends Node {
  type: string;
  children?: MdastNode[];
  value?: string;
  url?: string;
  alt?: string;
  title?: string;
  depth?: number;
  name?: string;
  attributes?: {
    type: string;
    name: string;
    value: string | {value: string} | null;
  }[];
  label?: string;
  data?: Record<string, unknown>;
  position?: {
    start: {line: number; column: number; offset?: number};
    end: {line: number; column: number; offset?: number};
  };
}

export interface SidebarCategoryItem {
  type: 'category';
  label?: string;
  items?: SidebarItemType[];
  link?: {
    type: 'doc' | 'generated-index';
    id?: string;
    docId?: string;
    slug?: string;
    description?: string;
  };
  description?: string;
}

export type SidebarItemType =
  | string
  | {
      type: string;
      id?: string;
      docId?: string;
      label?: string;
      href?: string;
      items?: SidebarItemType[];
      link?: any;
      description?: string;
      value?: string;
    };

export interface DocusaurusContext {
  siteDir: string;
  siteConfig: {
    url?: string;
    baseUrl?: string;
    title?: string;
    tagline?: string;
  };
}

export interface DocsVersion {
  docs?: DocMetadata[];
  loadedContent?: {docs?: DocMetadata[]};
  docsSidebars?: Record<string, SidebarItemType[]>;
  sidebars?: Record<string, SidebarItemType[]>;
  loadedVersions?: DocsVersion[];
}

export interface DocMetadata {
  id?: string;
  unversionedId?: string;
  title?: string;
  description?: string;
  permalink?: string;
  source?: string;
  unlisted?: boolean;
  draft?: boolean;
  frontMatter?: {description?: string};
  metadata?: DocMetadata;
}

export const PHRASING_NODE_TYPES = new Set([
  'text',
  'inlineCode',
  'emphasis',
  'strong',
  'delete',
  'break',
  'image',
  'imageReference',
  'link',
  'linkReference',
  'footnoteReference',
]);

export function isMdastNode(value: unknown): value is MdastNode {
  return (
    typeof value === 'object' &&
    value !== null &&
    'type' in value &&
    typeof (value as MdastNode).type === 'string'
  );
}
