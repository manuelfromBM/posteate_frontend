import type { Metadata } from "next";

import type { Post } from "@/domain";
import { isAvailable } from "@/domain";
import { postHref } from "@/features/posts";
import { formatPrice } from "@/shared/lib/format";
import { truncate } from "@/shared/lib/text";

const DESCRIPTION_LENGTH = 160;

// Title, description and image for SEO and share previews (WhatsApp, Facebook).
export function buildPostMetadata(post: Post): Metadata {
  const communes = post.communes.map((c) => c.name).join(", ");
  const price = post.price ? `${formatPrice(post.price)} · ` : "";
  const description = truncate(`${price}${communes}. ${post.description}`, DESCRIPTION_LENGTH);
  const cover = post.imageUrls[0];

  return {
    title: post.title,
    description,
    alternates: { canonical: postHref(post.id) },
    // Unavailable posts keep their URL but should drop out of search engines.
    robots: isAvailable(post) ? undefined : { index: false, follow: true },
    openGraph: {
      type: "article",
      title: post.title,
      description,
      url: postHref(post.id),
      siteName: "Posteate",
      locale: "es_CL",
      images: cover ? [{ url: cover, alt: post.title }] : undefined,
    },
    twitter: {
      card: cover ? "summary_large_image" : "summary",
      title: post.title,
      description,
    },
  };
}
