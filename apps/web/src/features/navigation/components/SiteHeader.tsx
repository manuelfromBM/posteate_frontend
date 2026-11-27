import Link from "next/link";

import { PlusIcon } from "@/shared/ui/icons";

import { HOME_HREF, NAV_ITEMS, PUBLISH_ITEM } from "../lib/navItems";
import { NavLinks } from "./NavLinks";
import styles from "./SiteHeader.module.css";

// Site-wide top bar. Server Component; only the links that need the current
// path are a Client Component.
export function SiteHeader() {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link href={HOME_HREF} className={styles.logo} aria-label="Posteate, ir al inicio">
          <span className={styles.logoMark} aria-hidden>
            P
          </span>
          <span className={styles.logoText}>Posteate</span>
        </Link>

        <nav aria-label="Principal" className={styles.nav}>
          <NavLinks items={NAV_ITEMS} />
          <Link href={PUBLISH_ITEM.href} className={styles.publish}>
            <PlusIcon size={18} />
            {PUBLISH_ITEM.label}
          </Link>
        </nav>
      </div>
    </header>
  );
}
