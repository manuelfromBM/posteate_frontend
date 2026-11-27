import type { Repositories } from "../repositories";
import { categories } from "./fixtures/categories";
import { communes } from "./fixtures/communes";
import { generatePosts } from "./fixtures/posts";
import { MockCatalogRepository } from "./MockCatalogRepository";
import { MockPostRepository } from "./MockPostRepository";

export function createMockRepositories(): Repositories {
  const posts = generatePosts({
    communes,
    categories,
    count: 320,
    seed: 20261122,
  });
  return {
    posts: new MockPostRepository(posts),
    catalog: new MockCatalogRepository(communes, categories),
  };
}
