"use client";

import { useCallback, type ReactNode } from "react";

import { publicEnv } from "@/shared/config/publicEnv";

import { useSearchNavigation } from "../hooks/useSearchNavigation";
import { searchHref, toggleValue, type SearchState } from "../lib/searchState";
import type { CommunePin } from "./communePins";
import { GoogleCommuneMap } from "./GoogleCommuneMap";
import type { LatLngBoundsLiteral } from "./google/types";

interface CommuneMapProps {
  state: SearchState;
  pins: CommunePin[];
  bounds: LatLngBoundsLiteral;
  // Schematic map shown when Google Maps is not configured or fails.
  fallback: ReactNode;
}

export function CommuneMap({ state, pins, bounds, fallback }: CommuneMapProps) {
  const { navigate } = useSearchNavigation();

  const selectCommune = useCallback(
    (slug: string) => navigate(searchHref(state, { communes: toggleValue(state.communes, slug) })),
    [navigate, state],
  );

  if (!publicEnv.googleMapsApiKey) {
    if (process.env.NODE_ENV === "development") {
      console.warn(
        "[map] NEXT_PUBLIC_GOOGLE_MAPS_API_KEY is not set; showing the schematic map. " +
          "Define it in apps/web/.env.local and restart `next dev`.",
      );
    }
    return fallback;
  }

  return (
    <GoogleCommuneMap
      apiKey={publicEnv.googleMapsApiKey}
      mapId={publicEnv.googleMapsMapId}
      pins={pins}
      bounds={bounds}
      onSelect={selectCommune}
      fallback={fallback}
    />
  );
}
