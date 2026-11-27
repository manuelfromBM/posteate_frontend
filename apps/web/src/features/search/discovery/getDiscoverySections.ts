import "server-only";

import { getRepositories } from "@/data";
import type { Category, Commune, Post } from "@/domain";

import { searchHref, type SearchState } from "../lib/searchState";
import {
  MAX_SECTIONS_PER_BREAKDOWN,
  planSections,
  type SectionKind,
  type SectionSpec,
} from "./planSections";

const POSTS_PER_SECTION = 10;
// A carousel with fewer posts than this looks empty, so it is skipped.
const MIN_POSTS_PER_SECTION = 3;
// Id of the full results list, the target of the newest section's "Ver todo".
export const ALL_POSTS_ANCHOR = "todas";

export interface DiscoverySection {
  id: string;
  title: string;
  subtitle?: string;
  posts: Post[];
  // "Ver todo": the full search for this section.
  href: string;
}

// Carousels sit on top of the list view's first page. The map has its own browsing.
export const showsDiscovery = (state: SearchState): boolean =>
  state.view === "list" && !state.cursor;

export async function getDiscoverySections(
  state: SearchState,
  categories: Category[],
  communes: Commune[],
): Promise<DiscoverySection[]> {
  const { posts } = getRepositories();
  const filters = { text: state.q, communeSlugs: state.communes, categorySlugs: state.categories };

  const facets = await posts.countByCommune(filters);
  const specs = planSections({
    state,
    categories,
    communes,
    communesByVolume: facets.map((facet) => facet.commune),
  });

  const loaded = await Promise.all(specs.map((spec) => loadSection(state, spec)));

  // Keep sections with enough posts, at most a few per breakdown, in plan order.
  const perKind = new Map<SectionKind, number>();
  const sections = loaded.filter(({ kind, section }) => {
    if (section.posts.length < MIN_POSTS_PER_SECTION) return false;
    if (kind === "newest") return true;
    const count = perKind.get(kind) ?? 0;
    if (count >= MAX_SECTIONS_PER_BREAKDOWN) return false;
    perKind.set(kind, count + 1);
    return true;
  });

  // "Lo más reciente" alone would only repeat the list below.
  const hasBreakdown = sections.some(({ kind }) => kind !== "newest");
  return hasBreakdown ? sections.map(({ section }) => section) : [];
}

async function loadSection(
  state: SearchState,
  spec: SectionSpec,
): Promise<{ kind: SectionKind; section: DiscoverySection }> {
  const { posts } = getRepositories();
  const scoped = { ...state, ...spec.narrow };
  const page = await posts.search({
    text: scoped.q,
    communeSlugs: scoped.communes,
    categorySlugs: scoped.categories,
    sort: spec.sort,
    limit: POSTS_PER_SECTION,
  });

  return {
    kind: spec.kind,
    section: {
      id: spec.id,
      title: spec.title,
      subtitle: spec.subtitle,
      posts: page.items,
      // The newest section's "Ver todo" is the full list already on the page.
      href:
        spec.kind === "newest"
          ? `${searchHref(state)}#${ALL_POSTS_ANCHOR}`
          : searchHref(state, spec.narrow),
    },
  };
}
