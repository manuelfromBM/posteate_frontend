// Public (browser) configuration. Each variable must be referenced literally
// so Next.js can inline it at build time.
export const publicEnv = {
  // Absolute base URL for metadata (canonical, Open Graph). Set it per environment.
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? "",
  // Advanced markers need a Map ID. DEMO_MAP_ID works for development only.
  googleMapsMapId: process.env.NEXT_PUBLIC_GOOGLE_MAPS_MAP_ID || "DEMO_MAP_ID",
} as const;
