import { defineCollection, z } from "astro:content";
import { DateTime } from "luxon";

const blog = defineCollection({
  type: "content",
  // Type-check frontmatter using a schema
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishedOn: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    heroImage: z.string().optional(),
    heroImageUrl: z.string().optional()
  }),
});

/**
 * Pulse
 * Pulse "Beats" are short, twitter-like updates meant to be streamed in as a
 * timeline of events.
 */
const pulse = defineCollection({
  type: "content",
  schema: z.object({
    type: z.enum(["text"]).default("text"),
    publishedOn: z.string().transform((str) => {
      let dt = DateTime.fromISO(str, { zone: "America/Chicago" });
      if (!dt.isValid) {
        dt = DateTime.fromFormat(str, "yyyy-MM-dd h:mma", { zone: "America/Chicago" });
      }
      return dt.toJSDate();
    })
  })
})

export const collections = {
  blog,
  pulse
};
