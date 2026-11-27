import type { PostStatus } from "@/domain";

interface UnavailableCopy {
  title: string;
  description: string;
}

// User-facing copy (Chilean Spanish) for posts whose link still works but are
// no longer available. See docs/IA/domain.md, "Statuses".
export const unavailableCopy: Record<Exclude<PostStatus, "active">, UnavailableCopy> = {
  paused: {
    title: "Esta publicación está pausada",
    description: "Quien la publicó la ocultó por un tiempo. Puede volver a estar disponible.",
  },
  expired: {
    title: "Esta publicación venció",
    description: "Terminó su período de vigencia. Quien la publicó puede renovarla.",
  },
  closed: {
    title: "Esta publicación ya no está disponible",
    description: "Ya cumplió su objetivo: se vendió, se arrendó, se encontró o se cubrió.",
  },
};
