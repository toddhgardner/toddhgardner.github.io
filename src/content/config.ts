import { defineCollection, z } from "astro:content";
import { DateTime } from "luxon";

const blog = defineCollection({
  type: "content",
  schema: ({ image }) => z.object({
    title: z.string(),
    description: z.string(),
    publishedOn: z.string().transform((str) => {
      let dt = DateTime.fromISO(str, { zone: "America/Chicago" });
      if (!dt.isValid) {
        dt = DateTime.fromFormat(str, "yyyy-MM-dd h:mma", { zone: "America/Chicago" });
      }
      return dt.toJSDate();
    }),
    updatedOn: z.string().optional().transform((str) => {
      if (!str) return str;
      let dt = DateTime.fromISO(str, { zone: "America/Chicago" });
      if (!dt.isValid) {
        dt = DateTime.fromFormat(str, "yyyy-MM-dd h:mma", { zone: "America/Chicago" });
      }
      return dt.toJSDate();
    }),
    image: image().optional(),
    video: z.object({
      id: z.string()
    }).optional()
  }),
});

export const collections = {
  blog
};
