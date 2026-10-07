import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/Container";
import { getPostBySlug, getPublishedSlugs } from "@/lib/content/posts";
import styles from "./page.module.css";

type ArticlePageProps = {
  params: Promise<{ slug: string }>;
};

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  dateStyle: "long",
  timeZone: "UTC",
});

export const dynamicParams = false;

export async function generateStaticParams() {
  return (await getPublishedSlugs()).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return {
    title: post.title,
    description: post.description,
    alternates: {
      canonical: post.canonicalUrl ?? post.href,
    },
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const { Content } = post;

  return (
    <Container narrow>
      <article className={styles.article}>
        <header className={styles.header}>
          <Link className={styles.backLink} href="/writing">
            ← All writing
          </Link>
          <h1>{post.title}</h1>
          <p className={styles.description}>{post.description}</p>
          <div className={styles.meta}>
            <time dateTime={post.publishedAt}>
              {dateFormatter.format(new Date(`${post.publishedAt}T00:00:00Z`))}
            </time>
            <ul aria-label="Article topics">
              {post.tags.map((tag) => (
                <li key={tag}>{tag}</li>
              ))}
            </ul>
          </div>
        </header>
        <div className={styles.content}>
          <Content />
        </div>
      </article>
    </Container>
  );
}
