"use client";

import { useEffect, useRef, type ReactNode } from "react";

type ParallaxProps = {
  children: ReactNode;
  className?: string;
  maxOffset?: number;
  speed?: number;
};

export function Parallax({
  children,
  className = "",
  maxOffset = 72,
  speed = 0.2,
}: ParallaxProps) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    let current = 0;
    let target = 0;

    const clamp = (value: number) =>
      Math.max(-maxOffset, Math.min(maxOffset, value));

    const measure = () => {
      const rect = el.getBoundingClientRect();
      const viewportH = window.innerHeight || document.documentElement.clientHeight;
      const center = rect.top + rect.height / 2;
      const progress = (center - viewportH / 2) / viewportH;
      target = clamp(-progress * speed * 100);
    };

    const animate = () => {
      current += (target - current) * 0.14;
      if (Math.abs(target - current) < 0.1) current = target;
      el.style.setProperty("--parallax-y", `${current.toFixed(2)}px`);

      if (current !== target) {
        raf = requestAnimationFrame(animate);
      } else {
        raf = 0;
      }
    };

    const onScroll = () => {
      measure();
      if (!raf) raf = requestAnimationFrame(animate);
    };

    measure();
    current = target;
    el.style.setProperty("--parallax-y", `${current.toFixed(2)}px`);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [speed]);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        transform: "translate3d(0, var(--parallax-y, 0), 0)",
        willChange: "transform",
      }}
    >
      {children}
    </div>
  );
}
