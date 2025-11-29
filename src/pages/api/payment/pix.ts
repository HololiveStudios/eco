// src/pages/api/payment/pix.ts - NOVO
import type { APIRoute } from 'astro';
import { processPixPayment } from '../../../lib/payment';

export const POST: APIRoute = async ({ request }) => {
  try {
    const { amount, orderId } = await request.json();
    const result = await processPixPayment(amount, orderId);
    
    return new Response(JSON.stringify(result), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to process PIX payment' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};