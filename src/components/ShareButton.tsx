// src/components/ShareButton.tsx - NOVO (Compartilhamento nativo)
import { createSignal, Show } from 'solid-js';

interface Props {
  title: string;
  text: string;
  url: string;
}

export default function ShareButton(props: Props) {
  const [showFallback, setShowFallback] = createSignal(false);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: props.title,
          text: props.text,
          url: props.url
        });
      } catch (error) {
        console.log('Share cancelled or failed:', error);
      }
    } else {
      setShowFallback(true);
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(props.url);
      alert('Link copiado!');
      setShowFallback(false);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  return (
    <>
      <button
        onClick={handleShare}
        class="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
        </svg>
        Compartilhar
      </button>

      <Show when={showFallback()}>
        <div class="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div class="bg-white rounded-lg p-6 max-w-sm w-full">
            <h3 class="font-bold text-lg mb-4">Compartilhar</h3>
            <div class="space-y-3">
              <button
                onClick={copyToClipboard}
                class="w-full flex items-center gap-3 px-4 py-3 bg-gray-100 rounded-lg hover:bg-gray-200"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                </svg>
                Copiar Link
              </button>
              <button
                onClick={() => setShowFallback(false)}
                class="w-full px-4 py-3 bg-gray-200 rounded-lg hover:bg-gray-300"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      </Show>
    </>
  );
}
