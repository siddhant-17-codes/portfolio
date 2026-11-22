// @ts-check
import { defineConfig } from 'astro/config';

// `site` is the public URL. Change it here when the domain changes;
// canonical links, Open Graph tags and the sitemap-free robots.txt read from it.
export default defineConfig({
  site: 'https://siddhantthakur.pages.dev',
  output: 'static',
  trailingSlash: 'ignore',
  build: { inlineStylesheets: 'always', format: 'file' },
  compressHTML: true,
  devToolbar: { enabled: false },
});
