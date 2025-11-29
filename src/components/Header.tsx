// src/components/Header.tsx
import { createSignal } from 'solid-js';
import { useStore } from '@nanostores/solid';
import { cartOpen, getCartCount } from '../stores/cart';

export default function Header() {
  const [menuOpen, setMenuOpen] = createSignal(false);
  
  return (
    <header class="sticky top-0 z-50 bg-white shadow-sm">
      <div class="container mx-auto px-4">
        <div class="flex items-center justify-between h-16">
          <a href="/" class="text-2xl font-bold text-primary">Logo</a>
          
          <nav class="hidden md:flex gap-6">
            <a href="/" class="hover:text-primary">Início</a>
            <a href="/produtos" class="hover:text-primary">Produtos</a>
            <a href="/categorias" class="hover:text-primary">Categorias</a>
            <a href="/contato" class="hover:text-primary">Contato</a>
          </nav>

          <div class="flex items-center gap-4">
            <button class="hover:text-primary">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
            
            <button onClick={() => cartOpen.set(true)} class="relative hover:text-primary">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              <CartBadge />
            </button>

            <button onClick={() => setMenuOpen(!menuOpen())} class="md:hidden">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {menuOpen() && (
        <nav class="md:hidden border-t bg-white">
          <a href="/" class="block px-4 py-3 hover:bg-gray-50">Início</a>
          <a href="/produtos" class="block px-4 py-3 hover:bg-gray-50">Produtos</a>
          <a href="/categorias" class="block px-4 py-3 hover:bg-gray-50">Categorias</a>
          <a href="/contato" class="block px-4 py-3 hover:bg-gray-50">Contato</a>
        </nav>
      )}
    </header>
  );
}

function CartBadge() {
  const count = () => getCartCount();
  
  return (
    <>
      {count() > 0 && (
        <span class="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
          {count()}
        </span>
      )}
    </>
  );
}