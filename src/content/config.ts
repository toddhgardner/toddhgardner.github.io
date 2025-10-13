import { defineCollection, z } from "astro:content";
import { DateTime } from "luxon";

function normalizeDate(str: string) : Date {
  let dt = DateTime.fromISO(str, { zone: "America/Chicago" });
  if (!dt.isValid) {
    dt = DateTime.fromFormat(str, "yyyy-MM-dd h:mma", { zone: "America/Chicago" });
  }
  return dt.toJSDate();
}

const blog = defineCollection({
  type: "content",
  schema: ({ image }) => z.object({
    title: z.string(),
    description: z.string(),
    publishedOn: z.string().transform(normalizeDate),
    updatedOn: z.string().optional().transform((str) => !str ? str : normalizeDate(str)),
    image: image().optional(),
    video: z.object({
      id: z.string()
    }).optional()
  }),
});

const projects = defineCollection({
  type: "content",
  schema: ({ image }) => z.object({
    title: z.string(),
    titleLong: z.string(),
    url: z.string(),
    image: image(),
    startedOn: z.date(),
    completedOn: z.date().optional()
  })
})

export const collections = {
  blog,
  projects
};
