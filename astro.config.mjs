// @ts-check
import { defineConfig } from 'astro/config'
import mdx from '@astrojs/mdx'
import rehypeExternalLinks from 'rehype-external-links'
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://www.toddhgardner.com/',

  trailingSlash: "never",
  build: {
    // setting the format: file builds the site so Github Pages will serve it
    // without trailing slashes.
    format: "file"
  },

  integrations: [
    mdx(),
    sitemap({})
  ],

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
    '/hi': {
      status: 301,
      destination: '/contact?utm_source=hi'
    },
    // Someone is linking to this URL from some big domains, so let's capture that link juice.
    '/r': {
      status: 301,
      destination: '/'
    }
  }
})
