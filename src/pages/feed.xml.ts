import rss from "@astrojs/rss";
import type { APIContext } from "astro";
import { getCollection } from "astro:content";
import { SITE_TITLE, SITE_DESCRIPTION, AUTHOR_NAME } from "~/consts";

export async function GET(context: APIContext) {
  const posts = (await getCollection("blog"))
    .sort((a, b) => b.data.publishedOn.valueOf() - a.data.publishedOn.valueOf());

  return await rss({
    xmlns: {
      atom: "http://www.w3.org/2005/Atom"
    },
    trailingSlash: false,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    site: context.site as URL,
    customData: `<atom:link href="${context.site}feed.xml" rel="self" type="application/rss+xml" />`,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      link: `/blog/${post.slug}`,
      guid: `/blog/${post.slug}`,
      author: AUTHOR_NAME,
      pubDate: post.data.publishedOn,
      categories: post.data.tags,

      /**
       * NOTE: Content rendering does not work correctly without a lot of manual
       * work, so I'm not doing it right now. The documented way does not update
       * img[src] attributes to actually work, nor use absolute pathing.
       *
       * @see https://docs.astro.build/en/recipes/rss/
       */
      // content: ??
    }))
  });
}
