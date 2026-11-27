import type { CommuneFacet } from "@/data";
import type { Commune, Post } from "@/domain";

import { EmptyState } from "../components/EmptyState";
import { Pagination } from "../components/Pagination";
import { ResultsList } from "../components/ResultsList";
import { hasActiveFilters, type SearchState } from "../lib/searchState";
import { boundsOf, buildCommunePins } from "./communePins";
import { CommuneMap } from "./CommuneMap";
import { SchematicMap } from "./SchematicMap";
import styles from "./MapView.module.css";

interface MapViewProps {
  state: SearchState;
  posts: Post[];
  nextCursor: string | null;
  communes: Commune[];
  facets: CommuneFacet[];
}

export function MapView({ state, posts, nextCursor, communes, facets }: MapViewProps) {
  const pins = buildCommunePins(communes, facets, state.communes);
  const bounds = boundsOf(communes);

  return (
    <div className={styles.layout}>
      <div className={styles.mapColumn}>
        <CommuneMap
          state={state}
          pins={pins}
          bounds={bounds}
          fallback={<SchematicMap state={state} pins={pins} bounds={bounds} />}
        />
        <p className={styles.note}>
          Aquí solo aparecen publicaciones que tienen una ubicación en el mapa. Toca una comuna para
          filtrar.
        </p>
      </div>

      <div className={styles.listColumn}>
        {posts.length > 0 ? (
          <ResultsList posts={posts} layout="column" />
        ) : (
          <EmptyState state={state} canReset={hasActiveFilters(state)} />
        )}
        <Pagination state={state} nextCursor={nextCursor} />
      </div>
    </div>
  );
}
