// src/components/PWAPrompt.tsx - NOVO (Componente de prompt de instalação)
import { createSignal, Show, onMount } from 'solid-js';
import { pwa } from '../lib/pwa';

export default function PWAPrompt() {
  const [showPrompt, setShowPrompt] = createSignal(false);
  const [showNotificationPrompt, setShowNotificationPrompt] = createSignal(false);

  onMount(() => {
    // Mostrar prompt depois de 30 segundos
    setTimeout(() => {
      if (!window.matchMedia('(display-mode: standalone)').matches) {
        setShowPrompt(true);
      }
    }, 30000);
  });

  const handleInstall = async () => {
    const installed = await pwa.promptInstall();
    if (installed) {
      setShowPrompt(false);
      setTimeout(() => {
        setShowNotificationPrompt(true);
      }, 2000);
    }
  };

  const handleNotificationPermission = async () => {
    const permission = await pwa.requestNotificationPermission();
    if (permission === 'granted') {
      await pwa.subscribeToPushNotifications();
    }
    setShowNotificationPrompt(false);
  };

  return (
    <>
      <Show when={showPrompt()}>
        <div class="fixed inset-0 bg-black/50 z-50 flex items-end md:items-center justify-center p-4">
          <div class="bg-white rounded-t-2xl md:rounded-2xl w-full max-w-md p-6 animate-slide-up">
            <div class="flex items-start gap-4 mb-4">
              <div class="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center shrink-0">
                <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <div class="flex-1">
                <h3 class="text-xl font-bold mb-2">Instale nosso App!</h3>
                <p class="text-gray-600 text-sm">
                  Adicione à tela inicial para acesso rápido e experiência melhorada
                </p>
              </div>
              <button
                onClick={() => setShowPrompt(false)}
                class="text-gray-400 hover:text-gray-600"
              >
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div class="space-y-3 mb-4">
              <div class="flex items-center gap-3 text-sm">
                <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                <span>Acesso offline a páginas visitadas</span>
              </div>
              <div class="flex items-center gap-3 text-sm">
                <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                <span>Notificações de ofertas e promoções</span>
              </div>
              <div class="flex items-center gap-3 text-sm">
                <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                <span>Carregamento mais rápido</span>
              </div>
            </div>

            <div class="flex gap-3">
              <button
                onClick={handleInstall}
                class="flex-1 bg-primary text-white py-3 rounded-lg font-semibold hover:bg-primary/90"
              >
                Instalar Agora
              </button>
              <button
                onClick={() => setShowPrompt(false)}
                class="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200"
              >
                Mais Tarde
              </button>
            </div>
          </div>
        </div>
      </Show>

      <Show when={showNotificationPrompt()}>
        <div class="fixed inset-0 bg-black/50 z-50 flex items-end md:items-center justify-center p-4">
          <div class="bg-white rounded-t-2xl md:rounded-2xl w-full max-w-md p-6 animate-slide-up">
            <div class="text-center mb-6">
              <div class="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg class="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              </div>
              <h3 class="text-xl font-bold mb-2">Ativar Notificações</h3>
              <p class="text-gray-600 text-sm">
                Receba alertas sobre ofertas especiais, atualizações de pedidos e novidades!
              </p>
            </div>

            <div class="flex gap-3">
              <button
                onClick={handleNotificationPermission}
                class="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700"
              >
                Permitir
              </button>
              <button
                onClick={() => setShowNotificationPrompt(false)}
                class="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200"
              >
                Agora Não
              </button>
            </div>
          </div>
        </div>
      </Show>
    </>
  );
}