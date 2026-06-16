import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import Image from "next/image";

export async function SiteFooter() {
  const t = await getTranslations("Footer");
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-border bg-background/80">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-4 py-12 sm:px-6 sm:py-16 md:grid-cols-[2fr_1fr_1fr] lg:px-10">
        <div className="flex flex-col gap-4">
          <Link href="/" aria-label="Bidhra" className="inline-flex w-fit">
            <Image
              src="/logo.png"
              alt="Bidhra"
              width={1124}
              height={262}
              className="h-7 w-auto opacity-90"
            />
          </Link>
          <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
            {t("mission")}
          </p>
          <p className="text-xs text-muted-foreground/60">{t("tagline")}</p>
        </div>

        <div className="flex flex-col gap-3">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            {t("linksHeading")}
          </p>
          <nav className="flex flex-col gap-2 text-sm">
            <Link href="/projects" className="text-foreground/70 hover:text-foreground transition">
              {t("browse")}
            </Link>
            <Link href="/apply" className="text-foreground/70 hover:text-foreground transition">
              {t("apply")}
            </Link>
            <Link href="/how-to-donate" className="text-foreground/70 hover:text-foreground transition">
              {t("howToDonate")}
            </Link>
            <Link href="/knowledge" className="text-foreground/70 hover:text-foreground transition">
              {t("knowledge")}
            </Link>
            <Link href="/scholarships" className="text-foreground/70 hover:text-foreground transition">
              {t("scholarships")}
            </Link>
          </nav>
        </div>

        <div className="flex flex-col gap-3">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            {t("legalHeading")}
          </p>
          <nav className="flex flex-col gap-2 text-sm">
            <Link href="/" className="text-foreground/70 hover:text-foreground transition">
              {t("mission2")}
            </Link>
            <a
              href="mailto:hello@bidhra.org"
              className="text-foreground/70 hover:text-foreground transition"
            >
              {t("contact")}
            </a>
          </nav>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-10">
          <p className="text-xs text-muted-foreground/60">
            {t("copyright", { year })}
          </p>
        </div>
      </div>
    </footer>
  );
}
