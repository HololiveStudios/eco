// src/lib/analytics.ts - NOVO (Analytics com Cloudflare Analytics Engine)
export async function trackEvent(
  eventName: string,
  data: Record<string, any>
): Promise<void> {
  try {
    // Enviar para Cloudflare Analytics Engine ou outro serviço
    console.log('Event tracked:', eventName, data);
  } catch (error) {
    console.error('Analytics error:', error);
  }
}

export async function trackPageView(path: string): Promise<void> {
  await trackEvent('page_view', { path });
}

export async function trackProductView(productId: string): Promise<void> {
  await trackEvent('product_view', { productId });
}

export async function trackAddToCart(productId: string, quantity: number): Promise<void> {
  await trackEvent('add_to_cart', { productId, quantity });
}

export async function trackPurchase(orderId: string, total: number): Promise<void> {
  await trackEvent('purchase', { orderId, total });
}