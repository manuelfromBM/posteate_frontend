import Link from "next/link";

import { searchHref, type SearchState } from "../lib/searchState";
import styles from "./Pagination.module.css";

interface PaginationProps {
  state: SearchState;
  nextCursor: string | null;
}

// Cursor pagination: only "next" and "back to start", never page numbers.
export function Pagination({ state, nextCursor }: PaginationProps) {
  if (!nextCursor && !state.cursor) return null;

  return (
    <nav className={styles.pagination} aria-label="Paginación">
      {state.cursor && (
        <Link href={searchHref(state)} className={styles.back}>
          Volver al inicio
        </Link>
      )}
      {nextCursor && (
        <Link href={searchHref(state, { cursor: nextCursor })} className={styles.more}>
          Ver más resultados
        </Link>
      )}
    </nav>
  );
}
