// src/pages/api/products/index.ts
import type { APIRoute } from 'astro';
import { getAllProductsFromDB, createProductInDB } from '../../../lib/db/products';
import { initDB } from '../../../lib/cloudflare/d1';

export const GET: APIRoute = async ({ locals }) => {
  try {
    initDB(locals.runtime.env.DB);
    const products = await getAllProductsFromDB();
    
    return new Response(JSON.stringify(products), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to fetch products' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

export const POST: APIRoute = async ({ request, locals }) => {
  try {
    initDB(locals.runtime.env.DB);
    const data = await request.json();
    const product = await createProductInDB(data);
    
    return new Response(JSON.stringify(product), {
      status: 201,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to create product' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};