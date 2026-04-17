import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://www.harmoniumhalt.com',
  integrations: [
    tailwind(),
    sitemap(),
  ],
  output: 'static',
  build: {
    assets: '_assets',
  },
});
