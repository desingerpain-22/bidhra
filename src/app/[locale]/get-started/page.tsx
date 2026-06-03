import { setRequestLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export default async function GetStarted({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("GetStarted");

  const cards: Array<{
    href: "/apply" | "/projects" | "/knowledge" | "/scholarships";
    heading: string;
    description: string;
    cta: string;
  }> = [
    {
      href: "/apply",
      heading: t("ownerHeading"),
      description: t("ownerDescription"),
      cta: t("ownerCta"),
    },
    {
      href: "/projects",
      heading: t("supporterHeading"),
      description: t("supporterDescription"),
      cta: t("supporterCta"),
    },
    {
      href: "/knowledge",
      heading: t("mentorHeading"),
      description: t("mentorDescription"),
      cta: t("mentorCta"),
    },
    {
      href: "/scholarships",
      heading: t("studentHeading"),
      description: t("studentDescription"),
      cta: t("studentCta"),
    },
  ];

  return (
    <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-8 px-4 py-12 sm:gap-12 sm:px-6 sm:py-20">
      <header className="max-w-2xl">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-5xl">
          {t("title")}
        </h1>
      </header>
      <div className="grid gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
        {cards.map((card) => (
          <Link
            key={card.href}
            href={card.href}
            className="group flex flex-col gap-4 rounded-xl border border-border bg-background p-6 transition hover:border-accent hover:shadow-lg sm:p-8"
          >
            <span className="text-xs font-medium uppercase tracking-widest text-accent">
              {card.heading}
            </span>
            <p className="text-base leading-relaxed text-foreground sm:text-lg">
              {card.description}
            </p>
            <span className="mt-auto inline-flex items-center text-sm font-medium text-foreground">
              {card.cta}{" "}
              <span className="ms-2 transition group-hover:translate-x-1 rtl:group-hover:-translate-x-1">
                →
              </span>
            </span>
          </Link>
        ))}
      </div>
    </main>
  );
}
