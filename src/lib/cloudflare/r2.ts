// src/lib/cloudflare/r2.ts
export interface R2Bucket {
  head(key: string): Promise<R2Object | null>;
  get(key: string): Promise<R2ObjectBody | null>;
  put(key: string, value: ArrayBuffer | ReadableStream | string, options?: R2PutOptions): Promise<R2Object>;
  delete(key: string): Promise<void>;
  list(options?: R2ListOptions): Promise<R2Objects>;
}

export interface R2Object {
  key: string;
  version: string;
  size: number;
  etag: string;
  httpEtag: string;
  uploaded: Date;
  httpMetadata?: R2HTTPMetadata;
  customMetadata?: Record<string, string>;
}

export interface R2ObjectBody extends R2Object {
  body: ReadableStream;
  bodyUsed: boolean;
  arrayBuffer(): Promise<ArrayBuffer>;
  text(): Promise<string>;
  json(): Promise<any>;
  blob(): Promise<Blob>;
}

export interface R2PutOptions {
  httpMetadata?: R2HTTPMetadata;
  customMetadata?: Record<string, string>;
}

export interface R2HTTPMetadata {
  contentType?: string;
  contentLanguage?: string;
  contentDisposition?: string;
  contentEncoding?: string;
  cacheControl?: string;
}

export interface R2ListOptions {
  prefix?: string;
  delimiter?: string;
  cursor?: string;
  limit?: number;
}

export interface R2Objects {
  objects: R2Object[];
  truncated: boolean;
  cursor?: string;
  delimitedPrefixes: string[];
}

let r2: R2Bucket | null = null;

export function getR2(): R2Bucket {
  if (!r2) {
    throw new Error('R2 not initialized');
  }
  return r2;
}

export function initR2(bucket: R2Bucket) {
  r2 = bucket;
}