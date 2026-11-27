import type { Metadata } from "next";

import { PublishComingSoon } from "@/features/publish";

export const metadata: Metadata = {
  title: "Publicar",
  robots: { index: false },
};

export default function Page() {
  return <PublishComingSoon />;
}
