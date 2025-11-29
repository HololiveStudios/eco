// src/components/PWAPrompt.tsx - NOVO (Componente de prompt iOS)
import { createSignal, Show, onMount } from 'solid-js';

export default function PWAPrompt() {
  const [show, setShow] = createSignal(false);
  const [isIOS, setIsIOS] = createSignal(false);
  const [isStandalone, setIsStandalone] = createSignal(false);

  onMount(() => {
    const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    const standalone = window.matchMedia('(display-mode: standalone)').matches;
    
    setIsIOS(iOS);
    setIsStandalone(standalone);
    
    // Mostrar prompt apenas no iOS não instalado
    if (iOS && !standalone) {
      const dismissed = localStorage.getItem('pwa-prompt-dismissed');
      if (!dismissed) {
        setTimeout(() => setShow(true), 3000);
      }
    }
  });

  const dismiss = () => {
    setShow(false);
    localStorage.setItem('pwa-prompt-dismissed', 'true');
  };

  return (
    <Show when={show() && isIOS() && !isStandalone()}>
      <div class="fixed inset-0 bg-black/50 z-50 flex items-end">
        <div class="bg-white w-full rounded-t-3xl p-6 animate-slide-up">
          <button
            onClick={dismiss}
            class="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div class="text-center mb-6">
            <div class="w-16 h-16 bg-primary/10 rounded-2xl mx-auto mb-4 flex items-center justify-center">
              <svg class="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </div>
            <h2 class="text-2xl font-bold mb-2">Instale o App</h2>
            <p class="text-gray-600">
              Adicione à tela inicial para acesso rápido e melhor experiência!
            </p>
          </div>

          <div class="space-y-4">
            <div class="flex items-start gap-4">
              <div class="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span class="text-blue-600 font-bold">1</span>
              </div>
              <div class="flex-1">
                <p class="text-gray-700">
                  Toque no botão de compartilhar 
                  <svg class="inline w-5 h-5 mx-1" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
                  </svg>
                </p>
              </div>
            </div>

            <div class="flex items-start gap-4">
              <div class="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span class="text-blue-600 font-bold">2</span>
              </div>
              <div class="flex-1">
                <p class="text-gray-700">
                  Selecione "Adicionar à Tela de Início"
                  <svg class="inline w-5 h-5 mx-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </p>
              </div>
            </div>

            <div class="flex items-start gap-4">
              <div class="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span class="text-blue-600 font-bold">3</span>
              </div>
              <div class="flex-1">
                <p class="text-gray-700">Toque em "Adicionar" e pronto!</p>
              </div>
            </div>
          </div>

          <button
            onClick={dismiss}
            class="w-full bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold mt-6 hover:bg-gray-300"
          >
            Agora Não
          </button>
        </div>
      </div>
    </Show>
  );
}