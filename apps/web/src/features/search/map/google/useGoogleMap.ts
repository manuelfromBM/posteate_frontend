"use client";

import { useEffect, useState, type RefObject } from "react";

import { loadGoogleMaps, onGoogleMapsAuthFailure } from "./loadGoogleMaps";
import type { GoogleMap, LatLngBoundsLiteral, MarkerLibrary } from "./types";

export type GoogleMapState =
  | { status: "loading" }
  | { status: "error" }
  | { status: "ready"; map: GoogleMap; markers: MarkerLibrary };

interface UseGoogleMapOptions {
  apiKey: string;
  mapId: string;
  bounds: LatLngBoundsLiteral;
}

// Creates a Google Map inside the container once, and reports its state.
export function useGoogleMap(
  containerRef: RefObject<HTMLElement | null>,
  { apiKey, mapId, bounds }: UseGoogleMapOptions,
): GoogleMapState {
  const [state, setState] = useState<GoogleMapState>({ status: "loading" });
  const { north, south, east, west } = bounds;

  useEffect(() => {
    let cancelled = false;
    const stopListening = onGoogleMapsAuthFailure(() => {
      if (process.env.NODE_ENV === "development") {
        console.warn(
          "[map] Google Maps rejected the API key. Check that the Maps JavaScript API is " +
            "enabled, billing is active and the key allows this domain (e.g. localhost).",
        );
      }
      setState({ status: "error" });
    });

    loadGoogleMaps(apiKey)
      .then(async (api) => {
        const [{ Map }, markers] = await Promise.all([
          api.importLibrary("maps"),
          api.importLibrary("marker"),
        ]);
        const container = containerRef.current;
        if (cancelled || !container) return;

        const map = new Map(container, {
          center: { lat: (north + south) / 2, lng: (east + west) / 2 },
          zoom: 9,
          mapId,
          disableDefaultUI: true,
          zoomControl: true,
          fullscreenControl: true,
          clickableIcons: false,
          gestureHandling: "cooperative",
        });
        map.fitBounds({ north, south, east, west }, 48);
        setState({ status: "ready", map, markers });
      })
      .catch((error: unknown) => {
        if (process.env.NODE_ENV === "development") {
          console.warn("[map] Could not load Google Maps:", error);
        }
        if (!cancelled) setState({ status: "error" });
      });

    return () => {
      cancelled = true;
      stopListening();
    };
  }, [containerRef, apiKey, mapId, north, south, east, west]);

  return state;
}
