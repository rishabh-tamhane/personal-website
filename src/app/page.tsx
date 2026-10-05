import Link from "next/link";
import { Container } from "@/components/Container";
import { EmptyState } from "@/components/EmptyState";
import { ProjectList } from "@/components/ProjectList";
import { getFeaturedProjects } from "@/content/projects";
import { site } from "@/content/site";
import styles from "./page.module.css";

export default function HomePage() {
  const featuredProjects = getFeaturedProjects();

  return (
    <Container>
      <div className={styles.page}>
        <section aria-labelledby="introduction-heading" className={styles.hero}>
          <p className={styles.eyebrow}>Hello, I&apos;m</p>
          <h1 id="introduction-heading">{site.name}</h1>
          <p className={styles.introduction}>{site.introduction}</p>
        </section>

        <section aria-labelledby="writing-heading" className={styles.section}>
          <div className={styles.sectionHeading}>
            <div>
              <p className={styles.sectionNumber}>01</p>
              <h2 id="writing-heading">Selected writing</h2>
            </div>
            <Link href="/writing">View all writing</Link>
          </div>
          <EmptyState
            description="The first published articles will appear soon. I am still building the site."
            title="Thoughts under construction."
          />
        </section>

        <section aria-labelledby="projects-heading" className={styles.section}>
          <div className={styles.sectionHeading}>
            <div>
              <p className={styles.sectionNumber}>02</p>
              <h2 id="projects-heading">Projects</h2>
            </div>
            <Link href="/projects">View projects</Link>
          </div>
          <ProjectList
            emptyDescription="Public project links will appear here as soon as their destinations are confirmed."
            headingLevel="h3"
            projects={featuredProjects}
          />
        </section>

        <section aria-labelledby="currently-heading" className={styles.section}>
          <div className={styles.sectionHeading}>
            <div>
              <p className={styles.sectionNumber}>03</p>
              <h2 id="currently-heading">Currently</h2>
            </div>
          </div>
          <dl className={styles.currentlyGrid}>
            {site.currently.map((item) => (
              <div className={styles.currentlyItem} key={item.label}>
                <dt>{item.label}</dt>
                <dd>{item.value}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section aria-labelledby="elsewhere-heading" className={styles.section}>
          <div className={styles.sectionHeading}>
            <div>
              <p className={styles.sectionNumber}>04</p>
              <h2 id="elsewhere-heading">Elsewhere</h2>
            </div>
          </div>
          <ul className={styles.socialLinks}>
            {site.socialLinks.map((link) => (
              <li key={link.label}>
                <a href={link.href}>
                  {link.label} <span aria-hidden="true">↗</span>
                </a>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </Container>
  );
}
