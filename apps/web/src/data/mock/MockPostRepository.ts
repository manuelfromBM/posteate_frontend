import { hasLocation, isVisibleInSearch, type Page, type Post } from "@/domain";

import type {
  CommuneFacet,
  PostRepository,
  PostSearchFilters,
  PostSearchQuery,
  PostSort,
} from "../repositories";
import { decodeCursor, encodeCursor } from "./cursor";
import { compareRankKeys, rankKey, tokenize, type RankKey } from "./ranking";

interface RankedPost {
  post: Post;
  key: RankKey;
}

// In-memory stand-in for the backend search module. Mirrors the rules the
// real implementation must follow: active posts only, relevance ordering
// and cursor pagination.
export class MockPostRepository implements PostRepository {
  constructor(private readonly posts: Post[]) {}

  async search({
    cursor,
    limit,
    sort = "relevance",
    ...filters
  }: PostSearchQuery): Promise<Page<Post>> {
    const after = cursor ? decodeCursor(cursor) : null;
    const ranked = this.rank(filters, sort).filter(
      ({ key }) => !after || compareRankKeys(key, after) > 0,
    );

    const page = ranked.slice(0, limit);
    const last = page.at(-1);

    return {
      items: page.map(({ post }) => post),
      nextCursor: ranked.length > limit && last ? encodeCursor(last.key) : null,
    };
  }

  async getById(id: string): Promise<Post | null> {
    return this.posts.find((post) => post.id === id) ?? null;
  }

  async listRelated(postId: string, limit: number): Promise<Post[]> {
    const source = this.posts.find((post) => post.id === postId);
    if (!source) return [];

    const sourceCommunes = new Set(source.communes.map((c) => c.slug));
    const sharedCommunes = (post: Post) =>
      post.communes.filter((c) => sourceCommunes.has(c.slug)).length;

    return (
      this.posts
        .filter(
          (post) =>
            post.id !== source.id &&
            isVisibleInSearch(post) &&
            post.category.slug === source.category.slug,
        )
        .map((post) => ({ post, shared: sharedCommunes(post) }))
        // Same commune first, then the newest. No popularity signals.
        .sort((a, b) => b.shared - a.shared || b.post.publishedAt.localeCompare(a.post.publishedAt))
        .slice(0, limit)
        .map(({ post }) => post)
    );
  }

  async countByCommune(filters: PostSearchFilters): Promise<CommuneFacet[]> {
    const counts = new Map<string, CommuneFacet>();

    for (const { post } of this.rank({ ...filters, communeSlugs: [] })) {
      for (const commune of post.communes) {
        const facet = counts.get(commune.id) ?? { commune, count: 0 };
        facet.count++;
        counts.set(commune.id, facet);
      }
    }

    return [...counts.values()].sort((a, b) => b.count - a.count);
  }

  private rank(
    { text, communeSlugs, categorySlugs, withLocation = false }: PostSearchFilters,
    sort: PostSort = "relevance",
  ): RankedPost[] {
    const tokens = tokenize(text);
    const now = new Date();

    return this.posts
      .filter(isVisibleInSearch)
      .filter((post) => !withLocation || hasLocation(post))
      .filter((post) => categorySlugs.length === 0 || categorySlugs.includes(post.category.slug))
      .filter(
        (post) =>
          communeSlugs.length === 0 || post.communes.some((c) => communeSlugs.includes(c.slug)),
      )
      .flatMap((post) => {
        const key = rankKey(post, tokens, now);
        if (!key) return [];
        // A constant score leaves the original publication date as the order.
        return [{ post, key: sort === "newest" ? { ...key, score: 0 } : key }];
      })
      .sort((a, b) => compareRankKeys(a.key, b.key));
  }
}
