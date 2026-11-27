"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import type { MouseEvent } from "react";

import { ArrowLeftIcon } from "@/shared/ui/icons";

import styles from "./BackLink.module.css";

interface BackLinkProps {
  fallbackHref: string;
}

// Goes back to the previous page (keeping the search filters and scroll) when
// the person came from Posteate; otherwise links to the search page.
export function BackLink({ fallbackHref }: BackLinkProps) {
  const router = useRouter();

  const onClick = (event: MouseEvent<HTMLAnchorElement>) => {
    const cameFromSite =
      document.referrer !== "" && new URL(document.referrer).origin === window.location.origin;
    if (cameFromSite && window.history.length > 1) {
      event.preventDefault();
      router.back();
    }
  };

  return (
    <Link href={fallbackHref} onClick={onClick} className={styles.link}>
      <ArrowLeftIcon size={18} />
      Volver a buscar
    </Link>
  );
}
