import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { faqCategories } from "@/lib/faq";
import { AboutAtmosphere } from "@/components/about/about-frame";
import { Badge } from "@/components/about/about-hero";

export const metadata: Metadata = {
  title: "FAQs — Bidhra",
  description:
    "Answers to common questions about how Bidhra works, how donations are handled, and its fiscal sponsorship with Tech for Palestine.",
};

// FAQs, from the same content the chat assistant uses (src/lib/faq.ts):
// one block per topic, each question opening its answer in place.
export default async function FaqPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main className="relative isolate flex flex-1 flex-col">
      <AboutAtmosphere />
      <div className="mx-auto w-full max-w-3xl px-4 pb-20 pt-10 sm:px-8 sm:pb-28 sm:pt-14">
        <header className="flex flex-col items-center text-center">
          <Badge>FAQs</Badge>
          <h1 className="mt-6 text-balance text-foreground">Frequently asked questions</h1>
        </header>

        <div className="mt-14 flex flex-col gap-12">
          {faqCategories.map((category) => (
            <section key={category.id} id={category.id} aria-labelledby={`faq-${category.id}`} className="scroll-mt-28">
              <h2
                id={`faq-${category.id}`}
                className="text-xs font-semibold uppercase tracking-[0.22em] text-accent"
              >
                {category.title}
              </h2>
              <div className="mt-4 divide-y divide-foreground/10 border-y border-foreground/10">
                {category.entries.map((entry) => (
                  <details key={entry.question} className="group py-1">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 text-start text-lg font-semibold text-foreground transition hover:text-accent [&::-webkit-details-marker]:hidden">
                      {entry.question}
                      <span
                        aria-hidden
                        className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-foreground/15 text-base text-muted-foreground transition group-open:rotate-45"
                      >
                        +
                      </span>
                    </summary>
                    <p className="max-w-2xl pb-5 text-pretty text-base leading-relaxed text-muted-foreground">
                      {entry.answer}
                    </p>
                  </details>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}
