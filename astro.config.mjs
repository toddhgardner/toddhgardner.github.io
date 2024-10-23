// @ts-check
import { defineConfig } from 'astro/config'
import mdx from '@astrojs/mdx'
import rehypeExternalLinks from 'rehype-external-links'
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  trailingSlash: "never",
  integrations: [mdx(), sitemap()],
  markdown: {
    rehypePlugins: [
      [
        rehypeExternalLinks,
        {
          target: '_blank',
        },
      ],
    ],
  },
})
