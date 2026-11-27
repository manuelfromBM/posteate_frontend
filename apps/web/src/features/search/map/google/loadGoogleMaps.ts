import type { GoogleMapsApi } from "./types";

const CALLBACK_NAME = "__posteateGoogleMapsReady";
const AUTH_FAILURE_EVENT = "posteate:google-maps-auth-failure";

let loading: Promise<GoogleMapsApi> | null = null;

const readyApi = (): GoogleMapsApi | null => {
  const maps = window.google?.maps;
  return maps?.importLibrary ? (maps as GoogleMapsApi) : null;
};

// Loads the Maps JavaScript API once per page, with the async bootstrap.
export function loadGoogleMaps(apiKey: string): Promise<GoogleMapsApi> {
  const ready = readyApi();
  if (ready) return Promise.resolve(ready);

  loading ??= new Promise<GoogleMapsApi>((resolve, reject) => {
    const params = new URLSearchParams({
      key: apiKey,
      v: "weekly",
      loading: "async",
      language: "es",
      region: "CL",
      callback: CALLBACK_NAME,
    });

    const fail = (error: Error) => {
      loading = null;
      reject(error);
    };

    Object.assign(window, {
      [CALLBACK_NAME]: () => {
        const api = readyApi();
        if (api) resolve(api);
        else fail(new Error("Google Maps loaded without importLibrary"));
      },
    });
    window.gm_authFailure = () => window.dispatchEvent(new Event(AUTH_FAILURE_EVENT));

    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?${params}`;
    script.async = true;
    script.onerror = () => {
      script.remove();
      fail(new Error("Could not load Google Maps"));
    };
    document.head.append(script);
  });

  return loading;
}

// Google reports an invalid key asynchronously, after the script has loaded.
export function onGoogleMapsAuthFailure(handler: () => void): () => void {
  window.addEventListener(AUTH_FAILURE_EVENT, handler);
  return () => window.removeEventListener(AUTH_FAILURE_EVENT, handler);
}
