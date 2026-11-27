"use client";

import { Children, useCallback, useEffect, useRef, useState, type ReactNode } from "react";

import { ChevronLeftIcon, ChevronRightIcon } from "./icons";
import styles from "./Carousel.module.css";

interface CarouselProps {
  // Accessible name of the region, usually the section title.
  label: string;
  children: ReactNode;
}

// Horizontal list with scroll snap. Swipe on touch; arrow buttons on devices
// with a pointer. Items are rendered by the caller (they can be Server Components).
export function Carousel({ label, children }: CarouselProps) {
  const trackRef = useRef<HTMLUListElement>(null);
  const [edges, setEdges] = useState({ start: true, end: false });

  const updateEdges = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const maxScroll = track.scrollWidth - track.clientWidth;
    setEdges({ start: track.scrollLeft <= 1, end: track.scrollLeft >= maxScroll - 1 });
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const frame = requestAnimationFrame(updateEdges);
    const observer = new ResizeObserver(updateEdges);
    observer.observe(track);
    track.addEventListener("scroll", updateEdges, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      track.removeEventListener("scroll", updateEdges);
    };
  }, [updateEdges]);

  // Moves by roughly one visible "page" of items.
  const scroll = (direction: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    track.scrollBy({ left: direction * track.clientWidth * 0.85, behavior: "smooth" });
  };

  return (
    <div className={styles.carousel} role="region" aria-label={label}>
      <ul ref={trackRef} className={styles.track}>
        {Children.map(children, (child) => (
          <li className={styles.item}>{child}</li>
        ))}
      </ul>
      <button
        type="button"
        className={styles.arrow}
        data-side="prev"
        onClick={() => scroll(-1)}
        disabled={edges.start}
        aria-label="Anteriores"
      >
        <ChevronLeftIcon />
      </button>
      <button
        type="button"
        className={styles.arrow}
        data-side="next"
        onClick={() => scroll(1)}
        disabled={edges.end}
        aria-label="Siguientes"
      >
        <ChevronRightIcon />
      </button>
    </div>
  );
}
