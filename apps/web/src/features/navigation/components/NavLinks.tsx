"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { isActivePath, type NavItem } from "../lib/activePath";
import styles from "./SiteHeader.module.css";

interface NavLinksProps {
  items: NavItem[];
}

// Client only to read the current path for the active state.
export function NavLinks({ items }: NavLinksProps) {
  const pathname = usePathname();

  return (
    <ul className={styles.links}>
      {items.map((item) => (
        <li key={item.href}>
          <Link
            href={item.href}
            className={styles.link}
            aria-current={isActivePath(pathname, item.activeFor) ? "page" : undefined}
          >
            {item.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}
