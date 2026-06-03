import { setRequestLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { scholarships } from "@/lib/scholarships";
import type { Locale } from "@/i18n/routing";

export default async function ScholarshipsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Scholarships");
  const loc = locale as Locale;
  const numberFormatter = new Intl.NumberFormat(locale);

  return (
    <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-8 px-4 py-10 sm:gap-12 sm:px-6 sm:py-16">
      <header className="max-w-2xl">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-5xl">
          {t("title")}
        </h1>
        <p className="mt-3 text-base text-muted-foreground sm:text-lg">{t("subtitle")}</p>
      </header>
      <div className="grid gap-5 sm:grid-cols-2 sm:gap-6">
        {scholarships.map((s) => {
          const isGuidanceOnly = s.supportType === "guidance";
          const pct = isGuidanceOnly
            ? 0
            : Math.min(100, Math.round((s.raised / s.goal) * 100));
          const fullyFunded = !isGuidanceOnly && s.raised >= s.goal;
          return (
            <Link
              key={s.slug}
              href={`/scholarships/${s.slug}`}
              className="group flex flex-col gap-4 rounded-xl border border-border bg-background p-5 transition hover:border-accent hover:shadow-lg sm:p-6"
            >
              <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1 text-xs font-medium uppercase tracking-widest text-muted-foreground">
                <span>{s.fieldOfStudy[loc]}</span>
                <span>{s.location[loc]}</span>
              </div>
              <div>
                <span
                  className={
                    "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-medium " +
                    (s.supportType === "guidance"
                      ? "bg-emerald-100 text-emerald-900 dark:bg-emerald-950/60 dark:text-emerald-200"
                      : s.supportType === "both"
                        ? "bg-emerald-100 text-emerald-900 dark:bg-emerald-950/60 dark:text-emerald-200"
                        : "bg-muted text-foreground")
                  }
                >
                  {t(`supportBadge.${s.supportType}`)}
                </span>
              </div>
              <div>
                <h2 className="text-xl font-semibold leading-snug text-foreground">
                  {s.studentName}
                  <span className="ms-2 text-sm font-normal text-muted-foreground">
                    · {t("ageLabel", { age: s.age })}
                  </span>
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  {s.university[loc]} · {s.year[loc]}
                </p>
              </div>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {s.summary[loc]}
              </p>
              {isGuidanceOnly ? (
                <div className="mt-auto rounded-lg border border-border bg-muted/30 p-3 text-sm text-muted-foreground">
                  {s.guidanceAsk?.[loc]}
                </div>
              ) : (
                <div className="mt-auto flex flex-col gap-2">
                  <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                    <div
                      className="h-full bg-accent transition-all"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1 text-sm">
                    <span className="font-medium text-foreground">
                      ${numberFormatter.format(s.raised)}{" "}
                      <span className="text-muted-foreground">
                        {t("of")} ${numberFormatter.format(s.goal)}
                      </span>
                    </span>
                    {fullyFunded ? (
                      <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-medium text-emerald-900 dark:bg-emerald-950/60 dark:text-emerald-200">
                        {t("fullyFunded")}
                      </span>
                    ) : (
                      <span className="text-muted-foreground">
                        {numberFormatter.format(s.supporters)} {t("supporters")}
                      </span>
                    )}
                  </div>
                </div>
              )}
            </Link>
          );
        })}
      </div>
    </main>
  );
}
