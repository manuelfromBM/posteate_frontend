"use client";

import { useEffect, useRef, type ReactNode } from "react";

import { pinTitle, type CommunePin } from "./communePins";
import { createPinElement } from "./createPinElement";
import type { LatLngBoundsLiteral } from "./google/types";
import { useGoogleMap } from "./google/useGoogleMap";
import styles from "./CommuneMap.module.css";

interface GoogleCommuneMapProps {
  apiKey: string;
  mapId: string;
  pins: CommunePin[];
  bounds: LatLngBoundsLiteral;
  onSelect: (communeSlug: string) => void;
  // Rendered instead of the map if Google Maps fails to load.
  fallback: ReactNode;
}

export function GoogleCommuneMap({
  apiKey,
  mapId,
  pins,
  bounds,
  onSelect,
  fallback,
}: GoogleCommuneMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapState = useGoogleMap(containerRef, { apiKey, mapId, bounds });

  useEffect(() => {
    if (mapState.status !== "ready") return;
    const { map, markers } = mapState;

    const created = pins.map((pin) => {
      const marker = new markers.AdvancedMarkerElement({
        map,
        position: pin.commune.center,
        content: createPinElement(pin),
        title: pinTitle(pin),
        zIndex: pin.selected ? 3 : pin.count > 0 ? 2 : 1,
      });
      const listener = marker.addListener("click", () => onSelect(pin.commune.slug));
      return { marker, listener };
    });

    return () => {
      for (const { marker, listener } of created) {
        listener.remove();
        marker.map = null;
      }
    };
  }, [mapState, pins, onSelect]);

  if (mapState.status === "error") return fallback;

  return (
    <div className={styles.canvas}>
      <div ref={containerRef} className={styles.google} />
      {mapState.status === "loading" && <div className={styles.loading}>Cargando mapa…</div>}
    </div>
  );
}
