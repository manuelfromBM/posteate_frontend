import Link from "next/link";

import type { Category } from "@/domain";
import { VisuallyHidden } from "@/shared/ui/VisuallyHidden";

import { searchHref, toggleValue, type SearchState } from "../lib/searchState";
import styles from "./CategoryChips.module.css";

interface CategoryChipsProps {
  categories: Category[];
  state: SearchState;
}

// Multi-select: each chip toggles its category; "Todo" clears the selection.
export function CategoryChips({ categories, state }: CategoryChipsProps) {
  return (
    <nav aria-label="Categorías" className={styles.scroller}>
      <ul className={styles.list}>
        <li>
          <Link
            href={searchHref(state, { categories: [] })}
            className={styles.chip}
            data-active={state.categories.length === 0 || undefined}
            scroll={false}
          >
            Todo
          </Link>
        </li>
        {categories.map((category) => {
          const active = state.categories.includes(category.slug);
          return (
            <li key={category.id}>
              <Link
                href={searchHref(state, {
                  categories: toggleValue(state.categories, category.slug),
                })}
                className={styles.chip}
                data-active={active || undefined}
                scroll={false}
              >
                {category.name}
                {active && <VisuallyHidden> (seleccionada)</VisuallyHidden>}
                {category.status === "proposed" && <span className={styles.badge}>nueva</span>}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
