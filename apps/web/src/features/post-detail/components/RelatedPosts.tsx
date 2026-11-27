import Link from "next/link";

import type { Category, Post } from "@/domain";
import { PostCard } from "@/features/posts";
import { EMPTY_SEARCH_STATE, searchHref } from "@/features/search";
import { Carousel } from "@/shared/ui/Carousel";

import styles from "./RelatedPosts.module.css";

interface RelatedPostsProps {
  posts: Post[];
  category: Category;
}

// "Related to what they are viewing" (docs/IA/principles.md §7). A full-width
// band below the post, so it reads as a separate section.
export function RelatedPosts({ posts, category }: RelatedPostsProps) {
  if (posts.length === 0) return null;

  return (
    <section className={styles.band} aria-labelledby="related-heading">
      <div className={styles.inner}>
        <div className={styles.header}>
          <div>
            <h2 id="related-heading" className={styles.title}>
              Publicaciones similares
            </h2>
            <p className={styles.subtitle}>Más en {category.name}</p>
          </div>
          <Link
            href={searchHref(EMPTY_SEARCH_STATE, { categories: [category.slug] })}
            className={styles.more}
          >
            Ver todo
          </Link>
        </div>
        <Carousel label="Publicaciones similares">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </Carousel>
      </div>
    </section>
  );
}
