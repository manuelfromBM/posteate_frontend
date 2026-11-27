// Stable public URL of a post. Kept in one place so every link (cards, share,
// metadata) agrees on it.
export const POSTS_PATH = "/posts";

export const postHref = (postId: string): string => `${POSTS_PATH}/${encodeURIComponent(postId)}`;
