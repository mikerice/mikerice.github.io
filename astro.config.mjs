import tailwind from '@astrojs/tailwind';
import { defineConfig, passthroughImageService } from 'astro/config';

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import pagefind from 'astro-pagefind';

// https://astro.build/config
export default defineConfig({
  site: 'https://mikerice.github.io',
  base: '/',
  integrations: [tailwind(), sitemap(), mdx(), pagefind()],
  markdown: {
    shikiConfig: {
      theme: 'css-variables',
    },
  },
  image: {
    service: passthroughImageService(),
  },
});
