export type CategoryStatus = "proposed" | "approved" | "rejected" | "merged";

export interface Category {
  id: string;
  slug: string;
  name: string;
  status: CategoryStatus;
  parentId?: string;
}

// Categories that can be shown in menus and filters (see docs/IA/categories.md).
export const isListedCategory = (category: Category): boolean =>
  category.status === "approved" || category.status === "proposed";
