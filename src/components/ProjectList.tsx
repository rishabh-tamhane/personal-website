import type { Project } from "@/content/projects";
import { EmptyState } from "./EmptyState";
import styles from "./ProjectList.module.css";

type ProjectListProps = {
  projects: readonly Project[];
  emptyDescription: string;
  headingLevel?: "h2" | "h3";
};

export function ProjectList({
  projects,
  emptyDescription,
  headingLevel = "h2",
}: ProjectListProps) {
  if (projects.length === 0) {
    return (
      <EmptyState
        description={emptyDescription}
        title="Projects are on the way."
      />
    );
  }

  const Heading = headingLevel;

  return (
    <ul className={styles.list}>
      {projects.map((project) => (
        <li className={styles.item} key={project.name}>
          <div>
            <Heading className={styles.title}>{project.name}</Heading>
            <p className={styles.description}>{project.description}</p>
            <ul aria-label={`${project.name} topics`} className={styles.topics}>
              {project.topics.map((topic) => (
                <li key={topic}>{topic}</li>
              ))}
            </ul>
          </div>
          <div className={styles.actions}>
            {project.githubUrl ? (
              <a href={project.githubUrl} rel="noreferrer" target="_blank">
                GitHub <span aria-hidden="true">↗</span>
              </a>
            ) : null}
            {project.liveUrl ? (
              <a href={project.liveUrl} rel="noreferrer" target="_blank">
                Live demo <span aria-hidden="true">↗</span>
              </a>
            ) : null}
          </div>
        </li>
      ))}
    </ul>
  );
}
