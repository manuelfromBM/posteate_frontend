import type { Category, Commune } from "@/domain";

import type { SearchState } from "../lib/searchState";
import styles from "./ResultsHeader.module.css";
import { ViewToggle } from "./ViewToggle";

interface ResultsHeaderProps {
  state: SearchState;
  communes: Commune[];
  categories: Category[];
}

export function ResultsHeader({ state, communes, categories }: ResultsHeaderProps) {
  const communeNames = communes.filter((c) => state.communes.includes(c.slug)).map((c) => c.name);
  const categoryNames = categories
    .filter((c) => state.categories.includes(c.slug))
    .map((c) => c.name);
  const context = [categoryNames.join(", "), communeNames.join(", ")].filter(Boolean).join(" en ");

  return (
    <div className={styles.header}>
      <div className={styles.text}>
        <h2 id="results-heading" className={styles.title}>
          {state.q ? <>Resultados para “{state.q}”</> : "Todas las publicaciones"}
        </h2>
        {context && <p className={styles.context}>{context}</p>}
      </div>
      <ViewToggle state={state} />
    </div>
  );
}
