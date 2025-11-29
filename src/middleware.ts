// src/middleware.ts - NOVO (Middleware para inicializar recursos Cloudflare)
import { defineMiddleware } from 'astro:middleware';
import { initDB } from './lib/cloudflare/d1';
import { initKV } from './lib/cloudflare/kv';
import { initR2 } from './lib/cloudflare/r2';

export const onRequest = defineMiddleware(async ({ locals }, next) => {
  if (locals.runtime?.env) {
    if (locals.runtime.env.DB) {
      initDB(locals.runtime.env.DB);
    }
    if (locals.runtime.env.KV) {
      initKV(locals.runtime.env.KV);
    }
    if (locals.runtime.env.IMAGES) {
      initR2(locals.runtime.env.IMAGES);
    }
  }
  
  return next();
});