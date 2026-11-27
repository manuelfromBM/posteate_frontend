"use client";

import { useRouter } from "next/navigation";
import { useCallback, useTransition } from "react";

// Client-side navigation between search states, exposing the pending state
// so the UI can show progress while the server renders the new results.
export function useSearchNavigation() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const navigate = useCallback(
    (href: string) => startTransition(() => router.push(href, { scroll: false })),
    [router],
  );

  return { navigate, isPending };
}
