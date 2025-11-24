import rss, { type RSSFeedItem } from "@astrojs/rss";
import type { APIContext } from "astro";
import { getCollection } from "astro:content";
import { loadRenderers } from "astro:container";
import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { SITE_TITLE, SITE_DESCRIPTION, AUTHOR_NAME } from "~/consts";
import { transform, walk } from "ultrahtml";
import sanitize from "ultrahtml/transformers/sanitize";
import { slugRewrite } from "~/util";

export async function GET(context: APIContext) {
  const posts = (await getCollection("blog"))
    .map(slugRewrite)
    .sort((a, b) => b.data.publishedOn.valueOf() - a.data.publishedOn.valueOf());

  // Get the URL to prepend to relative site links. Based on `site` in `astro.config.mjs`.
  let baseUrl = context.site?.href || "https://www.toddhgardner.com";
  if (baseUrl.at(-1) === "/") baseUrl = baseUrl.slice(0, -1);

  // Create a new Astro container that we can render components with.
  // See https://docs.astro.build/en/reference/container-reference/
  const renderers = await loadRenderers([]);
  const container = await AstroContainer.create({ renderers });

  const feedItems: RSSFeedItem[] = [];
  for (const post of posts) {
    // Get the `<Content/>` component for the current post.
    const { Content } = await post.render();
    // Use the Astro container to render the content to a string.
    const rawContent = await container.renderToString(Content);

    // Process and sanitize the raw content:
    // - Removes `<!DOCTYPE html>` preamble
    // - Makes link `href` and image `src` attributes absolute instead of relative
    // - Strips any `<script>` and `<style>` tags
    // Thanks @Princesseuh — https://github.com/Princesseuh/erika.florist/blob/1827288c14681490fa301400bfd815acb53463e9/src/middleware.ts
    let content = await transform(rawContent.replace(/^<!DOCTYPE html>/, ''), [
      async (node) => {
        await walk(node, (node) => {
          if (node.name === "a" && node.attributes.href?.startsWith("/")) {
            node.attributes.href = baseUrl + node.attributes.href;
          }
          if (node.name === "img" && node.attributes.src?.startsWith("/")) {
            node.attributes.src = baseUrl + node.attributes.src;
          }
        });
        return node;
      },
      sanitize({ dropElements: ["script", "style"] }),
    ]);

    if (post.data.video) {
      content = `<iframe width="560" height="315" src="https://www.youtube.com/embed/${post.data.video.id}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>` + content;
    }
    else if (post.data.image) {
      content = `<picture><img src="${baseUrl + post.data.image.src}" alt="${post.data.title}" width="${post.data.image.width}" height="${post.data.image.height}" class="webfeedsFeaturedVisual" /></picture>` + content;
    }

    feedItems.push({
      title: post.data.title,
      link: `/blog/${post.slug}`,
      author: AUTHOR_NAME,
      pubDate: post.data.publishedOn,
      categories: post.data.tags,
      description: post.data.description,
      customData: post.data.video ? `
        <id>yt:video:${post.data.video.id}</id>
        <yt:videoId>${post.data.video.id}</yt:videoId>
        <media:group>
          <media:title>${post.data.title}</media:title>
          <media:content url="https://www.youtube.com/v/${post.data.video.id}?version=3" type="application/x-shockwave-flash" width="640" height="390"/>
          <media:thumbnail url="https://i2.ytimg.com/vi/${post.data.video.id}/hqdefault.jpg" width="480" height="360"/>
        </media:group>` : "",
      content: content
    });

  }

  return await rss({
    xmlns: {
      atom: "http://www.w3.org/2005/Atom",
      media: "http://search.yahoo.com/mrss/",
      yt: "http://www.youtube.com/xml/schemas/2015"
    },
    trailingSlash: false,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    site: context.site as URL,
    customData: `<atom:link href="${context.site}feed.xml" rel="self" type="application/rss+xml" />`,
    items: feedItems
  });
}
