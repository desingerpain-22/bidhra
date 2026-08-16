"use client";

import { useEffect, useState } from "react";

export function AboutRailNav({
  items,
}: {
  items: Array<{ id: string; label: string }>;
}) {
  const [activeId, setActiveId] = useState(items[0]?.id);

  useEffect(() => {
    const sections = items
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        }
      },
      { rootMargin: "-20% 0px -70% 0px" },
    );

    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [items]);

  return (
    <nav className="flex gap-1.5 overflow-x-auto pb-1 lg:flex-col lg:gap-0.5 lg:overflow-visible lg:pb-0">
      {items.map((item) => (
        <a
          key={item.id}
          href={`#${item.id}`}
          className={
            "shrink-0 whitespace-nowrap rounded-full px-3 py-2 font-mono text-xs tracking-wide transition lg:rounded-none lg:border-s-2 lg:px-0 lg:ps-3.5 lg:py-2 " +
            (activeId === item.id
              ? "bg-muted text-accent lg:border-accent lg:bg-transparent"
              : "text-muted-foreground hover:text-foreground lg:border-transparent")
          }
        >
          {item.label}
        </a>
      ))}
    </nav>
  );
}
