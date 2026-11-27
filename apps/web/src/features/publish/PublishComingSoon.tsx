import Link from "next/link";

import { SEARCH_PATH } from "@/features/search";

import styles from "./PublishComingSoon.module.css";

// Placeholder until publishing (and the account it requires) is built.
export function PublishComingSoon() {
  return (
    <main className={styles.page}>
      <span className={styles.badge}>Muy pronto</span>
      <h1 className={styles.title}>Publicar en Posteate</h1>
      <p className={styles.text}>
        Estamos preparando todo para que puedas publicar arriendos, empleos, servicios y más. Por
        ahora puedes explorar lo que ya está publicado.
      </p>
      <Link href={SEARCH_PATH} className={styles.button}>
        Explorar publicaciones
      </Link>
    </main>
  );
}
