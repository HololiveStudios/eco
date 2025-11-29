// src/env.d.ts
/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly CLOUDFLARE_ACCOUNT_ID: string;
  readonly CLOUDFLARE_API_TOKEN: string;
  readonly CLOUDFLARE_IMAGES_TOKEN: string;
  readonly CLOUDFLARE_D1_DATABASE_ID: string;
  readonly CLOUDFLARE_KV_NAMESPACE_ID: string;
  readonly CLOUDFLARE_R2_BUCKET: string;
  readonly DATABASE_URL: string;
  readonly WHATSAPP_PHONE: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}