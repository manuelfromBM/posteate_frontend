"use client";

import { useEffect } from "react";

const TYPING_TAGS = new Set(["INPUT", "TEXTAREA", "SELECT"]);

// Runs the handler when the key is pressed while the user is not typing in a field.
export function useHotkey(key: string, handler: () => void) {
  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement;
      if (event.key !== key || TYPING_TAGS.has(target.tagName) || target.isContentEditable) {
        return;
      }
      event.preventDefault();
      handler();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [key, handler]);
}
