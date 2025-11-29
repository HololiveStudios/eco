// src/components/ProductGrid.tsx
import { For } from 'solid-js';
import ProductCard from './ProductCard';
import type { Product } from '../types';

interface Props {
  products: Product[];
}

export default function ProductGrid(props: Props) {
  return (
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      <For each={props.products}>
        {(product) => <ProductCard product={product} />}
      </For>
    </div>
  );
}