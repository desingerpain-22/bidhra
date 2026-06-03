import { notFound } from "next/navigation";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getScholarship, scholarships } from "@/lib/scholarships";
import { ScholarshipFunding } from "@/components/scholarship-funding";
import { ScholarshipGuidance } from "@/components/scholarship-guidance";
import type { Locale } from "@/i18n/routing";

export function generateStaticParams() {
  return scholarships.map((s) => ({ slug: s.slug }));
}

export default async function ScholarshipDetail({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const scholarship = getScholarship(slug);
  if (!scholarship) notFound();
  const t = await getTranslations("Scholarship");
  const loc = locale as Locale;

  return (
    <main className="mx-auto flex w-full max-w-4xl flex-1 flex-col gap-8 px-4 py-8 sm:gap-10 sm:px-6 sm:py-12">
      <Link
        href="/scholarships"
        className="text-sm text-muted-foreground hover:text-foreground"
      >
        {t("back")}
      </Link>

      <header className="flex flex-col gap-4">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-medium uppercase tracking-widest text-muted-foreground">
          <span>{scholarship.fieldOfStudy[loc]}</span>
          <span aria-hidden>·</span>
          <span>{scholarship.location[loc]}</span>
          {scholarship.verified && (
            <>
              <span aria-hidden>·</span>
              <span className="text-accent">{t("verified")}</span>
            </>
          )}
        </div>
        <h1 className="text-balance text-3xl font-semibold leading-tight tracking-tight text-foreground sm:text-5xl">
          {scholarship.studentName}
        </h1>
        <div>
          <span
            className={
              "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium " +
              (scholarship.supportType === "guidance"
                ? "bg-emerald-100 text-emerald-900 dark:bg-emerald-950/60 dark:text-emerald-200"
                : scholarship.supportType === "both"
                  ? "bg-emerald-100 text-emerald-900 dark:bg-emerald-950/60 dark:text-emerald-200"
                  : "bg-muted text-foreground")
            }
          >
            {t(`supportBadge.${scholarship.supportType}`)}
          </span>
        </div>
        <p className="text-base text-muted-foreground">
          {scholarship.university[loc]} · {scholarship.year[loc]} ·{" "}
          {t("ageLabel", { age: scholarship.age })}
        </p>
        <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
          {scholarship.summary[loc]}
        </p>
      </header>

      {scholarship.supportType !== "guidance" && (
        <ScholarshipFunding
          slug={scholarship.slug}
          studentName={scholarship.studentName}
          goal={scholarship.goal}
          initialRaised={scholarship.raised}
          initialSupporters={scholarship.supporters}
          daysLeft={scholarship.daysLeft}
          locale={locale}
        />
      )}

      {scholarship.guidanceAsk && (
        <ScholarshipGuidance
          slug={scholarship.slug}
          studentName={scholarship.studentName}
          ask={scholarship.guidanceAsk[loc]}
        />
      )}

      <article className="prose prose-neutral max-w-none whitespace-pre-line text-base leading-relaxed text-foreground">
        {scholarship.story[loc]}
      </article>

      <section className="grid gap-4 rounded-xl border border-border bg-muted/40 p-5 sm:grid-cols-3 sm:p-6">
        <div>
          <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
            {t("fieldLabel")}
          </p>
          <p className="mt-1 text-sm font-medium text-foreground">
            {scholarship.fieldOfStudy[loc]}
          </p>
        </div>
        <div>
          <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
            {t("universityLabel")}
          </p>
          <p className="mt-1 text-sm font-medium text-foreground">
            {scholarship.university[loc]}
          </p>
        </div>
        <div>
          <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
            {t("yearLabel")}
          </p>
          <p className="mt-1 text-sm font-medium text-foreground">
            {scholarship.year[loc]}
          </p>
        </div>
      </section>
    </main>
  );
}
