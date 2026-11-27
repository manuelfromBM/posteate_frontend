import { whatsappUrl } from "@/shared/lib/whatsapp";

import { WhatsAppIcon } from "./icons";
import styles from "./WhatsAppButton.module.css";

const ICON_SIZE = { sm: 18, md: 22, lg: 28 } as const;

interface WhatsAppButtonProps {
  phone: string;
  message?: string;
  // Accessible name, since the button only shows the logo.
  label: string;
  size?: "sm" | "md" | "lg";
  // Shows the label next to the logo, as a wide button.
  showLabel?: boolean;
}

export function WhatsAppButton({
  phone,
  message,
  label,
  size = "md",
  showLabel = false,
}: WhatsAppButtonProps) {
  return (
    <a
      href={whatsappUrl(phone, message)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={showLabel ? undefined : label}
      title={showLabel ? undefined : label}
      className={styles.button}
      data-size={size}
      data-wide={showLabel || undefined}
    >
      <WhatsAppIcon size={ICON_SIZE[size]} />
      {showLabel && <span>{label}</span>}
    </a>
  );
}
