"use client";

import { useEffect, useId, useState } from "react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";

// Navigation below lg: a menu button that opens a full-screen panel under
// the header with every page (Who We Are's four pages grouped) and the
// main call to action. Closes on link tap, Escape or route change, and
// locks page scroll while open.
export function MobileMenu() {
  const t = useTranslations("Nav");
  const pathname = usePathname();
  // The page the menu was opened on: it reads as open only on that page, so
  // any navigation (links, back button) closes it.
  const [openOn, setOpenOn] = useState<string | null>(null);
  const open = openOn === pathname;
  const setOpen = (value: boolean) => setOpenOn(value ? pathname : null);
  const panelId = useId();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpenOn(null);
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = overflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const groups: Array<{ heading?: string; links: Array<{ href: string; label: string }> }> = [
    {
      heading: t("whoWeAre"),
      links: [
        { href: "/about", label: t("aboutBidhra") },
        { href: "/about/our-story", label: t("ourStory") },
        { href: "/about/team", label: t("ourTeam") },
        { href: "/about/transparency", label: t("trustTransparency") },
      ],
    },
    {
      links: [
        { href: "/projects", label: t("browse") },
        { href: "/how-to-donate", label: t("howToDonateNav") },
      ],
    },
  ];

  return (
    <div data-menu-open={open} className="lg:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? t("closeMenu") : t("openMenu")}
        onClick={() => setOpen(!open)}
        className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-foreground/15 bg-surface/80 text-foreground backdrop-blur transition hover:bg-surface focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
      >
        <svg aria-hidden viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
          {open ? (
            <path d="M6 6l12 12M18 6 6 18" />
          ) : (
            <path d="M4 7h16M4 12h16M4 17h16" />
          )}
        </svg>
      </button>

      <div
        id={panelId}
        hidden={!open}
        className="fixed inset-x-0 bottom-0 top-[var(--site-header-h)] overflow-y-auto border-t border-foreground/10 bg-background"
      >
        <nav aria-label="Main" className="mx-auto flex max-w-xl flex-col px-6 pb-10 pt-6">
          {groups.map((group, i) => (
            <div key={i} className={i > 0 ? "mt-4 border-t border-foreground/10 pt-4" : ""}>
              {group.heading && (
                <p className="pb-2 text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                  {group.heading}
                </p>
              )}
              <ul>
                {group.links.map((link) => {
                  const active = pathname === link.href;
                  return (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        onClick={() => setOpen(false)}
                        aria-current={active ? "page" : undefined}
                        className={`flex min-h-12 items-center justify-between text-lg transition ${
                          active ? "font-semibold text-accent" : "text-foreground hover:text-accent"
                        }`}
                      >
                        {link.label}
                        <span aria-hidden className="text-muted-foreground rtl:-scale-x-100">
                          →
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}

          <Link
            href="/projects"
            onClick={() => setOpen(false)}
            className="mt-8 inline-flex min-h-13 items-center justify-center gap-2 rounded-full bg-accent px-7 py-3.5 text-base font-semibold text-accent-foreground shadow-lg shadow-accent/20 transition hover:opacity-90"
          >
            {t("fundCta")}
            <span aria-hidden className="inline-block rtl:-scale-x-100">
              →
            </span>
          </Link>
        </nav>
      </div>
    </div>
  );
}
