// src/components/admin/ProductForm.tsx
import { createSignal, Show } from 'solid-js';
import type { Product } from '../../types';

interface Props {
  product?: Product;
  onSubmit: (data: Omit<Product, 'id'>) => void;
  onCancel: () => void;
}

export default function ProductForm(props: Props) {
  const [formData, setFormData] = createSignal({
    name: props.product?.name || '',
    slug: props.product?.slug || '',
    price: props.product?.price || 0,
    comparePrice: props.product?.comparePrice || 0,
    images: props.product?.images || [''],
    description: props.product?.description || '',
    category: props.product?.category || '',
    stock: props.product?.stock || 0,
    featured: props.product?.featured || false,
    tags: props.product?.tags?.join(', ') || ''
  });

  const handleSubmit = (e: Event) => {
    e.preventDefault();
    const data = formData();
    
    props.onSubmit({
      name: data.name,
      slug: data.slug,
      price: Number(data.price),
      comparePrice: data.comparePrice ? Number(data.comparePrice) : undefined,
      images: data.images,
      description: data.description,
      category: data.category,
      stock: Number(data.stock),
      featured: data.featured,
      tags: data.tags.split(',').map(t => t.trim()).filter(Boolean)
    });
  };

  return (
    <form onSubmit={handleSubmit} class="space-y-6">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label class="block text-sm font-medium mb-2">Nome do Produto</label>
          <input
            type="text"
            value={formData().name}
            onInput={(e) => setFormData({ ...formData(), name: e.currentTarget.value })}
            required
            class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary"
          />
        </div>

        <div>
          <label class="block text-sm font-medium mb-2">Slug (URL)</label>
          <input
            type="text"
            value={formData().slug}
            onInput={(e) => setFormData({ ...formData(), slug: e.currentTarget.value })}
            required
            class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary"
          />
        </div>

        <div>
          <label class="block text-sm font-medium mb-2">Preço</label>
          <input
            type="number"
            step="0.01"
            value={formData().price}
            onInput={(e) => setFormData({ ...formData(), price: Number(e.currentTarget.value) })}
            required
            class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary"
          />
        </div>

        <div>
          <label class="block text-sm font-medium mb-2">Preço Comparação</label>
          <input
            type="number"
            step="0.01"
            value={formData().comparePrice}
            onInput={(e) => setFormData({ ...formData(), comparePrice: Number(e.currentTarget.value) })}
            class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary"
          />
        </div>

        <div>
          <label class="block text-sm font-medium mb-2">Categoria</label>
          <input
            type="text"
            value={formData().category}
            onInput={(e) => setFormData({ ...formData(), category: e.currentTarget.value })}
            required
            class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary"
          />
        </div>

        <div>
          <label class="block text-sm font-medium mb-2">Estoque</label>
          <input
            type="number"
            value={formData().stock}
            onInput={(e) => setFormData({ ...formData(), stock: Number(e.currentTarget.value) })}
            required
            class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary"
          />
        </div>
      </div>

      <div>
        <label class="block text-sm font-medium mb-2">Descrição</label>
        <textarea
          value={formData().description}
          onInput={(e) => setFormData({ ...formData(), description: e.currentTarget.value })}
          required
          rows="4"
          class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary"
        />
      </div>

      <div>
        <label class="block text-sm font-medium mb-2">URL da Imagem</label>
        <input
          type="text"
          value={formData().images[0]}
          onInput={(e) => setFormData({ ...formData(), images: [e.currentTarget.value] })}
          required
          class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary"
        />
      </div>

      <div>
        <label class="block text-sm font-medium mb-2">Tags (separadas por vírgula)</label>
        <input
          type="text"
          value={formData().tags}
          onInput={(e) => setFormData({ ...formData(), tags: e.currentTarget.value })}
          class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary"
        />
      </div>

      <div>
        <label class="flex items-center gap-2">
          <input
            type="checkbox"
            checked={formData().featured}
            onChange={(e) => setFormData({ ...formData(), featured: e.currentTarget.checked })}
            class="rounded"
          />
          <span class="text-sm font-medium">Produto em Destaque</span>
        </label>
      </div>

      <div class="flex gap-4">
        <button
          type="submit"
          class="px-6 py-2 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90"
        >
          {props.product ? 'Atualizar' : 'Criar'} Produto
        </button>
        <button
          type="button"
          onClick={props.onCancel}
          class="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}