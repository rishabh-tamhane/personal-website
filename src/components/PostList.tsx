import Link from "next/link";
import type { PostSummary } from "@/lib/content/posts";
import { EmptyState } from "./EmptyState";
import styles from "./PostList.module.css";

type PostListProps = {
  posts: readonly PostSummary[];
  emptyDescription: string;
  headingLevel?: "h2" | "h3";
  compact?: boolean;
};

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  dateStyle: "long",
  timeZone: "UTC",
});

function formatPostDate(date: string): string {
  return dateFormatter.format(new Date(`${date}T00:00:00Z`));
}

export function PostList({
  posts,
  emptyDescription,
  headingLevel = "h2",
  compact = false,
}: PostListProps) {
  if (posts.length === 0) {
    return (
      <EmptyState
        description={emptyDescription}
        title="Thoughts under construction."
      />
    );
  }

  const Heading = headingLevel;

  return (
    <ol className={styles.list}>
      {posts.map((post) => {
        const visibleTags = compact ? post.tags.slice(0, 1) : post.tags;

        return (
          <li className={styles.item} key={post.slug}>
            <article>
              <div className={styles.meta}>
                <time dateTime={post.publishedAt}>
                  {formatPostDate(post.publishedAt)}
                </time>
                <ul aria-label={`${post.title} topics`} className={styles.tags}>
                  {visibleTags.map((tag) => (
                    <li key={tag}>{tag}</li>
                  ))}
                </ul>
              </div>
              <Heading className={styles.title}>
                <Link href={post.href}>{post.title}</Link>
              </Heading>
              {compact ? null : (
                <p className={styles.description}>{post.description}</p>
              )}
            </article>
          </li>
        );
      })}
    </ol>
  );
}
