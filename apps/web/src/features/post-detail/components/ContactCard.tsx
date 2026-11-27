import type { Post } from "@/domain";
import { isAvailable } from "@/domain";
import { formatPrice } from "@/shared/lib/format";

import { getAuthorInfo } from "../lib/author";
import styles from "./ContactCard.module.css";
import { ShareActions } from "./ShareActions";

interface ContactCardProps {
  post: Post;
  shareUrl: string;
}

// Price, author and sharing. The contact buttons float in the corner (FloatingContact).
export function ContactCard({ post, shareUrl }: ContactCardProps) {
  const author = getAuthorInfo(post);
  const available = isAvailable(post);

  return (
    <div className={styles.card}>
      {post.price && (
        <p className={styles.price}>
          {post.price.type === "range" && <span className={styles.priceHint}>Entre</span>}
          {formatPrice(post.price)}
        </p>
      )}

      <div className={styles.author}>
        <span className={styles.avatar} data-curated={author.curated || undefined} aria-hidden>
          {author.name.charAt(0).toUpperCase()}
        </span>
        <div className={styles.authorText}>
          <span className={styles.authorName} data-curated={author.curated || undefined}>
            {author.name}
          </span>
          <span className={styles.authorDetail}>{author.detail}</span>
        </div>
      </div>

      {!available && (
        <p className={styles.unavailable}>El contacto se oculta porque ya no está disponible.</p>
      )}

      <div className={styles.share}>
        <span className={styles.shareLabel}>Compartir</span>
        <ShareActions url={shareUrl} title={post.title} />
      </div>
    </div>
  );
}
