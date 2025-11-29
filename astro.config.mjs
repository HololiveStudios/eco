// astro.config.mjs - ATUALIZADO
import { defineConfig } from 'astro/config';
import solidJs from '@astrojs/solid-js';
import cloudflare from '@astrojs/cloudflare';

export default defineConfig({
  output: 'server',
  adapter: cloudflare({
    mode: 'directory',
    functionPerRoute: false
  }),
  integrations: [solidJs()],
  vite: {
    ssr: { noExternal: ['@solidjs/router'] }
  }
});