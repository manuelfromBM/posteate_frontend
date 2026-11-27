"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState, type KeyboardEvent } from "react";

import { ChevronLeftIcon, ChevronRightIcon, ImageIcon } from "@/shared/ui/icons";

import styles from "./ImageGallery.module.css";

interface ImageGalleryProps {
  images: string[];
  alt: string;
  // Edge to edge (no side borders or radius) on narrow screens.
  bleedOnMobile?: boolean;
}

// Swipeable on touch (CSS scroll snap), with arrows, thumbnails and keyboard
// navigation on desktop. The active index follows the scroll position.
export function ImageGallery({ images, alt, bleedOnMobile = false }: ImageGalleryProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const count = images.length;

  const goTo = useCallback((index: number) => {
    const track = trackRef.current;
    if (!track) return;
    const target = Math.max(0, Math.min(index, track.children.length - 1));
    track.scrollTo({ left: target * track.clientWidth, behavior: "smooth" });
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const onScroll = () => setActive(Math.round(track.scrollLeft / track.clientWidth));
    track.addEventListener("scroll", onScroll, { passive: true });
    return () => track.removeEventListener("scroll", onScroll);
  }, []);

  const onKeyDown = (event: KeyboardEvent) => {
    if (event.key === "ArrowRight") goTo(active + 1);
    if (event.key === "ArrowLeft") goTo(active - 1);
  };

  if (count === 0) {
    return (
      <div className={styles.empty} data-bleed={bleedOnMobile || undefined}>
        <ImageIcon size={40} />
        <span>Esta publicación no tiene fotos</span>
      </div>
    );
  }

  return (
    <section className={styles.gallery} aria-roledescription="carrusel" aria-label="Fotos">
      <div className={styles.viewport} data-bleed={bleedOnMobile || undefined}>
        <div
          ref={trackRef}
          className={styles.track}
          tabIndex={0}
          onKeyDown={onKeyDown}
          aria-label={`Foto ${active + 1} de ${count}. Usa las flechas para cambiar.`}
        >
          {images.map((src, index) => (
            <div
              key={src}
              className={styles.slide}
              aria-roledescription="foto"
              aria-label={`${index + 1} de ${count}`}
            >
              <Image
                src={src}
                alt={count > 1 ? `${alt} (foto ${index + 1} de ${count})` : alt}
                fill
                sizes="(max-width: 900px) 100vw, 720px"
                preload={index === 0}
                className={styles.image}
              />
            </div>
          ))}
        </div>

        {count > 1 && (
          <>
            <button
              type="button"
              className={styles.arrow}
              data-side="prev"
              onClick={() => goTo(active - 1)}
              disabled={active === 0}
              aria-label="Foto anterior"
            >
              <ChevronLeftIcon />
            </button>
            <button
              type="button"
              className={styles.arrow}
              data-side="next"
              onClick={() => goTo(active + 1)}
              disabled={active === count - 1}
              aria-label="Foto siguiente"
            >
              <ChevronRightIcon />
            </button>
            <span className={styles.counter} aria-hidden>
              {active + 1} / {count}
            </span>
          </>
        )}
      </div>

      {count > 1 && (
        <ul className={styles.thumbs}>
          {images.map((src, index) => (
            <li key={src}>
              <button
                type="button"
                className={styles.thumb}
                data-active={index === active || undefined}
                onClick={() => goTo(index)}
                aria-label={`Ver foto ${index + 1}`}
                aria-current={index === active || undefined}
              >
                <Image src={src} alt="" fill sizes="80px" className={styles.image} />
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
