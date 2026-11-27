// Pure helpers with no feature imports, so Client Components can use them
// without pulling other features (and their server code) into the bundle.
export interface NavItem {
  href: string;
  label: string;
  // Paths (and everything under them) where the item shows as current.
  activeFor: string[];
}

export const isActivePath = (pathname: string, paths: string[]): boolean =>
  paths.some((path) => pathname === path || pathname.startsWith(`${path}/`));
