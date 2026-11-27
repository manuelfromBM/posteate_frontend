import { redirect } from "next/navigation";

import { SEARCH_PATH } from "@/features/search";

// There is no home page yet: the search is the entry point. Temporary (307)
// so a future home page can take "/" without browsers caching the redirect.
export default function Page() {
  redirect(SEARCH_PATH);
}
