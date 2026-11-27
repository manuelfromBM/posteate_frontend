"use client";

import { useCallback, useRef, useState } from "react";

import type { Commune } from "@/domain";
import { useHotkey } from "@/shared/hooks/useHotkey";
import { SearchIcon } from "@/shared/ui/icons";
import { VisuallyHidden } from "@/shared/ui/VisuallyHidden";

import { useSearchNavigation } from "../../hooks/useSearchNavigation";
import { searchHref, type SearchState } from "../../lib/searchState";
import { CommunePicker } from "./CommunePicker";
import styles from "./SearchBar.module.css";

interface SearchBarProps {
  state: SearchState;
  communes: Commune[];
}

export function SearchBar({ state, communes }: SearchBarProps) {
  const { navigate, isPending } = useSearchNavigation();
  const [query, setQuery] = useState(state.q);
  const [selected, setSelected] = useState(state.communes);
  const inputRef = useRef<HTMLInputElement>(null);

  useHotkey(
    "/",
    useCallback(() => inputRef.current?.focus(), []),
  );

  const submit = () => navigate(searchHref(state, { q: query.trim(), communes: selected }));

  return (
    <form
      role="search"
      className={styles.bar}
      onSubmit={(event) => {
        event.preventDefault();
        submit();
      }}
    >
      <label className={styles.field}>
        <SearchIcon />
        <VisuallyHidden>Buscar publicaciones</VisuallyHidden>
        <input
          ref={inputRef}
          type="search"
          name="q"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Arriendos, empleos, mascotas, servicios…"
          autoComplete="off"
          enterKeyHint="search"
          className={styles.input}
        />
        <kbd className={styles.kbd} aria-hidden>
          /
        </kbd>
      </label>

      <div className={styles.divider} aria-hidden />

      <CommunePicker
        communes={communes}
        selected={selected}
        onChange={setSelected}
        onApply={submit}
      />

      <button type="submit" className={styles.submit} disabled={isPending}>
        {isPending ? <span className={styles.spinner} aria-hidden /> : <SearchIcon />}
        <span className={styles.submitLabel}>Buscar</span>
      </button>
    </form>
  );
}
