// @ts-check
import { defineConfig } from 'astro/config'
import mdx from '@astrojs/mdx'
import rehypeExternalLinks from 'rehype-external-links'
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://www.toddhgardner.com/',
  // GitHub Pages always wants a trailing slash.
  trailingSlash: "always",
  integrations: [mdx(), sitemap()],
  markdown: {
    rehypePlugins: [
      [
        rehypeExternalLinks,
        {
          target: '_blank',
          rel: 'noopener'
        },
      ],
    ],
  },
  redirects: {
    // Someone is linking to this URL from some big domains, so let's capture that link juice.
    '/r': {
      status: 301,
      destination: '/'
    }
  }
})
