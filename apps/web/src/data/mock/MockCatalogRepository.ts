import { isListedCategory, type Category, type Commune } from "@/domain";

import type { CatalogRepository } from "../repositories";

export class MockCatalogRepository implements CatalogRepository {
  constructor(
    private readonly communes: Commune[],
    private readonly categories: Category[],
  ) {}

  async listCommunes(): Promise<Commune[]> {
    return this.communes;
  }

  async listCategories(): Promise<Category[]> {
    return this.categories.filter(isListedCategory);
  }
}
