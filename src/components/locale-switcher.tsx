"use client";

import { useTransition } from "react";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";

export function LocaleSwitcher() {
  const t = useTranslations("LocaleSwitcher");
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  function onChange(next: Locale) {
    if (next === locale) return;
    startTransition(() => {
      router.replace(pathname, { locale: next });
    });
  }

  return (
    <div
      role="group"
      aria-label={t("label")}
      className="inline-flex items-center gap-0.5 rounded-full border border-border bg-background/60 p-0.5 text-xs backdrop-blur sm:gap-1 sm:p-1 sm:text-sm"
      data-pending={isPending || undefined}
    >
      {routing.locales.map((l) => {
        const active = l === locale;
        return (
          <button
            key={l}
            type="button"
            onClick={() => onChange(l)}
            aria-pressed={active}
            className={
              active
                ? "rounded-full bg-primary px-2 py-1 font-medium text-primary-foreground transition sm:px-3"
                : "rounded-full px-2 py-1 text-muted-foreground transition hover:text-foreground sm:px-3"
            }
          >
            {t(l)}
          </button>
        );
      })}
    </div>
  );
}
