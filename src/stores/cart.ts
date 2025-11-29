// src/stores/cart.ts
import { atom, map } from 'nanostores';
import { persistentMap } from '@nanostores/persistent';
import type { CartItem } from '../types';

export const cartItems = persistentMap<Record<string, CartItem>>('cart:', {});
export const cartOpen = atom(false);

export function addToCart(productId: string, price: number, quantity = 1) {
  const current = cartItems.get();
  const existing = current[productId];
  
  cartItems.setKey(productId, {
    productId,
    price,
    quantity: existing ? existing.quantity + quantity : quantity
  });
}

export function removeFromCart(productId: string) {
  const current = cartItems.get();
  delete current[productId];
  cartItems.set({ ...current });
}

export function updateQuantity(productId: string, quantity: number) {
  if (quantity <= 0) {
    removeFromCart(productId);
    return;
  }
  cartItems.setKey(productId, { ...cartItems.get()[productId], quantity });
}

export function clearCart() {
  cartItems.set({});
}

export function getCartTotal(): number {
  const items = Object.values(cartItems.get());
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

export function getCartCount(): number {
  const items = Object.values(cartItems.get());
  return items.reduce((sum, item) => sum + item.quantity, 0);
}