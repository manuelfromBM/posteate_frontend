import type { Category } from "./category";
import type { Commune } from "./commune";
import type { PostLocation } from "./location";
import type { Price } from "./price";

export type PostStatus = "active" | "paused" | "expired" | "closed";

export type PostSource = "account" | "curated";

export type AccountType = "person" | "business" | "organization";

export interface PostAuthor {
  displayName: string;
  accountType: AccountType;
}

export interface Post {
  id: string;
  title: string;
  description: string;
  category: Category;
  communes: Commune[];
  sector?: string;
  // Optional exact place (Google Maps). Communes stay required regardless.
  location?: PostLocation;
  price?: Price;
  imageUrls: string[];
  status: PostStatus;
  publishedAt: string;
  expiresAt: string;
  source: PostSource;
  // Absent for curated posts, which have no author account.
  author?: PostAuthor;
  // Comes from the author's profile, or from the post itself when it is curated.
  contactWhatsapp: string;
  // Optional, same source as the WhatsApp number. Never the login email:
  // only shown when the author entered one for contact.
  contactEmail?: string;
}

// Only active posts are shown in search and the feed.
export const isVisibleInSearch = (post: Post): boolean => post.status === "active";

// Paused, expired and closed posts keep their public URL but are shown as
// unavailable (see docs/IA/domain.md, "Statuses").
export const hasLocation = (post: Post): post is Post & { location: PostLocation } =>
  post.location !== undefined;

export const isAvailable = (post: Post): boolean => post.status === "active";
