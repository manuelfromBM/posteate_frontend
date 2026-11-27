import Link from "next/link";

import { SEARCH_PATH } from "@/features/search";

import styles from "./PostNotFound.module.css";

// The post never existed (or the URL is wrong). Unavailable posts do not land
// here: they keep their page and show a notice instead.
export function PostNotFound() {
  return (
    <main className={styles.page}>
      <p className={styles.code}>404</p>
      <h1 className={styles.title}>No encontramos esta publicación</h1>
      <p className={styles.text}>Puede que el link esté incompleto o mal copiado.</p>
      <Link href={SEARCH_PATH} className={styles.button}>
        Buscar publicaciones
      </Link>
    </main>
  );
}
