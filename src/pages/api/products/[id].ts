// src/pages/api/products/[id].ts - NOVO
import type { APIRoute } from 'astro';
import { getProductBySlugFromDB, updateProductInDB, deleteProductFromDB } from '../../../lib/db/products';
import { initDB } from '../../../lib/cloudflare/d1';
import { deleteCached, invalidatePattern } from '../../../lib/cache';

export const GET: APIRoute = async ({ params, locals }) => {
  try {
    initDB(locals.runtime.env.DB);
    const product = await getProductBySlugFromDB(params.id!);
    
    if (!product) {
      return new Response(JSON.stringify({ error: 'Product not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    return new Response(JSON.stringify(product), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to fetch product' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

export const PUT: APIRoute = async ({ params, request, locals }) => {
  try {
    initDB(locals.runtime.env.DB);
    const data = await request.json();
    await updateProductInDB(params.id!, data);
    await invalidatePattern('products:');
    
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to update product' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

export const DELETE: APIRoute = async ({ params, locals }) => {
  try {
    initDB(locals.runtime.env.DB);
    await deleteProductFromDB(params.id!);
    await invalidatePattern('products:');
    
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to delete product' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};