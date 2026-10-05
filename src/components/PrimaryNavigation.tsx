"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./PrimaryNavigation.module.css";

const links = [
  { href: "/", label: "Home" },
  { href: "/writing", label: "Writing" },
  { href: "/projects", label: "Projects" },
] as const;

function isCurrentPath(pathname: string, href: string) {
  return href === "/" ? pathname === href : pathname.startsWith(href);
}

export function PrimaryNavigation() {
  const pathname = usePathname();

  return (
    <nav aria-label="Primary navigation">
      <ul className={styles.list}>
        {links.map((link) => {
          const isCurrent = isCurrentPath(pathname, link.href);

          return (
            <li key={link.href}>
              <Link
                aria-current={isCurrent ? "page" : undefined}
                className={styles.link}
                href={link.href}
              >
                {link.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
