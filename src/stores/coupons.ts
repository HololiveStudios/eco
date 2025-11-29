// src/stores/coupons.ts - NOVO
import { persistentMap } from '@nanostores/persistent';
import type { Coupon } from '../types';

export const coupons = persistentMap<Record<string, Coupon>>('coupons:', {
  'BEMVINDO10': {
    id: '1',
    code: 'BEMVINDO10',
    discount: 10,
    type: 'percentage',
    minValue: 50,
    maxUses: 100,
    usedCount: 0,
    active: true
  }
});

export function validateCoupon(code: string, cartTotal: number): { valid: boolean; message: string; coupon?: Coupon } {
  const coupon = Object.values(coupons.get()).find(c => c.code === code);
  
  if (!coupon) {
    return { valid: false, message: 'Cupom não encontrado' };
  }
  
  if (!coupon.active) {
    return { valid: false, message: 'Cupom inativo' };
  }
  
  if (coupon.expiresAt && new Date(coupon.expiresAt) < new Date()) {
    return { valid: false, message: 'Cupom expirado' };
  }
  
  if (coupon.maxUses && coupon.usedCount >= coupon.maxUses) {
    return { valid: false, message: 'Cupom esgotado' };
  }
  
  if (coupon.minValue && cartTotal < coupon.minValue) {
    return { valid: false, message: `Valor mínimo de R$ ${coupon.minValue} não atingido` };
  }
  
  return { valid: true, message: 'Cupom válido', coupon };
}

export function applyCoupon(code: string) {
  const coupon = Object.values(coupons.get()).find(c => c.code === code);
  if (coupon) {
    coupons.setKey(coupon.id, { ...coupon, usedCount: coupon.usedCount + 1 });
  }
}

export function calculateDiscount(coupon: Coupon, total: number): number {
  if (coupon.type === 'percentage') {
    return (total * coupon.discount) / 100;
  }
  return coupon.discount;
}