import "server-only";

import { createMockRepositories } from "./mock";
import type { Repositories } from "./repositories";

export type * from "./repositories";

let repositories: Repositories | null = null;

// Single entry point to the data layer. Swap the mock for the HTTP client
// here once the backend endpoints exist.
export function getRepositories(): Repositories {
  repositories ??= createMockRepositories();
  return repositories;
}
