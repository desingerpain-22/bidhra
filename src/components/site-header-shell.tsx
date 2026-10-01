"use client";

import { useEffect, useState, type ReactNode } from "react";

// Transparent while the page is at the top, so the navbar blends into the
// hero; once scrolled it takes a warm translucent surface for readability.
export function SiteHeaderShell({ children }: { children: ReactNode }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 8);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <header
      data-scrolled={scrolled}
      className="site-header sticky top-0 z-10 w-full has-[[data-menu-open=true]]:z-[60] has-[[data-menu-open=true]]:bg-background border-b border-transparent transition-[background-color,border-color,backdrop-filter] duration-300 data-[scrolled=true]:border-border/60 data-[scrolled=true]:bg-background/80 data-[scrolled=true]:backdrop-blur-md"
    >
      {children}
    </header>
  );
}
