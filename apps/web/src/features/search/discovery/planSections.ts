import type { PostSort } from "@/data";
import type { Category, Commune } from "@/domain";
import { isListedCategory } from "@/domain";

import type { SearchState } from "../lib/searchState";

// Decides which browsing carousels fit the current search. Pure: no data access,
// so the rules can be tested and extended (e.g. a subcategory breakdown) alone.
//
// Every section is ordered by relevance or recency only, never by popularity,
// account type or payment (docs/IA/principles.md §7 and anti-patterns).

export const MAX_SECTIONS_PER_BREAKDOWN = 5;

// Which rule produced the section. Limits apply per breakdown.
export type SectionKind = "newest" | "category" | "commune";

export interface SectionSpec {
  id: string;
  kind: SectionKind;
  title: string;
  subtitle?: string;
  // Narrows the current search. Text, and anything not overridden, is kept.
  narrow: Pick<Partial<SearchState>, "categories" | "communes">;
  sort: PostSort;
}

export interface PlanInput {
  state: SearchState;
  categories: Category[];
  communes: Commune[];
  // Communes with the most matching posts first (a volume of results, not the
  // popularity of any post). Used to pick which commune carousels to show.
  communesByVolume: Commune[];
}

export function planSections(input: PlanInput): SectionSpec[] {
  return [newestSection(input), ...categoryBreakdown(input), ...communeBreakdown(input)];
}

// "Lo más reciente" within whatever is being searched.
function newestSection({ state, categories, communes }: PlanInput): SectionSpec {
  const what = selected(categories, state.categories).map((c) => c.name);
  const where = selected(communes, state.communes).map((c) => c.name);
  const parts = [
    state.q && `para “${state.q}”`,
    what.length > 0 && `en ${listLabel(what)}`,
    where.length > 0 && `en ${listLabel(where)}`,
  ].filter(Boolean);

  return {
    id: "newest",
    kind: "newest",
    title: "Lo más reciente",
    subtitle: parts.length > 0 ? `Lo último publicado ${parts.join(" ")}` : "Lo último publicado",
    narrow: {},
    sort: "newest",
  };
}

// One carousel per category, unless exactly one category is already picked.
// With several picked, only those; with none, the catalog (in its own order).
function categoryBreakdown({ state, categories, communes }: PlanInput): SectionSpec[] {
  if (state.categories.length === 1) return [];

  const pool =
    state.categories.length > 1
      ? selected(categories, state.categories)
      : categories.filter(isListedCategory);
  const where = selected(communes, state.communes).map((c) => c.name);

  return pool.slice(0, MAX_SECTIONS_PER_BREAKDOWN * 2).map((category) => ({
    id: `category-${category.slug}`,
    kind: "category",
    title: category.name,
    subtitle: where.length > 0 ? `En ${listLabel(where)}` : undefined,
    narrow: { categories: [category.slug] },
    sort: "relevance",
  }));
}

// Once a category is picked, one carousel per commune ("Eventos en Melipilla"),
// unless exactly one commune is already picked.
function communeBreakdown({
  state,
  categories,
  communes,
  communesByVolume,
}: PlanInput): SectionSpec[] {
  if (state.categories.length === 0 || state.communes.length === 1) return [];

  const what = selected(categories, state.categories).map((c) => c.name);
  const pool = state.communes.length > 1 ? selected(communes, state.communes) : communesByVolume;

  return pool.slice(0, MAX_SECTIONS_PER_BREAKDOWN * 2).map((commune) => ({
    id: `commune-${commune.slug}`,
    kind: "commune",
    title: what.length === 1 ? `${what[0]} en ${commune.name}` : `En ${commune.name}`,
    narrow: { communes: [commune.slug] },
    sort: "relevance",
  }));
}

const selected = <T extends { slug: string }>(items: T[], slugs: string[]): T[] =>
  items.filter((item) => slugs.includes(item.slug));

// "A", "A y B", "A, B y 2 más"
function listLabel(names: string[]): string {
  if (names.length <= 2) return names.join(" y ");
  return `${names.slice(0, 2).join(", ")} y ${names.length - 2} más`;
}
