import type { Price } from "@/domain";

const clp = new Intl.NumberFormat("es-CL", {
  style: "currency",
  currency: "CLP",
  maximumFractionDigits: 0,
});

export const formatPrice = (price: Price): string =>
  price.type === "fixed"
    ? clp.format(price.amount)
    : `${clp.format(price.min)} – ${clp.format(price.max)}`;

const longDate = new Intl.DateTimeFormat("es-CL", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

// "27 de noviembre de 2026"
export const formatDate = (iso: string): string => longDate.format(new Date(iso));

const relative = new Intl.RelativeTimeFormat("es-CL", { numeric: "auto" });
const DAY_MS = 24 * 60 * 60 * 1000;

export function formatRelativeDate(iso: string, now: Date = new Date()): string {
  const days = Math.round((new Date(iso).getTime() - now.getTime()) / DAY_MS);
  if (Math.abs(days) < 1) return "hoy";
  if (Math.abs(days) < 7) return relative.format(days, "day");
  if (Math.abs(days) < 30) return relative.format(Math.round(days / 7), "week");
  return relative.format(Math.round(days / 30), "month");
}

export const formatCount = (count: number, singular: string, plural: string): string =>
  `${count.toLocaleString("es-CL")} ${count === 1 ? singular : plural}`;
