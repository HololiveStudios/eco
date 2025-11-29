// src/pages/api/payment/boleto.ts - NOVO
import type { APIRoute } from 'astro';
import { generateBoleto } from '../../../lib/payment';

export const POST: APIRoute = async ({ request }) => {
  try {
    const { amount, orderId } = await request.json();
    const result = await generateBoleto(amount, orderId);
    
    return new Response(JSON.stringify(result), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to generate boleto' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};