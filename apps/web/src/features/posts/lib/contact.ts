import type { Post } from "@/domain";

// Prefilled texts for contacting the author (Chilean Spanish). One place, so
// cards and the post detail always say the same.
export const contactMessage = (post: Post): string =>
  `Hola, vi tu publicación "${post.title}" en Posteate.`;

export const contactEmailSubject = (post: Post): string =>
  `Consulta por "${post.title}" (Posteate)`;
