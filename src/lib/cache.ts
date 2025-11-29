// src/lib/cache.ts - NOVO (Cache com KV)
import { getKV } from './cloudflare/kv';

export async function getCached<T>(key: string): Promise<T | null> {
  try {
    const kv = getKV();
    const data = await kv.get(key, 'json');
    return data as T | null;
  } catch {
    return null;
  }
}

export async function setCached<T>(key: string, value: T, ttl: number = 3600): Promise<void> {
  try {
    const kv = getKV();
    await kv.put(key, JSON.stringify(value), { expirationTtl: ttl });
  } catch (error) {
    console.error('Cache error:', error);
  }
}

export async function deleteCached(key: string): Promise<void> {
  try {
    const kv = getKV();
    await kv.delete(key);
  } catch (error) {
    console.error('Cache delete error:', error);
  }
}

export async function invalidatePattern(pattern: string): Promise<void> {
  try {
    const kv = getKV();
    const list = await kv.list({ prefix: pattern });
    
    for (const key of list.keys) {
      await kv.delete(key.name);
    }
  } catch (error) {
    console.error('Cache invalidation error:', error);
  }
}