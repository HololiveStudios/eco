// src/pages/api/shipping/calculate.ts - NOVO
import type { APIRoute } from 'astro';
import { calculateShipping } from '../../../lib/shipping';

export const POST: APIRoute = async ({ request }) => {
  try {
    const { zipCode, weight } = await request.json();
    
    if (!zipCode || !weight) {
      return new Response(JSON.stringify({ error: 'Missing zipCode or weight' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    const shipping = await calculateShipping(zipCode, weight);
    
    return new Response(JSON.stringify(shipping), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to calculate shipping' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};