import type { Category, Commune, Page, Post } from "@/domain";

export interface PostSearchFilters {
  text: string;
  communeSlugs: string[];
  // Empty means every category; otherwise a post must match any of them.
  categorySlugs: string[];
  // Only posts with a location (Google Maps place). Used by the map view.
  withLocation?: boolean;
}

// "relevance" (default): query match, recency and information quality.
// "newest": original publication date only. Renewing never bumps a post.
export type PostSort = "relevance" | "newest";

export interface PostSearchQuery extends PostSearchFilters {
  sort?: PostSort;
  cursor?: string;
  limit: number;
}

export interface CommuneFacet {
  commune: Commune;
  count: number;
}

// The UI depends only on these interfaces. Today they are backed by mocks;
// later by an HTTP client for the Go API, without touching any feature code.
export interface PostRepository {
  search(query: PostSearchQuery): Promise<Page<Post>>;
  // Any status: unavailable posts keep their public URL. Null when it does not exist.
  getById(id: string): Promise<Post | null>;
  // Active posts related to the given one, by relevance (same category, shared
  // communes), never by popularity. Excludes the post itself.
  listRelated(postId: string, limit: number): Promise<Post[]>;
  // Number of matching posts per commune. Ignores the commune filter so the
  // map can show every commune, not only the selected ones.
  countByCommune(filters: PostSearchFilters): Promise<CommuneFacet[]>;
}

export interface CatalogRepository {
  listCommunes(): Promise<Commune[]>;
  listCategories(): Promise<Category[]>;
}

export interface Repositories {
  posts: PostRepository;
  catalog: CatalogRepository;
}
