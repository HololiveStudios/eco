// src/lib/db/coupons.ts - NOVO
import { getDB } from '../cloudflare/d1';
import type { Coupon } from '../../types';

export async function getCouponByCodeFromDB(code: string): Promise<Coupon | null> {
  const db = getDB();
  const row = await db
    .prepare('SELECT * FROM coupons WHERE code = ? AND active = 1')
    .bind(code)
    .first();

  if (!row) return null;

  return {
    id: row.id as string,
    code: row.code as string,
    discount: row.discount as number,
    type: row.type as 'percentage' | 'fixed',
    minValue: row.min_value as number | undefined,
    maxUses: row.max_uses as number | undefined,
    usedCount: row.used_count as number,
    expiresAt: row.expires_at as string | undefined,
    active: Boolean(row.active),
  };
}

export async function incrementCouponUsageInDB(id: string): Promise<void> {
  const db = getDB();
  await db
    .prepare('UPDATE coupons SET used_count = used_count + 1 WHERE id = ?')
    .bind(id)
    .run();
}

export async function createCouponInDB(coupon: Omit<Coupon, 'id' | 'usedCount'>): Promise<Coupon> {
  const db = getDB();
  const id = crypto.randomUUID();

  await db
    .prepare(`
      INSERT INTO coupons (id, code, discount, type, min_value, max_uses, expires_at, active)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `)
    .bind(
      id,
      coupon.code,
      coupon.discount,
      coupon.type,
      coupon.minValue || null,
      coupon.maxUses || null,
      coupon.expiresAt || null,
      coupon.active ? 1 : 0
    )
    .run();

  return { ...coupon, id, usedCount: 0 };
}