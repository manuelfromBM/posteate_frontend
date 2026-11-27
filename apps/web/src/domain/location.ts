import type { LatLng } from "./geo";

// Optional place of a post, as picked in Google Maps when publishing. It is
// independent from the post's communes, which are always required and are what
// search and filters use. Warning people about sharing a location (e.g. a home
// address) is the publish form's job, not the model's.
export interface PostLocation {
  // Google Maps place id, when the place was picked from Google's results.
  placeId?: string;
  // Place name ("Feria libre de Melipilla"), when it has one.
  name?: string;
  // Human-readable address as Google formats it.
  address?: string;
  position: LatLng;
}
