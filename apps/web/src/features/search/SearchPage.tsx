import { CategoryChips } from "./components/CategoryChips";
import { DiscoverySections } from "./discovery/DiscoverySections";
import { ALL_POSTS_ANCHOR } from "./discovery/getDiscoverySections";
import { EmptyState } from "./components/EmptyState";
import { Pagination } from "./components/Pagination";
import { ResultsHeader } from "./components/ResultsHeader";
import { ResultsList } from "./components/ResultsList";
import { SearchBar } from "./components/SearchBar";
import { hasActiveFilters, type SearchState } from "./lib/searchState";
import { MapView } from "./map/MapView";
import { getSearchPageData } from "./server/getSearchPageData";
import styles from "./SearchPage.module.css";

interface SearchPageProps {
  state: SearchState;
}

export async function SearchPage({ state }: SearchPageProps) {
  const { results, communes, categories, communeFacets, discovery } =
    await getSearchPageData(state);

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <h1 className={styles.heading}>
          ¿Qué estás <span className={styles.highlight}>buscando</span>?
        </h1>
        <SearchBar
          // Remount when the URL changes so the inputs reflect the new state.
          key={`${state.q}|${state.communes.join(",")}`}
          state={state}
          communes={communes}
        />
      </section>

      <CategoryChips categories={categories} state={state} />

      <DiscoverySections sections={discovery} />

      <section id={ALL_POSTS_ANCHOR} className={styles.results} aria-labelledby="results-heading">
        <ResultsHeader state={state} communes={communes} categories={categories} />

        {state.view === "map" && communeFacets ? (
          <MapView
            state={state}
            posts={results.items}
            nextCursor={results.nextCursor}
            communes={communes}
            facets={communeFacets}
          />
        ) : (
          <>
            {results.items.length > 0 ? (
              <ResultsList posts={results.items} />
            ) : (
              <EmptyState state={state} canReset={hasActiveFilters(state)} />
            )}
            <Pagination state={state} nextCursor={results.nextCursor} />
          </>
        )}
      </section>
    </main>
  );
}
