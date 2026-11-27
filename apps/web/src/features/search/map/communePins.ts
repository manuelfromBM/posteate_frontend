import type { CommuneFacet } from "@/data";
import type { Commune } from "@/domain";

import type { LatLngBoundsLiteral } from "./google/types";

export interface CommunePin {
  commune: Commune;
  count: number;
  selected: boolean;
}

// One pin per commune. Posts are placed at their commune's center because
// they never store exact coordinates.
export function buildCommunePins(
  communes: Commune[],
  facets: CommuneFacet[],
  selectedSlugs: string[],
): CommunePin[] {
  const counts = new Map(facets.map((f) => [f.commune.id, f.count]));
  return communes.map((commune) => ({
    commune,
    count: counts.get(commune.id) ?? 0,
    selected: selectedSlugs.includes(commune.slug),
  }));
}

export function boundsOf(communes: Commune[]): LatLngBoundsLiteral {
  const lats = communes.map((c) => c.center.lat);
  const lngs = communes.map((c) => c.center.lng);
  return {
    north: Math.max(...lats),
    south: Math.min(...lats),
    east: Math.max(...lngs),
    west: Math.min(...lngs),
  };
}

export const pinTitle = ({ commune, count }: CommunePin): string =>
  `${commune.name}: ${count === 1 ? "1 publicación" : `${count} publicaciones`}`;
