// src/stores/orders.ts
import { persistentMap } from '@nanostores/persistent';
import type { Order } from '../types';

export const orders = persistentMap<Record<string, Order>>('orders:', {});

export function createOrder(order: Omit<Order, 'id'>): Order {
  const id = `ORD-${Date.now()}`;
  const newOrder: Order = { ...order, id };
  orders.setKey(id, newOrder);
  return newOrder;
}

export function updateOrderStatus(id: string, status: Order['status']) {
  const current = orders.get()[id];
  if (current) {
    orders.setKey(id, { ...current, status });
  }
}

export function getOrder(id: string): Order | undefined {
  return orders.get()[id];
}

export function getAllOrders(): Order[] {
  return Object.values(orders.get());
}

export function getOrdersByStatus(status: Order['status']): Order[] {
  return getAllOrders().filter(order => order.status === status);
}