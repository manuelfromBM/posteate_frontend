import Link from "next/link";

import { ListIcon, MapIcon } from "@/shared/ui/icons";

import { searchHref, type SearchState, type SearchView } from "../lib/searchState";
import styles from "./ViewToggle.module.css";

const VIEWS: { view: SearchView; label: string; Icon: typeof ListIcon }[] = [
  { view: "list", label: "Lista", Icon: ListIcon },
  { view: "map", label: "Mapa", Icon: MapIcon },
];

interface ViewToggleProps {
  state: SearchState;
}

export function ViewToggle({ state }: ViewToggleProps) {
  return (
    <nav aria-label="Vista de resultados" className={styles.toggle}>
      {VIEWS.map(({ view, label, Icon }) => (
        <Link
          key={view}
          href={searchHref(state, { view })}
          className={styles.option}
          aria-current={state.view === view ? "page" : undefined}
          scroll={false}
        >
          <Icon size={18} />
          {label}
        </Link>
      ))}
    </nav>
  );
}
