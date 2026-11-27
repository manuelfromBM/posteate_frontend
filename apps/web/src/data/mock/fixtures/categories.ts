import type { Category } from "@/domain";

export const categories: Category[] = [
  { id: "k1", slug: "marketplace", name: "Compra y venta", status: "approved" },
  {
    id: "k2",
    slug: "real-estate",
    name: "Arriendos y propiedades",
    status: "approved",
  },
  { id: "k3", slug: "vehicles", name: "Vehículos", status: "approved" },
  { id: "k4", slug: "jobs", name: "Empleos", status: "approved" },
  { id: "k5", slug: "services", name: "Servicios", status: "approved" },
  { id: "k6", slug: "events", name: "Eventos", status: "approved" },
  {
    id: "k7",
    slug: "pets",
    name: "Mascotas perdidas o en adopción",
    status: "approved",
  },
  {
    id: "k8",
    slug: "lost-found",
    name: "Objetos perdidos y encontrados",
    status: "approved",
  },
  {
    id: "k9",
    slug: "local-business",
    name: "Promociones y negocios locales",
    status: "approved",
  },
  {
    id: "k10",
    slug: "community",
    name: "Avisos comunitarios",
    status: "approved",
  },
  {
    id: "k11",
    slug: "news",
    name: "Noticias e información local",
    status: "approved",
  },
  {
    id: "k12",
    slug: "classes",
    name: "Clases particulares",
    status: "proposed",
  },
  {
    id: "k13",
    slug: "handmade",
    name: "Artesanía y emprendimientos",
    status: "proposed",
  },
  {
    id: "k14",
    slug: "old-category",
    name: "Categoría antigua",
    status: "merged",
  },
];
