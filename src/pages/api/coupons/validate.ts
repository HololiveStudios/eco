// src/pages/api/coupons/validate.ts - NOVO
import type { APIRoute } from 'astro';
import { getCouponByCodeFromDB, incrementCouponUsageInDB } from '../../../lib/db/coupons';
import { initDB } from '../../../lib/cloudflare/d1';

export const POST: APIRoute = async ({ request, locals }) => {
  try {
    initDB(locals.runtime.env.DB);
    const { code, cartTotal } = await request.json();
    
    const coupon = await getCouponByCodeFromDB(code);
    
    if (!coupon) {
      return new Response(JSON.stringify({ valid: false, message: 'Cupom não encontrado' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    if (coupon.expiresAt && new Date(coupon.expiresAt) < new Date()) {
      return new Response(JSON.stringify({ valid: false, message: 'Cupom expirado' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    if (coupon.maxUses && coupon.usedCount >= coupon.maxUses) {
      return new Response(JSON.stringify({ valid: false, message: 'Cupom esgotado' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    if (coupon.minValue && cartTotal < coupon.minValue) {
      return new Response(JSON.stringify({ 
        valid: false, 
        message: `Valor mínimo de R$ ${coupon.minValue} não atingido` 
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    const discount = coupon.type === 'percentage' 
      ? (cartTotal * coupon.discount) / 100 
      : coupon.discount;
    
    return new Response(JSON.stringify({ 
      valid: true, 
      coupon,
      discount,
      message: 'Cupom válido' 
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to validate coupon' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};