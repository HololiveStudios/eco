// src/pages/api/reviews/[productId].ts - NOVO
import type { APIRoute } from 'astro';
import { getProductReviewsFromDB, createReviewInDB, getAverageRatingFromDB } from '../../../lib/db/reviews';
import { initDB } from '../../../lib/cloudflare/d1';

export const GET: APIRoute = async ({ params, locals }) => {
  try {
    initDB(locals.runtime.env.DB);
    const reviews = await getProductReviewsFromDB(params.productId!);
    const avgRating = await getAverageRatingFromDB(params.productId!);
    
    return new Response(JSON.stringify({ reviews, avgRating }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to fetch reviews' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

export const POST: APIRoute = async ({ params, request, locals }) => {
  try {
    initDB(locals.runtime.env.DB);
    const data = await request.json();
    const review = await createReviewInDB({
      ...data,
      productId: params.productId!
    });
    
    return new Response(JSON.stringify(review), {
      status: 201,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to create review' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};