import Link from "next/link";

import { isAvailable } from "@/domain";
import { postHref } from "@/features/posts";
import { EMPTY_SEARCH_STATE, SEARCH_PATH, searchHref } from "@/features/search";
import { publicEnv } from "@/shared/config/publicEnv";

import { BackLink } from "./components/BackLink";
import { ContactCard } from "./components/ContactCard";
import { ImageGallery } from "./components/ImageGallery";
import { PostFacts } from "./components/PostFacts";
import { RelatedPosts } from "./components/RelatedPosts";
import { FloatingContact } from "./components/FloatingContact";
import { UnavailableNotice } from "./components/UnavailableNotice";
import { getAuthorInfo } from "./lib/author";
import styles from "./PostDetailPage.module.css";
import type { PostDetailData } from "./server/getPostDetailData";

interface PostDetailPageProps {
  data: PostDetailData;
}

export function PostDetailPage({ data: { post, related } }: PostDetailPageProps) {
  const available = isAvailable(post);
  const shareUrl = new URL(postHref(post.id), publicEnv.siteUrl).toString();

  return (
    <main>
      <div className={styles.page} data-ends-page={related.length === 0 || undefined}>
        <BackLink fallbackHref={SEARCH_PATH} />

        <article className={styles.layout}>
          <div className={styles.gallery} data-unavailable={!available || undefined}>
            <ImageGallery images={post.imageUrls} alt={post.title} bleedOnMobile />
          </div>

          <header className={styles.header}>
            <div className={styles.badges}>
              <Link
                href={searchHref(EMPTY_SEARCH_STATE, {
                  categories: [post.category.slug],
                })}
                className={styles.category}
              >
                {post.category.name}
              </Link>
              {post.category.status === "proposed" && (
                <span className={styles.proposed}>Categoría nueva</span>
              )}
            </div>
            <h1 className={styles.title}>{post.title}</h1>
            {post.status !== "active" && <UnavailableNotice status={post.status} />}
          </header>

          <aside className={styles.aside}>
            <ContactCard post={post} shareUrl={shareUrl} />
          </aside>

          <div className={styles.body}>
            <PostFacts post={post} />
            <section aria-labelledby="description-heading" className={styles.description}>
              <h2 id="description-heading" className={styles.sectionTitle}>
                Descripción
              </h2>
              <p className={styles.text}>{post.description}</p>
            </section>
          </div>
        </article>
      </div>

      <RelatedPosts posts={related} category={post.category} />

      {available && <FloatingContact post={post} authorName={getAuthorInfo(post).name} />}
    </main>
  );
}
