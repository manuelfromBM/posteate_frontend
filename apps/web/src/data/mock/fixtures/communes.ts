import type { Commune } from "@/domain";

// Centers are approximate (town center), used only to place posts on the map.
export const communes: Commune[] = [
  {
    id: "c1",
    slug: "melipilla",
    name: "Melipilla",
    center: { lat: -33.6891, lng: -71.2153 },
  },
  {
    id: "c2",
    slug: "curacavi",
    name: "Curacaví",
    center: { lat: -33.4063, lng: -71.1333 },
  },
  {
    id: "c3",
    slug: "maria-pinto",
    name: "María Pinto",
    center: { lat: -33.5156, lng: -71.118 },
  },
  {
    id: "c4",
    slug: "alhue",
    name: "Alhué",
    center: { lat: -34.0333, lng: -71.1 },
  },
  {
    id: "c5",
    slug: "san-pedro",
    name: "San Pedro",
    center: { lat: -33.8939, lng: -71.4592 },
  },
  {
    id: "c6",
    slug: "talagante",
    name: "Talagante",
    center: { lat: -33.665, lng: -70.93 },
  },
  {
    id: "c7",
    slug: "padre-hurtado",
    name: "Padre Hurtado",
    center: { lat: -33.573, lng: -70.815 },
  },
  {
    id: "c8",
    slug: "penaflor",
    name: "Peñaflor",
    center: { lat: -33.606, lng: -70.876 },
  },
  {
    id: "c9",
    slug: "san-antonio",
    name: "San Antonio",
    center: { lat: -33.5933, lng: -71.6217 },
  },
  {
    id: "c10",
    slug: "cartagena",
    name: "Cartagena",
    center: { lat: -33.553, lng: -71.605 },
  },
];

// Sectors are free text on a post; these are only sample values for the generator.
export const sectorsByCommune: Record<string, string[]> = {
  melipilla: ["Centro", "Villa Los Jardines", "Población Benjamín Vicuña", "Pomaire", "Puangue"],
  curacavi: ["Centro", "Cerrillos", "Lo Águila", "Miraflores"],
  "maria-pinto": ["Centro", "Santa Luisa", "Ibacache"],
  alhue: ["Villa Alhué", "El Asiento", "Barrancas de Pichi"],
  "san-pedro": ["Centro", "Loica", "El Yali"],
  talagante: ["Centro", "Lonquén", "Villa Los Aromos", "El Rosario"],
  "padre-hurtado": ["Centro", "Santa Rosa de Chena", "El Trebal"],
  penaflor: ["Centro", "Malloco", "Santa Adela", "Esperanza"],
  "san-antonio": ["Centro", "Barrancas", "Llolleo", "Tejas Verdes"],
  cartagena: ["Centro", "Playa Chica", "San Sebastián", "Costa Azul"],
};
