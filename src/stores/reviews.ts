// src/stores/reviews.ts - NOVO
import { persistentMap } from '@nanostores/persistent';
import type { Review } from '../types';

export const reviews = persistentMap<Record<string, Review>>('reviews:', {});

export function createReview(review: Omit<Review, 'id'>): Review {
  const id = Date.now().toString();
  const newReview: Review = { ...review, id };
  reviews.setKey(id, newReview);
  return newReview;
}

export function getProductReviews(productId: string): Review[] {
  return Object.values(reviews.get()).filter(r => r.productId === productId);
}

export function getAverageRating(productId: string): number {
  const productReviews = getProductReviews(productId);
  if (productReviews.length === 0) return 0;
  
  const sum = productReviews.reduce((acc, r) => acc + r.rating, 0);
  return sum / productReviews.length;
}