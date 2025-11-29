// src/components/admin/Sidebar.tsx
import { useStore } from '@nanostores/solid';
import { currentUser, logout } from '../../lib/auth';

export default function AdminSidebar() {
  const $user = useStore(currentUser);

  const handleLogout = () => {
    logout();
    window.location.href = '/admin/login';
  };

  return (
    <aside class="w-64 bg-secondary text-white min-h-screen fixed left-0 top-0">
      <div class="p-6">
        <h1 class="text-2xl font-bold mb-8">Admin Panel</h1>
        
        <nav class="space-y-2">
          <a href="/admin" class="block px-4 py-3 rounded hover:bg-white/10 transition-colors">
            <span class="flex items-center gap-3">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Dashboard
            </span>
          </a>
          
          <a href="/admin/products" class="block px-4 py-3 rounded hover:bg-white/10 transition-colors">
            <span class="flex items-center gap-3">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
              Produtos
            </span>
          </a>
          
          <a href="/admin/orders" class="block px-4 py-3 rounded hover:bg-white/10 transition-colors">
            <span class="flex items-center gap-3">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              Pedidos
            </span>
          </a>
          
          <a href="/admin/customers" class="block px-4 py-3 rounded hover:bg-white/10 transition-colors">
            <span class="flex items-center gap-3">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              Clientes
            </span>
          </a>
          
          <a href="/admin/categories" class="block px-4 py-3 rounded hover:bg-white/10 transition-colors">
            <span class="flex items-center gap-3">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
              </svg>
              Categorias
            </span>
          </a>
          
          <a href="/admin/settings" class="block px-4 py-3 rounded hover:bg-white/10 transition-colors">
            <span class="flex items-center gap-3">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Configurações
            </span>
          </a>
        </nav>
      </div>

      <div class="absolute bottom-0 left-0 right-0 p-6 border-t border-white/10">
        <div class="mb-4">
          <p class="text-sm text-gray-300">{$user()?.name}</p>
          <p class="text-xs text-gray-400">{$user()?.email}</p>
        </div>
        <button 
          onClick={handleLogout}
          class="w-full bg-white/10 px-4 py-2 rounded hover:bg-white/20 transition-colors text-sm"
        >
          Sair
        </button>
      </div>
    </aside>
  );
}