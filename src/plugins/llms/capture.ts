import * as crypto from 'crypto';
import * as fs from 'fs';
import * as path from 'path';

import type {MdastNode} from './types';

export const CAPTURE_TREE_VERSION = 1;

function hashString(value: string): string {
  return crypto.createHash('sha1').update(value).digest('hex');
}

export function captureDirForSite(siteDir: string): string {
  return path.join(siteDir, '.docusaurus', 'llms-export', 'trees');
}

export function capturedTreePathForSource(
  sourceAbsPath: string,
  siteDir: string,
): string {
  let absolutePath: string;
  try {
    absolutePath = fs.realpathSync(sourceAbsPath);
  } catch {
    absolutePath = path.resolve(sourceAbsPath);
  }
  return path.join(
    captureDirForSite(siteDir),
    `${hashString(absolutePath)}.json`,
  );
}

export function wrapCapturedTree(tree: unknown): {
  version: number;
  tree: unknown;
} {
  return {version: CAPTURE_TREE_VERSION, tree};
}

export function unwrapCapturedTree(payload: unknown): MdastNode | null {
  if (!payload || typeof payload !== 'object') return null;

  const record = payload as Record<string, unknown>;

  // Handle versioned format
  if ('version' in record && 'tree' in record) {
    const version = Number(record.version);
    if (version !== CAPTURE_TREE_VERSION) return null;
    return (record.tree as MdastNode) ?? null;
  }

  // Legacy format support (version 1 only)
  if (CAPTURE_TREE_VERSION === 1) {
    return payload as MdastNode;
  }

  return null;
}
