import Image from "next/image";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Reveal } from "@/components/reveal";
import { Parallax } from "@/components/parallax";

type ProblemKey = "collapse" | "displacement" | "aid" | "unemployment";

const PROBLEM_KEYS: ProblemKey[] = [
  "collapse",
  "displacement",
  "aid",
  "unemployment",
];

type StepKey = "apply" | "verify" | "fund" | "build" | "forest";

const STEP_KEYS: StepKey[] = ["apply", "verify", "fund", "build", "forest"];

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const tHero = await getTranslations("Hero");
  const tProblems = await getTranslations("Problems");
  const tManifesto = await getTranslations("Manifesto");
  const tHow = await getTranslations("HowItWorks");

  const exampleKeys = ["bakery", "seamstress", "shop"] as const;

  return (
    <div className="flex flex-1 flex-col bg-background font-sans">
      <main className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-8 sm:py-28">
        <Reveal direction="fade">
          <section
            aria-label={tHero("line")}
            className="mb-24 sm:mb-32"
          >
            <div className="grid grid-cols-1 items-center gap-6 md:grid-cols-[1fr_auto_1fr] md:gap-0">
              <Parallax speed={0.12} className="w-full">
                <figure className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-muted">
                  <Image
                    src="/hero/after.jpeg"
                    alt={tHero("beforeAlt")}
                    fill
                    priority
                    sizes="(min-width: 768px) 40vw, 100vw"
                    className="object-cover"
                  />
                  <figcaption className="absolute bottom-3 left-3 inline-flex items-center rounded-full bg-background/85 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.25em] text-foreground/80 backdrop-blur">
                    {tHero("beforeCaption")}
                  </figcaption>
                </figure>
              </Parallax>

              <div className="relative flex items-center justify-center md:h-full md:px-8">
                <span
                  aria-hidden
                  className="absolute hidden h-full w-px bg-gradient-to-b from-transparent via-border to-transparent md:block"
                />
                <span
                  aria-hidden
                  className="block h-px w-full bg-gradient-to-r from-transparent via-border to-transparent md:hidden"
                />
                <p className="float-soft relative max-w-[18ch] text-balance bg-background px-3 py-2 text-center text-sm font-medium leading-snug tracking-tight text-foreground sm:text-lg md:max-w-[14ch] md:px-3 md:py-6">
                  {tHero("line")}
                </p>
              </div>

              <Parallax speed={-0.12} className="w-full">
                <figure className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-muted">
                  <Image
                    src="/hero/before.png"
                    alt={tHero("afterAlt")}
                    fill
                    priority
                    sizes="(min-width: 768px) 40vw, 100vw"
                    className="object-cover grayscale"
                  />
                  <figcaption className="absolute bottom-3 left-3 inline-flex items-center rounded-full bg-background/85 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.25em] text-foreground/80 backdrop-blur">
                    {tHero("afterCaption")}
                  </figcaption>
                </figure>
              </Parallax>
            </div>
          </section>
        </Reveal>

        <Reveal direction="up">
          <header className="flex flex-col gap-6 pb-16">
            <span className="seed-badge inline-flex items-center gap-2.5 self-start rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-accent">
              <span className="relative flex h-2 w-2 items-center justify-center">
                <span className="seed-halo absolute h-2 w-2 rounded-full bg-accent" />
                <span className="seed-dot relative h-2 w-2 rounded-full bg-accent" />
              </span>
              {tProblems("eyebrow")}
            </span>
            <h1 className="max-w-3xl text-balance text-3xl font-semibold leading-[1.1] tracking-tight text-foreground sm:text-5xl md:text-[3.75rem]">
              {tProblems("heading")}
            </h1>
            <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-2xl">
              {tProblems("subheading")}
            </p>
          </header>
        </Reveal>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
          {PROBLEM_KEYS.map((key, i) => (
            <Reveal
              key={key}
              direction="up"
              delay={i * 90}
              className="h-full"
            >
              <article
                className="group relative flex h-full flex-col gap-4 overflow-hidden rounded-2xl border border-border bg-muted/40 p-5 transition duration-300 hover:-translate-y-1 hover:border-accent/40 hover:bg-muted/60 hover:shadow-lg sm:gap-5 sm:p-8"
              >
                <div className="flex items-center justify-between">
                  <span className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-border bg-background text-xs font-semibold text-muted-foreground">
                    {tProblems(`items.${key}.label`)}
                  </span>
                  <span className="h-px flex-1 mx-4 bg-border" />
                </div>

                <p className="text-balance text-5xl font-semibold leading-none tracking-tight text-accent sm:text-7xl">
                  {tProblems(`items.${key}.stat`)}
                </p>

                <p className="text-sm leading-relaxed text-muted-foreground">
                  {tProblems(`items.${key}.statCaption`)}
                </p>

                <div className="mt-2 flex flex-col gap-3 border-t border-border pt-5">
                  <h2 className="text-xl font-semibold leading-snug text-foreground sm:text-2xl">
                    {tProblems(`items.${key}.title`)}
                  </h2>
                  <p className="text-base leading-relaxed text-foreground/80">
                    {tProblems(`items.${key}.body`)}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal direction="up">
          <section className="mt-20 sm:mt-36">
            <div className="relative overflow-hidden rounded-3xl border border-border bg-muted/40 px-5 py-10 sm:px-12 sm:py-20">
              <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent"
              />
              <Parallax speed={-0.08} className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-accent/10 blur-3xl">
                <span className="sr-only" />
              </Parallax>
              <div className="relative flex flex-col gap-8">
                <span className="inline-flex items-center self-start rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-accent">
                  {tManifesto("eyebrow")}
                </span>
                <h2 className="max-w-3xl text-balance text-3xl font-semibold leading-[1.1] tracking-tight text-foreground sm:text-5xl md:text-[3.5rem]">
                  {tManifesto("heading")}
                </h2>
                <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-2xl">
                  {tManifesto("lede")}
                </p>

                <div className="mt-2 grid gap-8 border-t border-border pt-8 sm:gap-10 sm:pt-10 md:grid-cols-[1.2fr_1fr]">
                  <p className="text-base leading-relaxed text-foreground/85 sm:text-xl">
                    {tManifesto("body")}
                  </p>
                  <ul className="flex flex-col gap-4">
                    {exampleKeys.map((key, i) => (
                      <Reveal
                        key={key}
                        as="li"
                        direction="left"
                        delay={i * 120}
                        amount={16}
                        className="flex items-center gap-3 text-base text-foreground/90 sm:text-lg"
                      >
                        <span
                          aria-hidden
                          className="inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                        />
                        {tManifesto(`examples.${key}`)}
                      </Reveal>
                    ))}
                  </ul>
                </div>

                <p className="mt-2 max-w-3xl text-balance text-lg font-medium leading-snug tracking-tight text-foreground sm:text-2xl">
                  {tManifesto("closing")}
                </p>
              </div>
            </div>
          </section>
        </Reveal>

        <section className="mt-20 sm:mt-36">
          <Reveal direction="up">
            <header className="flex flex-col gap-4 pb-10 sm:gap-6 sm:pb-12">
              <span className="inline-flex items-center self-start rounded-full border border-border bg-muted/60 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground">
                {tHow("eyebrow")}
              </span>
              <h2 className="max-w-3xl text-3xl font-semibold leading-tight tracking-tight text-foreground sm:text-4xl md:text-5xl">
                {tHow("heading")}
              </h2>
            </header>
          </Reveal>

          <ol className="flex flex-col">
            {STEP_KEYS.map((key, i) => {
              const isLast = i === STEP_KEYS.length - 1;
              return (
                <Reveal
                  key={key}
                  as="li"
                  direction="up"
                  delay={i * 100}
                  amount={20}
                  className="flex gap-4 sm:gap-7"
                >
                  <div className="flex flex-col items-center">
                    <span className="z-10 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent text-sm font-semibold text-accent-foreground transition-transform duration-300 hover:scale-110 sm:h-14 sm:w-14 sm:text-base">
                      {tHow(`steps.${key}.number`)}
                    </span>
                    {!isLast && (
                      <span
                        aria-hidden
                        className="my-2 w-px flex-1 bg-gradient-to-b from-accent/40 via-border to-border"
                      />
                    )}
                  </div>
                  <div
                    className={`flex flex-1 flex-col gap-3 ${
                      isLast ? "pb-2" : "pb-10 sm:pb-12"
                    } pt-1 sm:pt-2`}
                  >
                    <h3 className="text-lg font-semibold leading-snug text-foreground sm:text-2xl">
                      {tHow(`steps.${key}.title`)}
                    </h3>
                    <p className="max-w-2xl text-base leading-relaxed text-foreground/80 sm:text-lg">
                      {tHow.rich(`steps.${key}.body`, {
                        promise: (chunks) => (
                          <span className="promise-highlight">{chunks}</span>
                        ),
                      })}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </ol>

          <Reveal direction="up">
            <p className="mt-10 max-w-3xl text-balance text-xl font-medium leading-snug tracking-tight text-foreground sm:mt-12 sm:text-3xl">
              {tHow("closing")}
            </p>
          </Reveal>
        </section>
      </main>
    </div>
  );
}
