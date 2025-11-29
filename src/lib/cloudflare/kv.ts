// src/lib/cloudflare/kv.ts
export interface KVNamespace {
  get(key: string, type?: 'text'): Promise<string | null>;
  get(key: string, type: 'json'): Promise<any | null>;
  get(key: string, type: 'arrayBuffer'): Promise<ArrayBuffer | null>;
  get(key: string, type: 'stream'): Promise<ReadableStream | null>;
  put(key: string, value: string | ArrayBuffer | ReadableStream, options?: KVPutOptions): Promise<void>;
  delete(key: string): Promise<void>;
  list(options?: KVListOptions): Promise<KVListResult>;
}

export interface KVPutOptions {
  expiration?: number;
  expirationTtl?: number;
  metadata?: any;
}

export interface KVListOptions {
  prefix?: string;
  limit?: number;
  cursor?: string;
}

export interface KVListResult {
  keys: { name: string; expiration?: number; metadata?: any }[];
  list_complete: boolean;
  cursor?: string;
}

let kv: KVNamespace | null = null;

export function getKV(): KVNamespace {
  if (!kv) {
    throw new Error('KV not initialized');
  }
  return kv;
}

export function initKV(namespace: KVNamespace) {
  kv = namespace;
}