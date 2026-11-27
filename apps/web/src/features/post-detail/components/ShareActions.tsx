"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";

import { whatsappShareUrl } from "@/shared/lib/whatsapp";
import { LinkIcon, ShareIcon, WhatsAppIcon } from "@/shared/ui/icons";

import styles from "./ShareActions.module.css";

interface ShareActionsProps {
  url: string;
  title: string;
}

const COPIED_FEEDBACK_MS = 2000;

// Web Share support never changes at runtime; false on the server.
const noopSubscribe = () => () => {};
const useCanShare = () =>
  useSyncExternalStore(
    noopSubscribe,
    () => typeof navigator.share === "function",
    () => false,
  );

// Sharing requires no account (see docs/IA/principles.md). Uses the native
// share sheet when the device has one, and copying the link otherwise.
export function ShareActions({ url, title }: ShareActionsProps) {
  const canShare = useCanShare();
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => () => clearTimeout(timer.current), []);

  const share = async () => {
    try {
      await navigator.share({ title, url });
    } catch {
      // Dismissed by the person: nothing to do.
    }
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), COPIED_FEEDBACK_MS);
    } catch {
      window.prompt("Copia el link de la publicación:", url);
    }
  };

  return (
    <div className={styles.actions}>
      <a
        href={whatsappShareUrl(`${title} — mira esta publicación en Posteate: ${url}`)}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.action}
      >
        <WhatsAppIcon size={18} />
        Compartir por WhatsApp
      </a>
      {canShare ? (
        <button type="button" className={styles.action} onClick={share}>
          <ShareIcon size={18} />
          Compartir
        </button>
      ) : (
        <button type="button" className={styles.action} onClick={copy}>
          <LinkIcon size={18} />
          <span aria-live="polite">{copied ? "¡Link copiado!" : "Copiar link"}</span>
        </button>
      )}
    </div>
  );
}
