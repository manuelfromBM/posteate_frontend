import { mailtoUrl } from "@/shared/lib/email";

import styles from "./EmailButton.module.css";
import { MailIcon } from "./icons";

const ICON_SIZE = { sm: 17, md: 20, lg: 24 } as const;

interface EmailButtonProps {
  email: string;
  subject?: string;
  body?: string;
  // Accessible name, since the round button only shows the icon.
  label: string;
  size?: "sm" | "md" | "lg";
  // Shows the label next to the icon, as a wide button.
  showLabel?: boolean;
}

// Same shape as WhatsAppButton, in the neutral palette (green is reserved for WhatsApp).
export function EmailButton({
  email,
  subject,
  body,
  label,
  size = "md",
  showLabel = false,
}: EmailButtonProps) {
  return (
    <a
      href={mailtoUrl(email, subject, body)}
      aria-label={showLabel ? undefined : label}
      title={showLabel ? undefined : label}
      className={styles.button}
      data-size={size}
      data-wide={showLabel || undefined}
    >
      <MailIcon size={ICON_SIZE[size]} />
      {showLabel && <span>{label}</span>}
    </a>
  );
}
