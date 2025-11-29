// src/lib/db/orders.ts
import { getDB } from '../cloudflare/d1';
import type { Order } from '../../types';

export async function createOrderInDB(order: Omit<Order, 'id'>): Promise<Order> {
  const db = getDB();
  const id = `ORD-${Date.now()}`;

  await db
    .prepare(`
      INSERT INTO orders (
        id, customer_name, customer_email, customer_phone, customer_cpf,
        address_street, address_number, address_complement, address_district,
        address_city, address_state, address_zipcode, items, total,
        status, payment_method
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `)
    .bind(
      id,
      order.customer.name,
      order.customer.email,
      order.customer.phone,
      order.customer.cpf || null,
      order.customer.address.street,
      order.customer.address.number,
      order.customer.address.complement || null,
      order.customer.address.district,
      order.customer.address.city,
      order.customer.address.state,
      order.customer.address.zipCode,
      JSON.stringify(order.items),
      order.total,
      order.status,
      order.payment?.method || null
    )
    .run();

  return { ...order, id };
}

export async function getAllOrdersFromDB(): Promise<Order[]> {
  const db = getDB();
  const result = await db
    .prepare('SELECT * FROM orders ORDER BY created_at DESC')
    .all();

  return result.results?.map(row => ({
    id: row.id as string,
    items: JSON.parse(row.items as string),
    total: row.total as number,
    status: row.status as Order['status'],
    createdAt: row.created_at as string,
    customer: {
      name: row.customer_name as string,
      email: row.customer_email as string,
      phone: row.customer_phone as string,
      cpf: row.customer_cpf as string | undefined,
      address: {
        street: row.address_street as string,
        number: row.address_number as string,
        complement: row.address_complement as string | undefined,
        district: row.address_district as string,
        city: row.address_city as string,
        state: row.address_state as string,
        zipCode: row.address_zipcode as string,
      },
    },
    payment: row.payment_method ? {
      method: row.payment_method as any,
      status: row.payment_status as any,
    } : undefined,
  })) || [];
}

export async function getOrderByIdFromDB(id: string): Promise<Order | null> {
  const db = getDB();
  const row = await db
    .prepare('SELECT * FROM orders WHERE id = ?')
    .bind(id)
    .first();

  if (!row) return null;

  return {
    id: row.id as string,
    items: JSON.parse(row.items as string),
    total: row.total as number,
    status: row.status as Order['status'],
    createdAt: row.created_at as string,
    customer: {
      name: row.customer_name as string,
      email: row.customer_email as string,
      phone: row.customer_phone as string,
      cpf: row.customer_cpf as string | undefined,
      address: {
        street: row.address_street as string,
        number: row.address_number as string,
        complement: row.address_complement as string | undefined,
        district: row.address_district as string,
        city: row.address_city as string,
        state: row.address_state as string,
        zipCode: row.address_zipcode as string,
      },
    },
  };
}

export async function updateOrderStatusInDB(id: string, status: Order['status']): Promise<void> {
  const db = getDB();
  await db
    .prepare('UPDATE orders SET status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?')
    .bind(status, id)
    .run();
}