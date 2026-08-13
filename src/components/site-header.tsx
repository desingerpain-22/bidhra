import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

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
            href="/apply"
            className="whitespace-nowrap rounded-full px-2.5 py-1.5 text-muted-foreground transition hover:text-foreground lg:px-3"
          >
            {t("apply")}
          </Link>
          <a
            href="https://chuffed.org/donate/bidhra-project-turning-aid-into-palestinian-businesses-for-economic-recovery"
            target="_blank"
            rel="noreferrer"
            className="ms-2 inline-flex min-h-9 items-center justify-center whitespace-nowrap rounded-full bg-accent px-4 text-sm font-semibold text-accent-foreground shadow-lg shadow-accent/15 transition hover:-translate-y-0.5 hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
          >
            {t("cta")}
          </a>
        </nav>
        <div className="flex min-w-0 items-center justify-self-end gap-1.5 text-sm sm:gap-2 md:hidden">
          <Link
            href="/projects"
            className="rounded-full px-2 py-1.5 text-xs text-muted-foreground transition hover:text-foreground sm:text-sm md:hidden"
          >
            {t("browse")}
          </Link>
        </div>
      </div>
    </header>
  );
}
