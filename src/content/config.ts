import { defineCollection, z } from "astro:content";

const blog = defineCollection({
  type: "content",
  schema: ({ image }) => z.object({
    title: z.string(),
    description: z.string(),
    publishedOn: z.coerce.date(),
    updatedOn: z.coerce.date().optional(),
    image: image().optional(),
    video: z.object({
      id: z.string()
    }).optional(),
    tags: z.array(z.string()).optional()
  }),
});

const projects = defineCollection({
  type: "content",
  schema: ({ image }) => z.object({
    title: z.string(),
    subtitle: z.string(),
    description: z.string(),
    startedOn: z.date(),
    completedOn: z.date().optional(),
    image: image().optional(),
    url: z.string(),
  })
})

export const collections = {
  blog,
  projects
};
