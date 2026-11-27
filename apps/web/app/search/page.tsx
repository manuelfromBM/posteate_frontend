import type { Metadata } from "next";

import { parseSearchState, SearchPage, type RawSearchParams } from "@/features/search";

interface PageProps {
  searchParams: Promise<RawSearchParams>;
}

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  const { q } = parseSearchState(await searchParams);
  return {
    // The root layout appends " · Posteate".
    title: q ? `${q} · Buscar` : "Buscar",
    description:
      "Encuentra arriendos, empleos, servicios, mascotas y más en Melipilla y alrededores.",
  };
}

export default async function Page({ searchParams }: PageProps) {
  return <SearchPage state={parseSearchState(await searchParams)} />;
}
