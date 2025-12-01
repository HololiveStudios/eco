// src/pages/api/push/send.ts - NOVO
import type { APIRoute } from 'astro';
import webpush from 'web-push';

// Configurar VAPID keys
webpush.setVapidDetails(
  'mailto:your-email@example.com',
  'YOUR_VAPID_PUBLIC_KEY',
  'YOUR_VAPID_PRIVATE_KEY'
);

export const POST: APIRoute = async ({ request }) => {
  try {
    const { subscription, payload } = await request.json();
    
    await webpush.sendNotification(subscription, JSON.stringify(payload));
    
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to send notification' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};