"use client";

import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";

const ITEMS = [
  { href: "/about", key: "aboutBidhra" },
  { href: "/about/our-story", key: "ourStory" },
  { href: "/about/team", key: "ourTeam" },
  { href: "/about/transparency", key: "trustTransparency" },
] as const;

// Shared navigation for the Who We Are pages, directly under the site
// header. The current page gets a green underline; on narrow screens the row
// scrolls sideways instead of wrapping.
export function AboutSubnav() {
  const t = useTranslations("Nav");
  const pathname = usePathname();
  const rowRef = useRef<HTMLDivElement>(null);

  // On narrow screens bring the current page's tab into view, so pages
  // further along the row (e.g. Trust & Transparency) show their own tab.
  useEffect(() => {
    const row = rowRef.current;
    const active = row?.querySelector<HTMLElement>('[aria-current="page"]');
    if (!row || !active) return;
    const offset = active.offsetLeft - (row.clientWidth - active.offsetWidth) / 2;
    row.scrollTo({ left: Math.max(0, offset) });
  }, [pathname]);

  return (
    <nav
      aria-label={t("whoWeAre")}
      className="border-b border-foreground/10"
    >
      <div ref={rowRef} className="no-scrollbar mx-auto flex w-full max-w-6xl items-stretch gap-1 overflow-x-auto px-4 sm:gap-2 sm:px-8">
        <span className="flex shrink-0 items-center pe-3 text-sm font-semibold text-foreground sm:pe-6">
          {t("whoWeAre")}
        </span>
        <span aria-hidden className="my-3.5 w-px shrink-0 bg-foreground/15" />
        {ITEMS.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={active ? "page" : undefined}
              className={
                "relative flex shrink-0 items-center whitespace-nowrap px-3 py-4 text-sm transition focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-accent sm:px-4 " +
                (active
                  ? "font-semibold text-foreground after:absolute after:inset-x-3 after:bottom-0 after:h-0.5 after:rounded-full after:bg-accent sm:after:inset-x-4"
                  : "text-muted-foreground hover:text-foreground")
              }
            >
              {t(item.key)}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
