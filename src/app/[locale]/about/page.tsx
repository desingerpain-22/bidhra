import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { aboutPage as c } from "@/lib/about-content";
import {
  ABOUT_CONTAINER,
  AboutHero,
  AboutIcon,
  SectionLabel,
} from "@/components/about/about-hero";
import { WithTatreezMap } from "@/components/about/tatreez-map";

export const metadata: Metadata = {
  title: "About Bidhra",
  description:
    "Bidhra turns aid and donations into real Palestinian businesses: what we do, why we exist, our mission, and how the model works.",
};

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main className="flex flex-1 flex-col">
      <AboutHero
        eyebrow={c.eyebrow}
        titleLines={c.titleLines}
        intro={c.intro}
        image={c.image}
        secondaryImage={c.secondaryImage}
        note={c.note}
      />

      {/* Principles: a full-width band between two rules, like the home
          page's impact numbers. */}
      <section id="principles" className="scroll-mt-32 border-y border-foreground/15 px-4 sm:px-8">
        <ul className="mx-auto grid max-w-6xl grid-cols-2 lg:grid-cols-4">
          {c.principles.map((p) => (
            <li
              key={p.title}
              className="flex flex-col items-center gap-3 border-foreground/10 px-3 py-10 text-center max-lg:odd:border-e max-lg:[&:nth-child(n+3)]:border-t sm:py-12 lg:border-s lg:px-6 lg:first:border-s-0"
            >
              <AboutIcon name={p.icon} className="h-7 w-7" />
              <h2 className="mt-2 text-base text-foreground sm:text-lg">
                <span className="font-semibold">{p.title}</span>
              </h2>
              <p className="max-w-[22ch] text-sm leading-relaxed text-muted-foreground">
                {p.body}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <WithTatreezMap>
        <div className={ABOUT_CONTAINER}>
          {/* Mission and vision */}
          <section id="mission" className="scroll-mt-32 py-20 sm:py-28">
            <SectionLabel>Mission &amp; vision</SectionLabel>
            <div className="mt-12 grid gap-12 md:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] md:gap-14">
              {[c.mission, c.vision].map((block, i) => (
                <div key={block.label} className={`flex flex-col ${i === 1 ? "md:col-start-3" : ""}`}>
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">
                    {block.label}
                  </p>
                  <p className="mt-5 text-pretty text-2xl font-semibold leading-snug tracking-[-0.02em] text-foreground sm:text-[1.875rem]">
                    {block.lede}
                  </p>
                  <p className="mt-5 max-w-prose text-pretty text-base leading-relaxed text-muted-foreground">
                    {block.body}
                  </p>
                </div>
              ))}
              <Divider />
            </div>
          </section>

          {/* Values: a numbered editorial table, like the home page's
              comparison. */}
          <section id="values" className="scroll-mt-32 border-t border-foreground/10 py-20 sm:py-28">
            <SectionLabel>{c.valuesLabel}</SectionLabel>
            <ol className="mx-auto mt-12 max-w-4xl border-y border-foreground/80">
              {c.values.map((v, i) => (
                <li
                  key={v.word}
                  className="grid grid-cols-[2.5rem_minmax(0,1fr)] gap-y-2 border-b border-foreground/10 py-7 last:border-b-0 sm:grid-cols-[3.5rem_11rem_minmax(0,1fr)] sm:gap-x-6 sm:py-8"
                >
                  <span className="pt-0.5 text-sm font-medium tabular-nums text-muted-foreground/80">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="text-lg text-foreground sm:text-xl">
                    <span className="font-bold">{v.word}</span>
                  </h3>
                  <p className="col-start-2 text-pretty text-base leading-relaxed text-muted-foreground sm:col-start-3">
                    {v.body}
                  </p>
                </li>
              ))}
            </ol>
          </section>
        </div>
      </WithTatreezMap>
    </main>
  );
}

// The home page's hairline divider with a small outlined diamond.
function Divider() {
  return (
    <div
      aria-hidden
      className="relative hidden items-center justify-center self-stretch md:col-start-2 md:row-start-1 md:flex"
    >
      <span className="h-full w-px bg-gradient-to-b from-transparent via-border to-transparent" />
      <span className="absolute h-2.5 w-2.5 rotate-45 border border-accent/40 bg-background" />
    </div>
  );
}
