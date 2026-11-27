import "server-only";

import { cache } from "react";

import { getRepositories } from "@/data";
import type { Post } from "@/domain";

// Enough to fill a carousel.
export const RELATED_POSTS_LIMIT = 10;

export interface PostDetailData {
  post: Post;
  related: Post[];
}

// Memoized per request, so generateMetadata and the page share one lookup.
export const getPost = cache(async (id: string): Promise<Post | null> => {
  const { posts } = getRepositories();
  return posts.getById(id);
});

export async function getPostDetailData(id: string): Promise<PostDetailData | null> {
  const post = await getPost(id);
  if (!post) return null;

  // Related posts help people keep discovering, even from an unavailable post.
  const { posts } = getRepositories();
  const related = await posts.listRelated(post.id, RELATED_POSTS_LIMIT);

  return { post, related };
}
