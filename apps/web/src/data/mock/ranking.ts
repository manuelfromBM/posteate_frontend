import type { Post } from "@/domain";
import { normalizeText } from "@/shared/lib/text";

const DAY_MS = 24 * 60 * 60 * 1000;
const RECENCY_WINDOW_DAYS = 30;

const WEIGHTS = {
  titleMatch: 3,
  bodyMatch: 1,
  recency: 1,
  hasPrice: 0.1,
  hasSector: 0.05,
  hasImage: 0.1,
} as const;

export interface RankKey {
  score: number;
  publishedAt: string;
  id: string;
}

export const tokenize = (text: string): string[] =>
  normalizeText(text).split(/\s+/).filter(Boolean);

// Relevance only: query match, recency and information quality.
// Author audience, account type or verification never affect the score.
// PROPOSAL: the real weights are still TO BE DEFINED in docs/IA/principles.md.
// Returns null when the post does not match the query.
export function rankKey(post: Post, tokens: string[], now: Date): RankKey | null {
  let score = 0;

  if (tokens.length > 0) {
    const title = normalizeText(post.title);
    const body = normalizeText(
      `${post.description} ${post.category.name} ${post.sector ?? ""} ${post.communes
        .map((c) => c.name)
        .join(" ")}`,
    );
    let matched = 0;
    for (const token of tokens) {
      if (title.includes(token)) {
        score += WEIGHTS.titleMatch;
        matched++;
      } else if (body.includes(token)) {
        score += WEIGHTS.bodyMatch;
        matched++;
      }
    }
    if (matched === 0) return null;
  }

  // Original publication date: renewing never bumps a post. Bucketed by whole
  // days so scores, and therefore cursors, stay stable within a day.
  const ageDays = Math.floor((now.getTime() - new Date(post.publishedAt).getTime()) / DAY_MS);
  score += (WEIGHTS.recency * Math.max(0, RECENCY_WINDOW_DAYS - ageDays)) / RECENCY_WINDOW_DAYS;

  if (post.price) score += WEIGHTS.hasPrice;
  if (post.sector) score += WEIGHTS.hasSector;
  if (post.imageUrls.length > 0) score += WEIGHTS.hasImage;

  return {
    score: Math.round(score * 1000) / 1000,
    publishedAt: post.publishedAt,
    id: post.id,
  };
}

// Higher score first, then newer original publication date, then id as a stable tiebreaker.
export function compareRankKeys(a: RankKey, b: RankKey): number {
  if (a.score !== b.score) return b.score - a.score;
  if (a.publishedAt !== b.publishedAt) return a.publishedAt < b.publishedAt ? 1 : -1;
  return a.id < b.id ? -1 : a.id > b.id ? 1 : 0;
}
