"use client";

import { useCallback, useId, useRef, useState } from "react";

import type { Commune } from "@/domain";
import { useDismiss } from "@/shared/hooks/useDismiss";
import { CheckIcon, ChevronDownIcon, PinIcon } from "@/shared/ui/icons";

import { toggleValue } from "../../lib/searchState";
import styles from "./CommunePicker.module.css";

interface CommunePickerProps {
  communes: Commune[];
  selected: string[];
  onChange: (slugs: string[]) => void;
  onApply: () => void;
}

export function CommunePicker({ communes, selected, onChange, onApply }: CommunePickerProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const panelId = useId();

  const close = useCallback(() => setOpen(false), []);
  useDismiss(rootRef, open, close);

  const label =
    selected.length === 0
      ? "Todas las comunas"
      : selected.length === 1
        ? (communes.find((c) => c.slug === selected[0])?.name ?? "1 comuna")
        : `${selected.length} comunas`;

  return (
    <div className={styles.root} ref={rootRef}>
      <button
        type="button"
        className={styles.trigger}
        aria-expanded={open}
        aria-controls={panelId}
        data-active={selected.length > 0 || undefined}
        onClick={() => setOpen((value) => !value)}
      >
        <PinIcon size={18} />
        <span className={styles.label}>{label}</span>
        <ChevronDownIcon size={16} />
      </button>

      {open && (
        <div className={styles.panel} id={panelId}>
          <p className={styles.title}>¿Dónde buscas?</p>
          <ul className={styles.list}>
            {communes.map((commune) => {
              const checked = selected.includes(commune.slug);
              return (
                <li key={commune.id}>
                  <label className={styles.option} data-checked={checked || undefined}>
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => onChange(toggleValue(selected, commune.slug))}
                    />
                    <span className={styles.check} aria-hidden>
                      <CheckIcon size={12} strokeWidth={3} />
                    </span>
                    {commune.name}
                  </label>
                </li>
              );
            })}
          </ul>
          <div className={styles.actions}>
            <button type="button" className={styles.clear} onClick={() => onChange([])}>
              Limpiar
            </button>
            <button
              type="button"
              className={styles.apply}
              onClick={() => {
                setOpen(false);
                onApply();
              }}
            >
              Aplicar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
