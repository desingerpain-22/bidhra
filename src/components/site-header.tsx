import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { LocaleSwitcher } from "./locale-switcher";

export async function SiteHeader() {
  const t = await getTranslations("Nav");

  return (
    <header className="sticky top-0 z-10 w-full border-b border-border bg-background/80 backdrop-blur">
      <div className="mx-auto flex w-full max-w-5xl items-center justify-between gap-2 px-3 py-3 sm:gap-3 sm:px-6 md:grid md:grid-cols-[1fr_auto_1fr]">
        <Link
          href="/"
          aria-label="Bidhra"
          className="inline-flex items-center md:justify-self-start"
        >
          <Image
            src="/logo.png"
            alt="Bidhra"
            width={1124}
            height={262}
            priority
            className="h-8 w-auto sm:h-9 md:h-10"
          />
        </Link>
        <nav className="hidden items-center gap-x-1 text-sm md:flex md:justify-self-center">
          <Link
            href="/projects"
            className="rounded-full px-2.5 py-1.5 text-muted-foreground transition hover:text-foreground"
          >
            {t("browse")}
          </Link>
          <Link
            href="/knowledge"
            className="rounded-full px-2.5 py-1.5 text-muted-foreground transition hover:text-foreground"
          >
            {t("knowledge")}
          </Link>
          <Link
            href="/apply"
            className="rounded-full px-2.5 py-1.5 text-muted-foreground transition hover:text-foreground"
          >
            {t("apply")}
          </Link>
        </nav>
        <div className="flex items-center gap-1.5 text-sm sm:gap-2 md:justify-self-end">
          <Link
            href="/projects"
            className="rounded-full px-2 py-1.5 text-xs text-muted-foreground transition hover:text-foreground sm:text-sm md:hidden"
          >
            {t("browse")}
          </Link>
          <Link
            href="/knowledge"
            className="hidden rounded-full px-2 py-1.5 text-xs text-muted-foreground transition hover:text-foreground sm:inline md:hidden"
          >
            {t("knowledge")}
          </Link>
          <Link
            href="/dashboard/offers"
            className="rounded-full bg-primary px-2.5 py-1.5 text-xs font-medium text-primary-foreground transition hover:opacity-90 sm:px-3 sm:text-sm"
          >
            {t("dashboard")}
          </Link>
          <LocaleSwitcher />
        </div>
      </div>
    </header>
  );
}
