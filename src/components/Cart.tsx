// src/components/Cart.tsx
import { Show, For } from 'solid-js';
import { useStore } from '@nanostores/solid';
import { cartItems, cartOpen, updateQuantity, removeFromCart, getCartTotal } from '../stores/cart';
import { formatPrice } from '../lib/format';

export default function Cart() {
  const $cartOpen = useStore(cartOpen);
  const $items = useStore(cartItems);
  
  const items = () => Object.values($items());
  const total = () => getCartTotal();

  return (
    <Show when={$cartOpen()}>
      <div class="fixed inset-0 z-50 overflow-hidden">
        <div class="absolute inset-0 bg-black/50" onClick={() => cartOpen.set(false)} />
        
        <div class="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl flex flex-col">
          <div class="flex items-center justify-between p-4 border-b">
            <h2 class="text-xl font-bold">Carrinho</h2>
            <button onClick={() => cartOpen.set(false)} class="p-2 hover:bg-gray-100 rounded">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div class="flex-1 overflow-auto p-4">
            <Show when={items().length > 0} fallback={<p class="text-center text-gray-500 py-8">Carrinho vazio</p>}>
              <For each={items()}>
                {(item) => (
                  <div class="flex gap-4 py-4 border-b">
                    <div class="w-20 h-20 bg-gray-200 rounded" />
                    <div class="flex-1">
                      <h3 class="font-semibold">Produto {item.productId}</h3>
                      <p class="text-sm text-gray-600">{formatPrice(item.price)}</p>
                      <div class="flex items-center gap-2 mt-2">
                        <button 
                          onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                          class="px-2 py-1 bg-gray-200 rounded"
                        >-</button>
                        <span>{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                          class="px-2 py-1 bg-gray-200 rounded"
                        >+</button>
                        <button 
                          onClick={() => removeFromCart(item.productId)}
                          class="ml-auto text-red-500 text-sm"
                        >Remover</button>
                      </div>
                    </div>
                  </div>
                )}
              </For>
            </Show>
          </div>

          <div class="border-t p-4">
            <div class="flex justify-between mb-4">
              <span class="font-bold">Total:</span>
              <span class="font-bold text-xl">{formatPrice(total())}</span>
            </div>
            <a href="/checkout" class="block w-full bg-primary text-white text-center py-3 rounded-lg font-semibold hover:bg-primary/90">
              Finalizar Compra
            </a>
          </div>
        </div>
      </div>
    </Show>
  );
}