import "server-only";

import { getRepositories, type CommuneFacet, type PostSearchFilters } from "@/data";
import type { Category, Commune, Page, Post } from "@/domain";

import {
  getDiscoverySections,
  showsDiscovery,
  type DiscoverySection,
} from "../discovery/getDiscoverySections";
import type { SearchState } from "../lib/searchState";

export const SEARCH_PAGE_SIZE = 12;

export interface SearchPageData {
  results: Page<Post>;
  communes: Commune[];
  categories: Category[];
  // Only loaded for the map view.
  communeFacets: CommuneFacet[] | null;
  // Browsing carousels; empty once the person searches or picks a category.
  discovery: DiscoverySection[];
}

export async function getSearchPageData(state: SearchState): Promise<SearchPageData> {
  const { posts, catalog } = getRepositories();
  const filters: PostSearchFilters = {
    text: state.q,
    communeSlugs: state.communes,
    categorySlugs: state.categories,
    // The map lists only posts with a location, and its commune counts match that list.
    withLocation: state.view === "map",
  };

  const [communes, categories] = await Promise.all([
    catalog.listCommunes(),
    catalog.listCategories(),
  ]);

  const [results, communeFacets, discovery] = await Promise.all([
    posts.search({ ...filters, cursor: state.cursor, limit: SEARCH_PAGE_SIZE }),
    state.view === "map" ? posts.countByCommune(filters) : Promise.resolve(null),
    showsDiscovery(state) ? getDiscoverySections(state, categories, communes) : Promise.resolve([]),
  ]);

  return { results, communes, categories, communeFacets, discovery };
}
