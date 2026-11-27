import type { ElementType, ReactNode } from "react";

import styles from "./VisuallyHidden.module.css";

interface VisuallyHiddenProps {
  as?: ElementType;
  children: ReactNode;
}

// Text for screen readers only.
export function VisuallyHidden({ as: Component = "span", children }: VisuallyHiddenProps) {
  return <Component className={styles.root}>{children}</Component>;
}
