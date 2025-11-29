// src/pages/api/orders/index.ts
import type { APIRoute } from 'astro';
import { createOrderInDB, getAllOrdersFromDB } from '../../../lib/db/orders';
import { initDB } from '../../../lib/cloudflare/d1';

export const POST: APIRoute = async ({ request, locals }) => {
  try {
    initDB(locals.runtime.env.DB);
    const data = await request.json();
    const order = await createOrderInDB(data);
    
    return new Response(JSON.stringify(order), {
      status: 201,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to create order' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

export const GET: APIRoute = async ({ locals }) => {
  try {
    initDB(locals.runtime.env.DB);
    const orders = await getAllOrdersFromDB();
    
    return new Response(JSON.stringify(orders), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to fetch orders' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};