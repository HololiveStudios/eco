// src/pages/api/payment/card.ts - NOVO
import type { APIRoute } from 'astro';
import { processCreditCardPayment } from '../../../lib/payment';

export const POST: APIRoute = async ({ request }) => {
  try {
    const { cardData, amount, orderId } = await request.json();
    const result = await processCreditCardPayment(cardData, amount, orderId);
    
    return new Response(JSON.stringify(result), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to process card payment' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};