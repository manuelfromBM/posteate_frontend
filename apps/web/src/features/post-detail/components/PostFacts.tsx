import Link from "next/link";

import type { Post } from "@/domain";
import { isAvailable } from "@/domain";
import { EMPTY_SEARCH_STATE, searchHref } from "@/features/search";
import { formatDate, formatRelativeDate } from "@/shared/lib/format";
import { CalendarIcon, ClockIcon, PinIcon } from "@/shared/ui/icons";

import styles from "./PostFacts.module.css";

interface PostFactsProps {
  post: Post;
}

// Structured info: where and how long it is valid. Validity is always visible
// (docs/IA/principles.md §9). Communes link back to search to keep discovering.
export function PostFacts({ post }: PostFactsProps) {
  const available = isAvailable(post);

  return (
    <dl className={styles.facts}>
      <div className={styles.fact}>
        <dt>
          <PinIcon size={18} />
          {post.communes.length > 1 ? "Comunas" : "Comuna"}
        </dt>
        <dd>
          <ul className={styles.communes}>
            {post.communes.map((commune) => (
              <li key={commune.id}>
                <Link
                  href={searchHref(EMPTY_SEARCH_STATE, {
                    communes: [commune.slug],
                  })}
                  className={styles.commune}
                >
                  {commune.name}
                </Link>
              </li>
            ))}
          </ul>
          {post.sector && <span className={styles.sector}>Sector {post.sector}</span>}
        </dd>
      </div>

      <div className={styles.fact}>
        <dt>
          <CalendarIcon size={18} />
          Publicada
        </dt>
        <dd>
          <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
          <span className={styles.hint}>{formatRelativeDate(post.publishedAt)}</span>
        </dd>
      </div>

      <div className={styles.fact}>
        <dt>
          <ClockIcon size={18} />
          {post.status === "expired" ? "Venció" : "Vigente hasta"}
        </dt>
        <dd>
          <time dateTime={post.expiresAt}>{formatDate(post.expiresAt)}</time>
          {available && (
            <span className={styles.hint}>vence {formatRelativeDate(post.expiresAt)}</span>
          )}
        </dd>
      </div>
    </dl>
  );
}
