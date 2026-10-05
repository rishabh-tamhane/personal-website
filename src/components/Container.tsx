import type { ReactNode } from "react";
import styles from "./Container.module.css";

type ContainerProps = {
  children: ReactNode;
  narrow?: boolean;
};

export function Container({ children, narrow = false }: ContainerProps) {
  return (
    <div className={narrow ? styles.narrow : styles.container}>{children}</div>
  );
}
