import type { Post } from "@/domain";
import { PostCard } from "@/features/posts";

import styles from "./ResultsList.module.css";

// Roughly the first row of the grid.
const EAGER_IMAGES = 3;

interface ResultsListProps {
  posts: Post[];
  layout?: "grid" | "column";
}

export function ResultsList({ posts, layout = "grid" }: ResultsListProps) {
  return (
    <ul className={styles.list} data-layout={layout}>
      {posts.map((post, index) => (
        <li key={post.id}>
          <PostCard
            post={post}
            variant={layout === "column" ? "compact" : "default"}
            eager={index < EAGER_IMAGES}
          />
        </li>
      ))}
    </ul>
  );
}
