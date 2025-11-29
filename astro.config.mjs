// astro.config.mjs - CORRIGIDO
import { defineConfig } from 'astro/config';
import solidJs from '@astrojs/solid-js';
import cloudflare from '@astrojs/cloudflare';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  output: 'server',
  adapter: cloudflare({
    mode: 'directory',
    functionPerRoute: false,
    imageService: 'cloudflare'
  }),
  integrations: [solidJs()],
  vite: {
    plugins: [tailwindcss()],
    ssr: { 
      noExternal: ['@solidjs/router'],
      external: ['node:async_hooks']
    },
    build: {
      cssCodeSplit: false
    }
  }
});