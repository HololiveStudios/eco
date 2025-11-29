// src/lib/db/reviews.ts - NOVO
import { getDB } from '../cloudflare/d1';
import type { Review } from '../../types';

export async function createReviewInDB(review: Omit<Review, 'id'>): Promise<Review> {
  const db = getDB();
  const id = crypto.randomUUID();

  await db
    .prepare(`
      INSERT INTO reviews (id, product_id, customer_name, rating, comment, verified)
      VALUES (?, ?, ?, ?, ?, ?)
    `)
    .bind(
      id,
      review.productId,
      review.customerName,
      review.rating,
      review.comment,
      review.verified ? 1 : 0
    )
    .run();

  return { ...review, id };
}

export async function getProductReviewsFromDB(productId: string): Promise<Review[]> {
  const db = getDB();
  const result = await db
    .prepare('SELECT * FROM reviews WHERE product_id = ? ORDER BY created_at DESC')
    .bind(productId)
    .all();

  return result.results?.map(row => ({
    id: row.id as string,
    productId: row.product_id as string,
    customerName: row.customer_name as string,
    rating: row.rating as number,
    comment: row.comment as string,
    verified: Boolean(row.verified),
    createdAt: row.created_at as string,
  })) || [];
}

export async function getAverageRatingFromDB(productId: string): Promise<number> {
  const db = getDB();
  const result = await db
    .prepare('SELECT AVG(rating) as avg_rating FROM reviews WHERE product_id = ?')
    .bind(productId)
    .first();

  return result?.avg_rating ? Number(result.avg_rating) : 0;
}