import { setRequestLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export default async function HowToDonate({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("HowToDonate");

  const steps = [
    { heading: t("step1Heading"), body: t("step1Body"), note: null },
    { heading: t("step2Heading"), body: t("step2Body"), note: t("step2Note") },
    { heading: t("step3Heading"), body: t("step3Body"), note: null },
    { heading: t("step4Heading"), body: t("step4Body"), note: t("step4Note") },
    { heading: t("step5Heading"), body: t("step5Body"), note: null },
  ];

  const faqs = [
    { q: t("faq1Q"), a: t("faq1A") },
    { q: t("faq2Q"), a: t("faq2A") },
    { q: t("faq3Q"), a: t("faq3A") },
    { q: t("faq4Q"), a: t("faq4A") },
  ];

  return (
    <main className="mx-auto flex w-full max-w-2xl flex-col gap-12 px-4 py-12 sm:px-6 sm:py-16">
      <div>
        <Link
          href="/projects"
          className="text-sm text-muted-foreground hover:text-foreground"
        >
          {t("backToProjects")}
        </Link>
      </div>

      <header className="flex flex-col gap-3">
        <h1 className="text-3xl font-semibold leading-tight tracking-tight text-foreground sm:text-4xl">
          {t("title")}
        </h1>
        <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
          {t("subtitle")}
        </p>
      </header>

      <section className="flex flex-col gap-4 rounded-xl border border-border bg-muted/30 p-5 sm:p-6">
        <h2 className="text-lg font-semibold text-foreground">{t("whyHeading")}</h2>
        <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">{t("whyBody")}</p>
        <div className="mt-1 flex items-center gap-3 rounded-lg border border-accent/30 bg-accent/5 px-4 py-3">
          <span className="h-2 w-2 shrink-0 rounded-full bg-accent" />
          <div>
            <p className="text-sm font-semibold text-foreground">USDT · TRC-20 (Tron)</p>
            <p className="text-xs text-muted-foreground">
              {locale === "ar"
                ? "أقل الرسوم. أسرع تسوية. الطريقة الموصى بها."
                : "Lowest fees. Fastest settlement. Our recommended method."}
            </p>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-6">
        {steps.map((step, i) => (
          <div
            key={i}
            className="grid grid-cols-[auto_1fr] gap-4"
          >
            <div className="flex flex-col items-center gap-2">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent text-sm font-bold text-background">
                {i + 1}
              </div>
              {i < steps.length - 1 && (
                <div className="w-px flex-1 bg-border" />
              )}
            </div>
            <div className="flex flex-col gap-2 pb-6">
              <h3 className="text-base font-semibold text-foreground">{step.heading}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{step.body}</p>
              {step.note && (
                <div className="mt-1 rounded-lg border border-amber-500/30 bg-amber-500/5 px-4 py-3 text-sm text-amber-200">
                  ⚠ {step.note}
                </div>
              )}
            </div>
          </div>
        ))}
      </section>

      <section className="flex flex-col gap-5">
        <h2 className="text-xl font-semibold text-foreground">{t("faqHeading")}</h2>
        <dl className="divide-y divide-border rounded-xl border border-border">
          {faqs.map((faq, i) => (
            <div key={i} className="px-5 py-4">
              <dt className="text-sm font-semibold text-foreground">{faq.q}</dt>
              <dd className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{faq.a}</dd>
            </div>
          ))}
        </dl>
      </section>

      <div className="rounded-xl border border-accent/30 bg-accent/5 p-5 text-center">
        <p className="text-sm font-medium text-foreground">
          {locale === "ar" ? "مستعد للتبرع؟" : "Ready to donate?"}
        </p>
        <p className="mt-1 text-sm text-muted-foreground">
          {locale === "ar"
            ? "تصفّح المشاريع الموثّقة وادعم رائد أعمال فلسطيني."
            : "Browse verified projects and support a Palestinian entrepreneur."}
        </p>
        <Link
          href="/projects"
          className="mt-4 inline-flex h-10 items-center justify-center rounded-full bg-accent px-6 text-sm font-medium text-background transition hover:opacity-90"
        >
          {locale === "ar" ? "تصفّح المشاريع" : "Browse projects"}
        </Link>
      </div>
    </main>
  );
}
