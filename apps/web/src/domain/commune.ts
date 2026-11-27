import type { LatLng } from "./geo";

export interface Commune {
  id: string;
  slug: string;
  name: string;
  // Approximate center of the commune, used to frame the map and place the
  // commune pins. A post's own place, if any, is its optional `location`.
  center: LatLng;
}
