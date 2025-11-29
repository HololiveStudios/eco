// src/types/index.ts - ATUALIZADO COM NOVOS TIPOS
export interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  comparePrice?: number;
  images: string[];
  description: string;
  category: string;
  stock: number;
  featured: boolean;
  tags: string[];
  sku?: string;
  weight?: number;
  dimensions?: {
    width: number;
    height: number;
    length: number;
  };
}

export interface CartItem {
  productId: string;
  quantity: number;
  price: number;
  name?: string;
  image?: string;
}

export interface Cart {
  items: CartItem[];
  total: number;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'paid' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: string;
  customer: Customer;
  payment?: {
    method: 'pix' | 'card' | 'boleto';
    status: 'pending' | 'approved' | 'rejected';
  };
  shipping?: {
    trackingCode?: string;
    carrier?: string;
    estimatedDelivery?: string;
  };
}

export interface Customer {
  name: string;
  email: string;
  phone: string;
  address: Address;
  cpf?: string;
}

export interface Address {
  street: string;
  number: string;
  complement?: string;
  district: string;
  city: string;
  state: string;
  zipCode: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  parentId?: string;
}

export interface Review {
  id: string;
  productId: string;
  customerName: string;
  rating: number;
  comment: string;
  createdAt: string;
  verified: boolean;
}

export interface Coupon {
  id: string;
  code: string;
  discount: number;
  type: 'percentage' | 'fixed';
  minValue?: number;
  maxUses?: number;
  usedCount: number;
  expiresAt?: string;
  active: boolean;
}