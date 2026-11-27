import Link from "next/link";

import { searchHref, type SearchState } from "../lib/searchState";
import styles from "./EmptyState.module.css";

interface EmptyStateProps {
  state: SearchState;
  canReset: boolean;
}

export function EmptyState({ state, canReset }: EmptyStateProps) {
  return (
    <div className={styles.empty}>
      <span className={styles.icon} aria-hidden>
        ?
      </span>
      <h3 className={styles.title}>No encontramos publicaciones</h3>
      <p className={styles.text}>Prueba con otras palabras, otra categoría o más comunas.</p>
      {canReset && (
        <Link
          href={searchHref(state, { q: "", communes: [], categories: [] })}
          className={styles.reset}
        >
          Limpiar búsqueda
        </Link>
      )}
    </div>
  );
}
