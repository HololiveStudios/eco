// src/stores/categories.ts - NOVO
import { persistentMap } from '@nanostores/persistent';
import type { Category } from '../types';

export const categories = persistentMap<Record<string, Category>>('categories:', {
  '1': {
    id: '1',
    name: 'Eletrônicos',
    slug: 'eletronicos',
    description: 'Produtos eletrônicos e tecnologia',
    image: '/categories/electronics.jpg'
  },
  '2': {
    id: '2',
    name: 'Moda',
    slug: 'moda',
    description: 'Roupas e acessórios',
    image: '/categories/fashion.jpg'
  },
  '3': {
    id: '3',
    name: 'Casa e Decoração',
    slug: 'casa-decoracao',
    description: 'Itens para sua casa',
    image: '/categories/home.jpg'
  }
});

export function createCategory(category: Omit<Category, 'id'>): Category {
  const id = Date.now().toString();
  const newCategory: Category = { ...category, id };
  categories.setKey(id, newCategory);
  return newCategory;
}

export function updateCategory(id: string, updates: Partial<Category>) {
  const current = categories.get()[id];
  if (current) {
    categories.setKey(id, { ...current, ...updates });
  }
}

export function deleteCategory(id: string) {
  const current = categories.get();
  delete current[id];
  categories.set({ ...current });
}

export function getAllCategories(): Category[] {
  return Object.values(categories.get());
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return Object.values(categories.get()).find(c => c.slug === slug);
}