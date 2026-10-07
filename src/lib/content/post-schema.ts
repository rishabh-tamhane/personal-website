import { z } from "zod";

const postDateSchema = z.iso.date();

const coverSchema = z
  .object({
    src: z.string().trim().min(1),
    alt: z.string().trim().min(1),
    width: z.number().int().positive(),
    height: z.number().int().positive(),
  })
  .strict();

export const postMetadataSchema = z
  .object({
    title: z.string().trim().min(1),
    description: z.string().trim().min(1),
    publishedAt: postDateSchema,
    updatedAt: postDateSchema.optional(),
    tags: z.array(z.string().trim().min(1)).min(1),
    draft: z.boolean(),
    featured: z.boolean().optional().default(false),
    cover: coverSchema.optional(),
    canonicalUrl: z.url().optional(),
  })
  .strict()
  .superRefine((metadata, context) => {
    if (new Set(metadata.tags).size !== metadata.tags.length) {
      context.addIssue({
        code: "custom",
        message: "Tags must not contain duplicates.",
        path: ["tags"],
      });
    }

    if (metadata.updatedAt && metadata.updatedAt < metadata.publishedAt) {
      context.addIssue({
        code: "custom",
        message: "updatedAt cannot be earlier than publishedAt.",
        path: ["updatedAt"],
      });
    }
  });

export type PostMetadata = z.infer<typeof postMetadataSchema>;

export function parsePostMetadata(
  metadata: unknown,
  sourceDescription: string,
): PostMetadata {
  const result = postMetadataSchema.safeParse(metadata);

  if (result.success) {
    return result.data;
  }

  const details = result.error.issues
    .map((issue) => {
      const field = issue.path.length > 0 ? issue.path.join(".") : "metadata";

      return `  - ${field}: ${issue.message}`;
    })
    .join("\n");

  throw new Error(
    `Invalid article metadata in ${sourceDescription}:\n${details}`,
  );
}
