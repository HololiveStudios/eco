// src/stores/products.ts
import type { Product } from '../types';

const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Produto Premium 1',
    slug: 'produto-premium-1',
    price: 299.90,
    comparePrice: 399.90,
    images: ['/placeholder-1.jpg'],
    description: 'Descrição detalhada do produto',
    category: 'Categoria A',
    stock: 50,
    featured: true,
    tags: ['novo', 'destaque']
  }
];

export async function getAllProducts(): Promise<Product[]> {
  return PRODUCTS;
}

export async function getProductBySlug(slug: string): Promise<Product | undefined> {
  return PRODUCTS.find(p => p.slug === slug);
}

export async function getProductsByCategory(category: string): Promise<Product[]> {
  return PRODUCTS.filter(p => p.category === category);
}

export async function getFeaturedProducts(): Promise<Product[]> {
  return PRODUCTS.filter(p => p.featured);
}