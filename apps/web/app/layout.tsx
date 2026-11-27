import type { Metadata } from "next";

import { SiteHeader } from "@/features/navigation";
import { publicEnv } from "@/shared/config/publicEnv";

import "../styles/global.css";

export const metadata: Metadata = {
  metadataBase: new URL(publicEnv.siteUrl),
  title: { default: "Posteate", template: "%s · Posteate" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es-CL">
      <body>
        <SiteHeader />
        {children}
      </body>
    </html>
  );
}
