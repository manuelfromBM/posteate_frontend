import Link from "next/link";

import { PostCard } from "@/features/posts";
import { Carousel } from "@/shared/ui/Carousel";

import type { DiscoverySection } from "./getDiscoverySections";
import styles from "./DiscoverySections.module.css";

interface DiscoverySectionsProps {
  sections: DiscoverySection[];
}

export function DiscoverySections({ sections }: DiscoverySectionsProps) {
  if (sections.length === 0) return null;

  return (
    <div className={styles.sections}>
      {sections.map((section) => {
        const headingId = `discovery-${section.id}`;
        return (
          <section key={section.id} className={styles.section} aria-labelledby={headingId}>
            <div className={styles.header}>
              <div className={styles.text}>
                <h2 id={headingId} className={styles.title}>
                  {section.title}
                </h2>
                {section.subtitle && <p className={styles.subtitle}>{section.subtitle}</p>}
              </div>
              <Link href={section.href} className={styles.more} scroll={false}>
                Ver todo
              </Link>
            </div>
            <Carousel label={section.title}>
              {section.posts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </Carousel>
          </section>
        );
      })}
    </div>
  );
}
