// src/components/CouponInput.tsx - NOVO
import { createSignal } from 'solid-js';
import { validateCoupon, calculateDiscount } from '../stores/coupons';
import { formatPrice } from '../lib/format';
import type { Coupon } from '../types';

interface Props {
  cartTotal: number;
  onApply: (discount: number) => void;
}

export default function CouponInput(props: Props) {
  const [code, setCode] = createSignal('');
  const [message, setMessage] = createSignal('');
  const [appliedCoupon, setAppliedCoupon] = createSignal<Coupon | null>(null);

  const handleApply = () => {
    const result = validateCoupon(code(), props.cartTotal);
    
    if (result.valid && result.coupon) {
      const discount = calculateDiscount(result.coupon, props.cartTotal);
      setAppliedCoupon(result.coupon);
      setMessage(`Cupom aplicado! Desconto de ${formatPrice(discount)}`);
      props.onApply(discount);
    } else {
      setMessage(result.message);
      setAppliedCoupon(null);
      props.onApply(0);
    }
  };

  return (
    <div class="bg-gray-50 p-4 rounded-lg">
      <label class="block text-sm font-medium mb-2">Cupom de Desconto</label>
      <div class="flex gap-2">
        <input
          type="text"
          value={code()}
          onInput={(e) => setCode(e.currentTarget.value.toUpperCase())}
          placeholder="Digite o cupom"
          class="flex-1 px-4 py-2 border rounded-lg"
          disabled={!!appliedCoupon()}
        />
        {appliedCoupon() ? (
          <button
            onClick={() => {
              setAppliedCoupon(null);
              setCode('');
              setMessage('');
              props.onApply(0);
            }}
            class="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
          >
            Remover
          </button>
        ) : (
          <button
            onClick={handleApply}
            class="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
          >
            Aplicar
          </button>
        )}
      </div>
      {message() && (
        <p class={`text-sm mt-2 ${appliedCoupon() ? 'text-green-600' : 'text-red-600'}`}>
          {message()}
        </p>
      )}
    </div>
  );
}