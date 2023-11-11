import { z, defineCollection, reference } from "astro:content";

const projects = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
  }),
});

const posts = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    relatedProjects: z.array(reference("projects")),
  }),
});

export const collections = {
  projects: projects,
  posts: posts,
};
