import { access, readdir } from "node:fs/promises";
import path from "node:path";
import type { MDXContent } from "mdx/types";
import { parsePostMetadata, type PostMetadata } from "./post-schema";
import { postSources } from "./post-sources";

const writingDirectory = path.join(process.cwd(), "content", "writing");
const validSlugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export type PostSummary = PostMetadata & {
  slug: string;
  href: `/writing/${string}`;
};

export type PublishedPost = PostSummary & {
  Content: MDXContent;
};

let postsPromise: Promise<PublishedPost[]> | undefined;

function comparePosts(left: PostSummary, right: PostSummary): number {
  return (
    right.publishedAt.localeCompare(left.publishedAt) ||
    left.title.localeCompare(right.title)
  );
}

function assertValidSources(): void {
  const seenSlugs = new Set<string>();

  for (const source of postSources) {
    if (!validSlugPattern.test(source.slug)) {
      throw new Error(
        `Invalid article slug "${source.slug}". Use lowercase letters, numbers and single hyphens only.`,
      );
    }

    if (seenSlugs.has(source.slug)) {
      throw new Error(`Duplicate article slug "${source.slug}".`);
    }

    seenSlugs.add(source.slug);
  }
}

async function assertContentDirectoryMatchesSources(): Promise<void> {
  const entries = await readdir(writingDirectory, { withFileTypes: true });
  const directorySlugs = entries
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort();
  const sourceSlugs = postSources.map((source) => source.slug).sort();

  for (const slug of directorySlugs) {
    if (!validSlugPattern.test(slug)) {
      throw new Error(
        `Invalid article directory "content/writing/${slug}". Use lowercase letters, numbers and single hyphens only.`,
      );
    }

    await access(path.join(writingDirectory, slug, "index.mdx"));
  }

  const unregistered = directorySlugs.filter(
    (slug) => !sourceSlugs.includes(slug),
  );
  const missingDirectories = sourceSlugs.filter(
    (slug) => !directorySlugs.includes(slug),
  );

  if (unregistered.length > 0) {
    throw new Error(
      `Unregistered article directories: ${unregistered.join(", ")}. Add each article to src/lib/content/post-sources.ts.`,
    );
  }

  if (missingDirectories.length > 0) {
    throw new Error(
      `Article sources without matching content directories: ${missingDirectories.join(", ")}.`,
    );
  }
}

async function loadPublishedPosts(): Promise<PublishedPost[]> {
  assertValidSources();
  await assertContentDirectoryMatchesSources();

  const posts = await Promise.all(
    postSources.map(async (source) => {
      const articleModule = await source.load();
      const metadata = parsePostMetadata(
        articleModule.post,
        `content/writing/${source.slug}/index.mdx`,
      );

      return {
        ...metadata,
        slug: source.slug,
        href: `/writing/${source.slug}` as const,
        Content: articleModule.default,
      };
    }),
  );

  return posts.filter((post) => !post.draft).sort(comparePosts);
}

async function getAllPublishedPosts(): Promise<PublishedPost[]> {
  postsPromise ??= loadPublishedPosts();

  return postsPromise;
}

function toSummary(post: PublishedPost): PostSummary {
  return {
    slug: post.slug,
    href: post.href,
    title: post.title,
    description: post.description,
    publishedAt: post.publishedAt,
    updatedAt: post.updatedAt,
    tags: post.tags,
    draft: post.draft,
    featured: post.featured,
    cover: post.cover,
    canonicalUrl: post.canonicalUrl,
  };
}

export async function getPublishedPosts(): Promise<PostSummary[]> {
  return (await getAllPublishedPosts()).map(toSummary);
}

export async function getFeaturedPosts(): Promise<PostSummary[]> {
  return (await getAllPublishedPosts())
    .filter((post) => post.featured)
    .map(toSummary);
}

export async function getPostBySlug(
  slug: string,
): Promise<PublishedPost | undefined> {
  return (await getAllPublishedPosts()).find((post) => post.slug === slug);
}

export async function getPublishedSlugs(): Promise<string[]> {
  return (await getAllPublishedPosts()).map((post) => post.slug);
}
