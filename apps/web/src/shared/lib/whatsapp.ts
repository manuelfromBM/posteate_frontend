// Contact happens outside Posteate, through a WhatsApp link (see docs/IA/domain.md).
export const whatsappUrl = (phone: string, message?: string): string => {
  const base = `https://wa.me/${phone.replace(/\D/g, "")}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
};

// Opens WhatsApp so the person picks who to send the text to.
export const whatsappShareUrl = (text: string): string =>
  `https://wa.me/?text=${encodeURIComponent(text)}`;
