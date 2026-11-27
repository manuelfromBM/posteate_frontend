// Minimal typings for the parts of the Google Maps JavaScript API we use.
// Hand-written to avoid adding @types/google.maps as a dependency.

import type { LatLng } from "@/domain";

export interface LatLngBoundsLiteral {
  north: number;
  south: number;
  east: number;
  west: number;
}

export interface MapOptions {
  center: LatLng;
  zoom: number;
  mapId: string;
  disableDefaultUI?: boolean;
  zoomControl?: boolean;
  fullscreenControl?: boolean;
  clickableIcons?: boolean;
  gestureHandling?: "cooperative" | "greedy" | "none" | "auto";
}

export interface GoogleMap {
  fitBounds(bounds: LatLngBoundsLiteral, padding?: number): void;
}

export interface MapsEventListener {
  remove(): void;
}

export interface AdvancedMarkerOptions {
  map: GoogleMap | null;
  position: LatLng;
  content: HTMLElement;
  title: string;
  zIndex?: number;
}

export interface AdvancedMarker {
  map: GoogleMap | null;
  addListener(event: "click", handler: () => void): MapsEventListener;
}

export interface MapsLibrary {
  Map: new (element: HTMLElement, options: MapOptions) => GoogleMap;
}

export interface MarkerLibrary {
  AdvancedMarkerElement: new (options: AdvancedMarkerOptions) => AdvancedMarker;
}

export interface GoogleMapsApi {
  importLibrary(name: "maps"): Promise<MapsLibrary>;
  importLibrary(name: "marker"): Promise<MarkerLibrary>;
}

declare global {
  interface Window {
    google?: { maps?: Partial<GoogleMapsApi> };
    // Called by Google Maps when the API key is invalid or not authorized.
    gm_authFailure?: () => void;
  }
}
