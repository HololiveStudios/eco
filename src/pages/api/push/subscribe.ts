import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request, locals }) => {
  try {
    const subscription = await request.json();
    
    // Salvar subscription no banco de dados
    // Em produção, salvar no D1 ou KV
    console.log('[Push] New subscription:', subscription);
    
    // Aqui você salvaria a subscription associada ao usuário
    // await saveSubscription(subscription);
    
    return new Response(JSON.stringify({ success: true }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to subscribe' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};