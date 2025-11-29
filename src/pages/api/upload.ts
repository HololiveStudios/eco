// src/pages/api/upload.ts
import type { APIRoute } from 'astro';
import { uploadImageToCloudflare } from '../../lib/cloudflare/images';

export const POST: APIRoute = async ({ request }) => {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return new Response(JSON.stringify({ error: 'No file provided' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const accountId = import.meta.env.CLOUDFLARE_ACCOUNT_ID;
    const apiToken = import.meta.env.CLOUDFLARE_IMAGES_TOKEN;
    
    const imageUrl = await uploadImageToCloudflare(file, accountId, apiToken);
    
    return new Response(JSON.stringify({ url: imageUrl }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to upload image' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};