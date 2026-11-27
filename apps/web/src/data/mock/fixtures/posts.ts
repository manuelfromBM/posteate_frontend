import type {
  AccountType,
  Category,
  Commune,
  Post,
  PostLocation,
  PostStatus,
  Price,
} from "@/domain";

import { sectorsByCommune } from "./communes";
import { createRandom, type Random } from "./random";
import { authorNames, templatesByCategory, type PostTemplate } from "./templates";

const DAY_MS = 24 * 60 * 60 * 1000;

interface GenerateOptions {
  communes: Commune[];
  categories: Category[];
  count: number;
  seed: number;
  now?: Date;
}

// Builds a deterministic set of posts that covers every commune, category,
// price form and status, so the UI can be exercised with realistic volume.
export function generatePosts({
  communes,
  categories,
  count,
  seed,
  now = new Date(),
}: GenerateOptions): Post[] {
  const random = createRandom(seed);
  const withTemplates = categories.filter((c) => templatesByCategory[c.slug]?.length);

  return Array.from({ length: count }, (_, index) => {
    const category = random.pick(withTemplates);
    const template = random.pick(templatesByCategory[category.slug] ?? []);
    return buildPost({ index, category, template, communes, random, now });
  });
}

interface BuildPostInput {
  index: number;
  category: Category;
  template: PostTemplate;
  communes: Commune[];
  random: Random;
  now: Date;
}

function buildPost({ index, category, template, communes, random, now }: BuildPostInput): Post {
  const postCommunes =
    template.multiCommune && random.chance(0.6)
      ? random.sample(communes, random.int(2, 3))
      : [random.pick(communes)];
  const mainCommune = postCommunes[0] ?? random.pick(communes);

  const sectors = sectorsByCommune[mainCommune.slug] ?? [];
  const sector = sectors.length > 0 && random.chance(0.6) ? random.pick(sectors) : undefined;

  const publishedAt = new Date(now.getTime() - random.int(0, 35 * 24 * 60) * 60 * 1000);
  const expiresAt = new Date(publishedAt.getTime() + random.int(7, 60) * DAY_MS);

  const source = random.chance(0.12) ? "curated" : "account";
  const accountType: AccountType =
    template.accountType ?? (random.chance(0.15) ? "business" : "person");

  return {
    id: `p${String(index + 1).padStart(4, "0")}`,
    title: template.title,
    description: template.description,
    category,
    communes: postCommunes,
    sector,
    location: buildLocation(index, mainCommune, sector),
    price: template.price ? buildPrice(template.price, random) : undefined,
    imageUrls: buildImageUrls(index),
    status: pickStatus(expiresAt, now, random),
    publishedAt: publishedAt.toISOString(),
    expiresAt: expiresAt.toISOString(),
    source,
    author:
      source === "curated"
        ? undefined
        : { displayName: random.pick(authorNames[accountType]), accountType },
    contactWhatsapp: `569${random.int(10000000, 99999999)}`,
    contactEmail: buildContactEmail(index),
  };
}

// Placeholder photos (picsum.photos, seeded so each post keeps its images).
// About 1 in 5 posts has no images, so the card is also exercised without them.
// Uses its own PRNG so it does not shift the rest of the generated data.
function buildImageUrls(index: number): string[] {
  const random = createRandom(index + 1);
  if (random.chance(0.2)) return [];
  const id = `p${String(index + 1).padStart(4, "0")}`;
  return Array.from(
    { length: random.int(1, 4) },
    (_, n) => `https://picsum.photos/seed/${id}-${n}/800/600`,
  );
}

// About 2 in 5 posts have a contact email. Own PRNG, like the images.
// Uses the reserved example.com domain so no real address is ever generated.
function buildContactEmail(index: number): string | undefined {
  const random = createRandom((index + 1) * 7919);
  if (!random.chance(0.4)) return undefined;
  return `contacto${String(index + 1).padStart(4, "0")}@example.com`;
}

// About half of the posts have a place picked in Google Maps, near their main
// commune's center. Own PRNG, like the images, so the rest of the data stays put.
// The place ids are fake: the map only uses the position.
const LOCATION_SPREAD_DEGREES = 0.025; // ~2.5 km around the commune center

function buildLocation(
  index: number,
  commune: Commune,
  sector: string | undefined,
): PostLocation | undefined {
  const random = createRandom((index + 1) * 104729);
  if (!random.chance(0.5)) return undefined;
  const offset = () => (random.next() * 2 - 1) * LOCATION_SPREAD_DEGREES;
  return {
    placeId: `mock-place-${index + 1}`,
    address: `${sector ? `${sector}, ` : ""}${commune.name}, Chile`,
    position: { lat: commune.center.lat + offset(), lng: commune.center.lng + offset() },
  };
}

function buildPrice(spec: NonNullable<PostTemplate["price"]>, random: Random): Price {
  const round = (value: number) => {
    const step = value >= 1_000_000 ? 100_000 : value >= 100_000 ? 10_000 : 1_000;
    return Math.round(value / step) * step;
  };

  if (spec.kind === "fixed") {
    return {
      type: "fixed",
      amount: round(spec.min + random.next() * (spec.max - spec.min)),
    };
  }
  const min = round(spec.min * (0.9 + random.next() * 0.2));
  return { type: "range", min, max: Math.max(round(spec.max), min) };
}

function pickStatus(expiresAt: Date, now: Date, random: Random): PostStatus {
  if (expiresAt <= now) return "expired";
  if (random.chance(0.05)) return "paused";
  if (random.chance(0.06)) return "closed";
  return "active";
}
