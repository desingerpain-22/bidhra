"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type Slide = { src: string; alt: string };

type Props = {
  slides: Slide[];
  aspect?: string;
  intervalMs?: number;
  sizes?: string;
  priority?: boolean;
};

export function PortraitSlideshow({
  slides,
  aspect = "4/5",
  intervalMs = 4000,
  sizes = "100vw",
  priority,
}: Props) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (slides.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, intervalMs);
    return () => window.clearInterval(id);
  }, [slides.length, intervalMs]);

  return (
    <div
      className="relative w-full overflow-hidden bg-muted"
      style={{ aspectRatio: aspect } as React.CSSProperties}
      aria-roledescription="carousel"
    >
      {slides.map((slide, i) => (
        <Image
          key={slide.src}
          src={slide.src}
          alt={slide.alt}
          fill
          sizes={sizes}
          priority={priority && i === 0}
          className={
            "absolute inset-0 object-cover transition-opacity duration-[1200ms] ease-out " +
            (i === index ? "opacity-100" : "opacity-0")
          }
        />
      ))}

      <div className="pointer-events-none absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 gap-1.5">
        {slides.map((_, i) => (
          <span
            key={i}
            className={
              "h-1 w-6 rounded-full transition-colors duration-500 " +
              (i === index ? "bg-white/90" : "bg-white/30")
            }
          />
        ))}
      </div>
    </div>
  );
}
