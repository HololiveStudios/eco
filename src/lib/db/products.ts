// src/lib/db/products.ts
import { getDB } from '../cloudflare/d1';
import type { Product } from '../../types';

export async function getAllProductsFromDB(): Promise<Product[]> {
  const db = getDB();
  const result = await db
    .prepare('SELECT * FROM products ORDER BY created_at DESC')
    .all();

  return result.results?.map(row => ({
    id: row.id as string,
    name: row.name as string,
    slug: row.slug as string,
    price: row.price as number,
    comparePrice: row.compare_price as number | undefined,
    images: JSON.parse(row.images as string),
    description: row.description as string,
    category: row.category as string,
    stock: row.stock as number,
    featured: Boolean(row.featured),
    tags: JSON.parse(row.tags as string),
    sku: row.sku as string | undefined,
    weight: row.weight as number | undefined,
  })) || [];
}

export async function getProductBySlugFromDB(slug: string): Promise<Product | null> {
  const db = getDB();
  const result = await db
    .prepare('SELECT * FROM products WHERE slug = ?')
    .bind(slug)
    .first();

  if (!result) return null;

  return {
    id: result.id as string,
    name: result.name as string,
    slug: result.slug as string,
    price: result.price as number,
    comparePrice: result.compare_price as number | undefined,
    images: JSON.parse(result.images as string),
    description: result.description as string,
    category: result.category as string,
    stock: result.stock as number,
    featured: Boolean(result.featured),
    tags: JSON.parse(result.tags as string),
    sku: result.sku as string | undefined,
    weight: result.weight as number | undefined,
  };
}

export async function createProductInDB(product: Omit<Product, 'id'>): Promise<Product> {
  const db = getDB();
  const id = crypto.randomUUID();

  await db
    .prepare(`
      INSERT INTO products (
        id, name, slug, price, compare_price, description, category,
        stock, featured, tags, sku, weight, images
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `)
    .bind(
      id,
      product.name,
      product.slug,
      product.price,
      product.comparePrice || null,
      product.description,
      product.category,
      product.stock,
      product.featured ? 1 : 0,
      JSON.stringify(product.tags),
      product.sku || null,
      product.weight || null,
      JSON.stringify(product.images)
    )
    .run();

  return { ...product, id };
}

export async function updateProductInDB(id: string, updates: Partial<Product>): Promise<void> {
  const db = getDB();
  const fields: string[] = [];
  const values: any[] = [];

  if (updates.name !== undefined) {
    fields.push('name = ?');
    values.push(updates.name);
  }
  if (updates.slug !== undefined) {
    fields.push('slug = ?');
    values.push(updates.slug);
  }
  if (updates.price !== undefined) {
    fields.push('price = ?');
    values.push(updates.price);
  }
  if (updates.comparePrice !== undefined) {
    fields.push('compare_price = ?');
    values.push(updates.comparePrice);
  }
  if (updates.description !== undefined) {
    fields.push('description = ?');
    values.push(updates.description);
  }
  if (updates.category !== undefined) {
    fields.push('category = ?');
    values.push(updates.category);
  }
  if (updates.stock !== undefined) {
    fields.push('stock = ?');
    values.push(updates.stock);
  }
  if (updates.featured !== undefined) {
    fields.push('featured = ?');
    values.push(updates.featured ? 1 : 0);
  }
  if (updates.tags !== undefined) {
    fields.push('tags = ?');
    values.push(JSON.stringify(updates.tags));
  }
  if (updates.images !== undefined) {
    fields.push('images = ?');
    values.push(JSON.stringify(updates.images));
  }

  fields.push('updated_at = CURRENT_TIMESTAMP');
  values.push(id);

  await db
    .prepare(`UPDATE products SET ${fields.join(', ')} WHERE id = ?`)
    .bind(...values)
    .run();
}

export async function deleteProductFromDB(id: string): Promise<void> {
  const db = getDB();
  await db.prepare('DELETE FROM products WHERE id = ?').bind(id).run();
}

export async function getProductsByCategoryFromDB(category: string): Promise<Product[]> {
  const db = getDB();
  const result = await db
    .prepare('SELECT * FROM products WHERE category = ? ORDER BY created_at DESC')
    .bind(category)
    .all();

  return result.results?.map(row => ({
    id: row.id as string,
    name: row.name as string,
    slug: row.slug as string,
    price: row.price as number,
    comparePrice: row.compare_price as number | undefined,
    images: JSON.parse(row.images as string),
    description: row.description as string,
    category: row.category as string,
    stock: row.stock as number,
    featured: Boolean(row.featured),
    tags: JSON.parse(row.tags as string),
  })) || [];
}

export async function getFeaturedProductsFromDB(): Promise<Product[]> {
  const db = getDB();
  const result = await db
    .prepare('SELECT * FROM products WHERE featured = 1 ORDER BY created_at DESC LIMIT 8')
    .all();

  return result.results?.map(row => ({
    id: row.id as string,
    name: row.name as string,
    slug: row.slug as string,
    price: row.price as number,
    comparePrice: row.compare_price as number | undefined,
    images: JSON.parse(row.images as string),
    description: row.description as string,
    category: row.category as string,
    stock: row.stock as number,
    featured: Boolean(row.featured),
    tags: JSON.parse(row.tags as string),
  })) || [];
}