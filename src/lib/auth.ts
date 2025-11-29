// src/lib/auth.ts
import { atom } from 'nanostores';
import { persistentAtom } from '@nanostores/persistent';

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'user';
}

export const currentUser = persistentAtom<User | null>('user', null, {
  encode: JSON.stringify,
  decode: JSON.parse
});

export const isAuthenticated = atom(false);

export function login(email: string, password: string): boolean {
  if (email === 'admin@admin.com' && password === 'admin123') {
    const user: User = {
      id: '1',
      email,
      name: 'Administrador',
      role: 'admin'
    };
    currentUser.set(user);
    isAuthenticated.set(true);
    return true;
  }
  return false;
}

export function logout() {
  currentUser.set(null);
  isAuthenticated.set(false);
}

export function isAdmin(): boolean {
  const user = currentUser.get();
  return user?.role === 'admin';
}