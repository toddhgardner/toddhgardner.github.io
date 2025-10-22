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
    sitemap({
      filter: (page) =>
        page !== 'https://www.toddhgardner.com/contact',
    })
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
    "/article/[...slug]":     "/blog/[...slug]",    // very old blog format that still gets some clicks
    "/blog/[...slug]/index":  "/blog/[...slug]",    // jekyll-style links. this captures both trailing slash and index
    "/contact/index":         "/contact",
    "/r":                     "/",                  // Someone is linking to this URL

    // convenience helpers
    "/hi":                    "/contact?utm_source=hi",
    "/headshot":              "/headshot.jpg"
  }
})
