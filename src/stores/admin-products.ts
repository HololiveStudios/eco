// src/stores/admin-products.ts
import { atom } from 'nanostores';
import { persistentMap } from '@nanostores/persistent';
import type { Product } from '../types';

export const adminProducts = persistentMap<Record<string, Product>>('admin-products:', {});

export function createProduct(product: Omit<Product, 'id'>): Product {
  const id = Date.now().toString();
  const newProduct: Product = { ...product, id };
  adminProducts.setKey(id, newProduct);
  return newProduct;
}

export function updateProduct(id: string, updates: Partial<Product>) {
  const current = adminProducts.get()[id];
  if (current) {
    adminProducts.setKey(id, { ...current, ...updates });
  }
}

export function deleteProduct(id: string) {
  const current = adminProducts.get();
  delete current[id];
  adminProducts.set({ ...current });
}

export function getProduct(id: string): Product | undefined {
  return adminProducts.get()[id];
}

export function getAllAdminProducts(): Product[] {
  return Object.values(adminProducts.get());
}