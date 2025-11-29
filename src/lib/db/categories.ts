// src/lib/db/categories.ts
import { getDB } from '../cloudflare/d1';
import type { Category } from '../../types';

export async function getAllCategoriesFromDB(): Promise<Category[]> {
  const db = getDB();
  const result = await db
    .prepare('SELECT * FROM categories ORDER BY name')
    .all();

  return result.results?.map(row => ({
    id: row.id as string,
    name: row.name as string,
    slug: row.slug as string,
    description: row.description as string | undefined,
    image: row.image as string | undefined,
    parentId: row.parent_id as string | undefined,
  })) || [];
}

export async function createCategoryInDB(category: Omit<Category, 'id'>): Promise<Category> {
  const db = getDB();
  const id = crypto.randomUUID();

  await db
    .prepare(`
      INSERT INTO categories (id, name, slug, description, image, parent_id)
      VALUES (?, ?, ?, ?, ?, ?)
    `)
    .bind(
      id,
      category.name,
      category.slug,
      category.description || null,
      category.image || null,
      category.parentId || null
    )
    .run();

  return { ...category, id };
}