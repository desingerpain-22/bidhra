"use client";

import { useEffect } from "react";

export function ParallaxBackdrop() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;

    const update = () => {
      raf = 0;
      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight || 1;
      const progress = Math.min(1, Math.max(0, window.scrollY / maxScroll));
      document.documentElement.style.setProperty(
        "--page-parallax-a",
        `${window.scrollY * -0.05}px`,
      );
      document.documentElement.style.setProperty(
        "--page-parallax-b",
        `${window.scrollY * 0.035}px`,
      );
      document.documentElement.style.setProperty(
        "--page-parallax-opacity",
        `${0.18 + progress * 0.1}`,
      );
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return <div aria-hidden className="page-parallax-backdrop" />;
}
