// src/components/ProductReviews.tsx - NOVO
import { For, createSignal, Show } from 'solid-js';
import { getProductReviews, getAverageRating, createReview } from '../stores/reviews';
import type { Review } from '../types';

interface Props {
  productId: string;
}

export default function ProductReviews(props: Props) {
  const [reviews, setReviews] = createSignal(getProductReviews(props.productId));
  const [showForm, setShowForm] = createSignal(false);
  const [rating, setRating] = createSignal(5);
  
  const avgRating = () => getAverageRating(props.productId);

  const handleSubmit = (e: Event) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    
    createReview({
      productId: props.productId,
      customerName: formData.get('name') as string,
      rating: rating(),
      comment: formData.get('comment') as string,
      createdAt: new Date().toISOString(),
      verified: false
    });
    
    setReviews(getProductReviews(props.productId));
    setShowForm(false);
    form.reset();
  };

  return (
    <div class="mt-12">
      <div class="flex items-center justify-between mb-6">
        <div>
          <h2 class="text-2xl font-bold mb-2">Avaliações dos Clientes</h2>
          <div class="flex items-center gap-2">
            <div class="flex">
              <For each={[1, 2, 3, 4, 5]}>
                {(star) => (
                  <svg
                    class={`w-5 h-5 ${star <= Math.round(avgRating()) ? 'text-yellow-400' : 'text-gray-300'}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                )}
              </For>
            </div>
            <span class="text-gray-600">
              {avgRating().toFixed(1)} ({reviews().length} avaliações)
            </span>
          </div>
        </div>
        
        <button
          onClick={() => setShowForm(!showForm())}
          class="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90"
        >
          Escrever Avaliação
        </button>
      </div>

      <Show when={showForm()}>
        <form onSubmit={handleSubmit} class="bg-gray-50 p-6 rounded-lg mb-6">
          <h3 class="font-bold mb-4">Sua Avaliação</h3>
          
          <div class="mb-4">
            <label class="block text-sm font-medium mb-2">Nota</label>
            <div class="flex gap-2">
              <For each={[1, 2, 3, 4, 5]}>
                {(star) => (
                  <button
                    type="button"
                    onClick={() => setRating(star)}
                    class="text-3xl"
                  >
                    <svg
                      class={`w-8 h-8 ${star <= rating() ? 'text-yellow-400' : 'text-gray-300'}`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </button>
                )}
              </For>
            </div>
          </div>

          <div class="mb-4">
            <label class="block text-sm font-medium mb-2">Nome</label>
            <input
              type="text"
              name="name"
              required
              class="w-full px-4 py-2 border rounded-lg"
            />
          </div>

          <div class="mb-4">
            <label class="block text-sm font-medium mb-2">Comentário</label>
            <textarea
              name="comment"
              required
              rows="4"
              class="w-full px-4 py-2 border rounded-lg"
            />
          </div>

          <div class="flex gap-4">
            <button type="submit" class="bg-primary text-white px-6 py-2 rounded-lg">
              Enviar Avaliação
            </button>
            <button
              type="button"
              onClick={() => setShowForm(false)}
              class="bg-gray-200 px-6 py-2 rounded-lg"
            >
              Cancelar
            </button>
          </div>
        </form>
      </Show>

      <div class="space-y-4">
        <For each={reviews()}>
          {(review) => (
            <div class="border-b pb-4">
              <div class="flex items-center gap-2 mb-2">
                <div class="flex">
                  <For each={[1, 2, 3, 4, 5]}>
                    {(star) => (
                      <svg
                        class={`w-4 h-4 ${star <= review.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    )}
                  </For>
                </div>
                <span class="font-semibold">{review.customerName}</span>
                {review.verified && (
                  <span class="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                    Compra Verificada
                  </span>
                )}
              </div>
              <p class="text-gray-700">{review.comment}</p>
              <p class="text-sm text-gray-500 mt-2">
                {new Date(review.createdAt).toLocaleDateString('pt-BR')}
              </p>
            </div>
          )}
        </For>
      </div>
    </div>
  );
}