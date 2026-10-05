import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { ProjectList } from "@/components/ProjectList";
import { projects } from "@/content/projects";
import styles from "../subpage.module.css";

export const metadata: Metadata = {
  title: "Projects",
  description: "Software projects built by Rishabh Tamhane.",
};

export default function ProjectsPage() {
  return (
    <Container>
      <div className={styles.page}>
        <header className={styles.header}>
          <p className={styles.eyebrow}>Things I build</p>
          <h1>Projects</h1>
          <p>
            Things I built to learn, solve a problem or satisfy my curiosity.
          </p>
        </header>
        <ProjectList
          emptyDescription="I’m preparing the first project entries and verifying their public repositories."
          projects={projects}
        />
      </div>
    </Container>
  );
}
