// src/stores/wishlist.ts - NOVO
import { persistentMap } from '@nanostores/persistent';

export const wishlist = persistentMap<Record<string, boolean>>('wishlist:', {});

export function addToWishlist(productId: string) {
  wishlist.setKey(productId, true);
}

export function removeFromWishlist(productId: string) {
  const current = wishlist.get();
  delete current[productId];
  wishlist.set({ ...current });
}

export function isInWishlist(productId: string): boolean {
  return !!wishlist.get()[productId];
}

export function getWishlistItems(): string[] {
  return Object.keys(wishlist.get());
}