import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { LocaleSwitcher } from "./locale-switcher";

export async function SiteHeader() {
  const t = await getTranslations("Nav");

  return (
    <header className="sticky top-0 z-10 w-full border-b border-border bg-background/80 backdrop-blur">
      <div className="grid w-full grid-cols-[auto_1fr] items-center gap-4 px-4 py-3 sm:px-6 lg:px-10 xl:px-14">
        <Link
          href="/"
          aria-label="Bidhra"
          className="inline-flex min-w-0 items-center justify-self-start"
        >
          <Image
            src="/logo.png"
            alt="Bidhra"
            width={1124}
            height={262}
            priority
            className="h-8 w-auto sm:h-9 lg:h-10"
          />
        </Link>
        <nav className="hidden min-w-0 items-center justify-self-end gap-x-2 text-sm md:flex">
          <Link
            href="/projects"
            className="whitespace-nowrap rounded-full px-2.5 py-1.5 text-muted-foreground transition hover:text-foreground lg:px-3"
          >
            {t("browse")}
          </Link>
          <Link
            href="/knowledge"
            className="whitespace-nowrap rounded-full px-2.5 py-1.5 text-muted-foreground transition hover:text-foreground lg:px-3"
          >
            {t("knowledge")}
          </Link>
          <Link
            href="/apply"
            className="whitespace-nowrap rounded-full px-2.5 py-1.5 text-muted-foreground transition hover:text-foreground lg:px-3"
          >
            {t("apply")}
          </Link>
          <LocaleSwitcher />
        </nav>
        <div className="flex min-w-0 items-center justify-self-end gap-1.5 text-sm sm:gap-2 md:hidden">
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
          <LocaleSwitcher />
        </div>
      </div>
    </header>
  );
}
