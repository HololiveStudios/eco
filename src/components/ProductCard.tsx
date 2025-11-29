// src/components/ProductCard.tsx
import type { Product } from '../types';
import { formatPrice } from '../lib/format';
import { addToCart } from '../stores/cart';

interface Props {
  product: Product;
}

export default function ProductCard(props: Props) {
  const handleAddToCart = () => {
    addToCart(props.product.id, props.product.price);
  };

  return (
    <div class="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
      <a href={`/produto/${props.product.slug}`} class="block">
        <div class="aspect-square bg-gray-200 rounded-t-lg overflow-hidden">
          <img src={props.product.images[0]} alt={props.product.name} class="w-full h-full object-cover" />
        </div>
      </a>
      
      <div class="p-4">
        <a href={`/produto/${props.product.slug}`} class="hover:text-primary">
          <h3 class="font-semibold text-lg mb-2">{props.product.name}</h3>
        </a>
        
        <div class="flex items-baseline gap-2 mb-3">
          <span class="text-2xl font-bold text-primary">{formatPrice(props.product.price)}</span>
          {props.product.comparePrice && (
            <span class="text-sm text-gray-500 line-through">{formatPrice(props.product.comparePrice)}</span>
          )}
        </div>

        <button 
          onClick={handleAddToCart}
          class="w-full bg-primary text-white py-2 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
        >
          Adicionar ao Carrinho
        </button>
      </div>
    </div>
  );
}