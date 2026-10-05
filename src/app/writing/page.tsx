import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { EmptyState } from "@/components/EmptyState";
import styles from "../subpage.module.css";

export const metadata: Metadata = {
  title: "Writing",
  description: "Writing by Rishabh Tamhane about software, learning and life.",
};

export default function WritingPage() {
  return (
    <Container narrow>
      <div className={styles.page}>
        <header className={styles.header}>
          <p className={styles.eyebrow}>Notes and essays</p>
          <h1>Writing</h1>
          <p>
            Things I learn, things I build and thoughts I don’t want to lose.
          </p>
        </header>
        <EmptyState
          description="The first published articles will appear soon. I am still building the site."
          title="No published articles yet."
        />
      </div>
    </Container>
  );
}
