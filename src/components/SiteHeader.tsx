import Link from "next/link";
import { site } from "@/content/site";
import { Container } from "./Container";
import { PrimaryNavigation } from "./PrimaryNavigation";
import styles from "./SiteHeader.module.css";

export function SiteHeader() {
  return (
    <header className={styles.header}>
      <Container>
        <div className={styles.inner}>
          <Link
            aria-label={`${site.name}, home`}
            className={styles.mark}
            href="/"
          >
            {site.shortName}
          </Link>
          <PrimaryNavigation />
        </div>
      </Container>
    </header>
  );
}
