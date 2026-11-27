import Image from "next/image";
import Link from "next/link";

import type { Post } from "@/domain";
import { formatPrice, formatRelativeDate } from "@/shared/lib/format";
import { ImageIcon } from "@/shared/ui/icons";
import { VisuallyHidden } from "@/shared/ui/VisuallyHidden";
import { EmailButton } from "@/shared/ui/EmailButton";
import { WhatsAppButton } from "@/shared/ui/WhatsAppButton";

import { contactEmailSubject, contactMessage } from "../lib/contact";
import { postHref } from "../lib/postHref";
import styles from "./PostCard.module.css";

interface PostCardProps {
  post: Post;
  variant?: "default" | "compact";
  // Load the cover right away (cards above the fold).
  eager?: boolean;
}

const CURATED_LABEL = "Cargada por Posteate";

export function PostCard({ post, variant = "default", eager = false }: PostCardProps) {
  const communeNames = post.communes.map((c) => c.name).join(" · ");
  const authorName = post.source === "curated" ? CURATED_LABEL : post.author?.displayName;

  const buttonSize = variant === "compact" ? "sm" : "md";
  const cover = post.imageUrls[0];
  const imageCount = post.imageUrls.length;

  return (
    <article className={styles.card} data-variant={variant}>
      <div className={styles.media}>
        {cover ? (
          <Image
            src={cover}
            alt={post.title}
            fill
            loading={eager ? "eager" : "lazy"}
            sizes={variant === "compact" ? "96px" : "(max-width: 640px) 100vw, 400px"}
            className={styles.image}
          />
        ) : (
          <div className={styles.placeholder} aria-hidden>
            <ImageIcon size={variant === "compact" ? 22 : 32} />
            {variant === "default" && <span>Sin fotos</span>}
          </div>
        )}
        {imageCount > 1 && variant === "default" && (
          <span className={styles.imageCount}>
            <ImageIcon size={14} />
            {imageCount}
            <VisuallyHidden> fotos</VisuallyHidden>
          </span>
        )}
      </div>

      <div className={styles.body}>
        <header className={styles.header}>
          <span className={styles.category}>{post.category.name}</span>
          <time dateTime={post.publishedAt} className={styles.date}>
            {formatRelativeDate(post.publishedAt)}
          </time>
        </header>

        <h3 className={styles.title}>
          {/* Stretched over the whole card; the WhatsApp button stays clickable on top. */}
          <Link href={postHref(post.id)} className={styles.link}>
            {post.title}
          </Link>
        </h3>
        {variant === "default" && <p className={styles.description}>{post.description}</p>}

        <dl className={styles.meta}>
          <div>
            <VisuallyHidden as="dt">Comunas</VisuallyHidden>
            <dd>
              {communeNames}
              {post.sector && <span className={styles.sector}> · {post.sector}</span>}
            </dd>
          </div>
          {post.price && (
            <div>
              <VisuallyHidden as="dt">Precio</VisuallyHidden>
              <dd className={styles.price}>{formatPrice(post.price)}</dd>
            </div>
          )}
        </dl>

        <footer className={styles.footer}>
          <span className={styles.author} data-curated={post.source === "curated" || undefined}>
            {authorName}
          </span>
          <div className={styles.contact}>
            {post.contactEmail && (
              <EmailButton
                email={post.contactEmail}
                subject={contactEmailSubject(post)}
                body={contactMessage(post)}
                label={`Enviar correo${authorName ? ` a ${authorName}` : ""}`}
                size={buttonSize}
              />
            )}
            <WhatsAppButton
              phone={post.contactWhatsapp}
              message={contactMessage(post)}
              label={`Contactar por WhatsApp${authorName ? ` a ${authorName}` : ""}`}
              size={buttonSize}
            />
          </div>
        </footer>
      </div>
    </article>
  );
}
