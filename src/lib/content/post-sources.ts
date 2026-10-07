import type { MDXContent } from "mdx/types";

export type PostModule = {
  default: MDXContent;
  post: unknown;
};

export type PostSource = {
  slug: string;
  load: () => Promise<PostModule>;
};

// Static imports let Next.js include each MDX file in the build. Add one entry
// here whenever a new content/writing/<slug>/index.mdx article is created.
export const postSources: readonly PostSource[] = [
  {
    slug: "building-a-key-value-store",
    load: () =>
      import("../../../content/writing/building-a-key-value-store/index.mdx"),
  },
  {
    slug: "draft-learning-note",
    load: () =>
      import("../../../content/writing/draft-learning-note/index.mdx"),
  },
  {
    slug: "enjoyment-satisfaction-and-meaning",
    load: () =>
      import("../../../content/writing/enjoyment-satisfaction-and-meaning/index.mdx"),
  },
  {
    slug: "why-majority-is-about-memory-not-voting",
    load: () =>
      import("../../../content/writing/why-majority-is-about-memory-not-voting/index.mdx"),
  },
];
