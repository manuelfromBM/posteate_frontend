// The search state lives in the URL, so every search can be shared and indexed.
// URL shape: /search?q=casa&commune=melipilla,talagante&category=real-estate,jobs&view=map&cursor=...

export type RawSearchParams = Record<string, string | string[] | undefined>;

export const SEARCH_PATH = "/search";
export const SEARCH_VIEWS = ["list", "map"] as const;
export type SearchView = (typeof SEARCH_VIEWS)[number];

const MAX_QUERY_LENGTH = 120;

export interface SearchState {
  q: string;
  communes: string[];
  categories: string[];
  view: SearchView;
  cursor?: string;
}

// No query and no filters: the plain search page. Lets other features build
// search links ("more in this commune") without knowing the state shape.
export const EMPTY_SEARCH_STATE: SearchState = {
  q: "",
  communes: [],
  categories: [],
  view: "list",
};

const first = (value: string | string[] | undefined): string | undefined =>
  Array.isArray(value) ? value[0] : value;

const isSearchView = (value: string | undefined): value is SearchView =>
  SEARCH_VIEWS.some((view) => view === value);

export function parseSearchState(params: RawSearchParams): SearchState {
  const view = first(params.view);
  return {
    q: (first(params.q) ?? "").trim().slice(0, MAX_QUERY_LENGTH),
    communes: (first(params.commune) ?? "").split(",").filter(Boolean),
    categories: (first(params.category) ?? "").split(",").filter(Boolean),
    view: isSearchView(view) ? view : "list",
    cursor: first(params.cursor) || undefined,
  };
}

// Builds the URL for a new state. Any change other than the cursor itself
// starts again from the first page.
export function searchHref(state: SearchState, changes: Partial<SearchState> = {}): string {
  const next: SearchState = { ...state, cursor: undefined, ...changes };
  const params = new URLSearchParams();
  if (next.q) params.set("q", next.q);
  if (next.communes.length > 0) params.set("commune", next.communes.join(","));
  if (next.categories.length > 0) params.set("category", next.categories.join(","));
  if (next.view !== "list") params.set("view", next.view);
  if (next.cursor) params.set("cursor", next.cursor);
  const qs = params.toString();
  return qs ? `${SEARCH_PATH}?${qs}` : SEARCH_PATH;
}

export const toggleValue = (values: string[], value: string): string[] =>
  values.includes(value) ? values.filter((v) => v !== value) : [...values, value];

export const hasActiveFilters = (state: SearchState): boolean =>
  Boolean(state.q || state.communes.length > 0 || state.categories.length > 0);
