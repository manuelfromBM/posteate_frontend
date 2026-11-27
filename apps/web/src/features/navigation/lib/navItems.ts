import { POSTS_PATH } from "@/features/posts";
import { PUBLISH_PATH } from "@/features/publish";
import { SEARCH_PATH } from "@/features/search";

import type { NavItem } from "./activePath";

// Main navigation. Browsing needs no account, so every item is public.
export const NAV_ITEMS: NavItem[] = [
  { href: SEARCH_PATH, label: "Explorar", activeFor: [SEARCH_PATH, POSTS_PATH] },
];

export const PUBLISH_ITEM = { href: PUBLISH_PATH, label: "Publicar" } as const;

export const HOME_HREF = SEARCH_PATH;
