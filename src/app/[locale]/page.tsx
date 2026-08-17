import Image from "next/image";
import type { ReactNode } from "react";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Reveal } from "@/components/reveal";
import { Parallax } from "@/components/parallax";
import { Link } from "@/i18n/navigation";

type ComparisonKey = "capital" | "trust" | "aid" | "jobs" | "dependence";

const COMPARISON_KEYS: ComparisonKey[] = [
  "capital",
  "trust",
  "aid",
  "jobs",
  "dependence",
];

type StepKey = "apply" | "verify" | "fund" | "build" | "forest";

const STEP_KEYS: StepKey[] = ["apply", "verify", "fund", "build", "forest"];

const LINKEDIN_POSTS = [
  {
    id: "7473005846462033921",
    href: "https://www.linkedin.com/posts/mohammedhosni-ux_i-swear-your-donations-are-costing-palestinians-share-7473005846462033921-VVV7/",
  },
  {
    id: "7472258458294116353",
    href: "https://www.linkedin.com/posts/mohammedhosni-ux_want-to-destroy-palestinian-dignity-keep-share-7472258458294116353--lcO/",
  },
  {
    id: "7471827839370125312",
    href: "https://www.linkedin.com/posts/mohammedhosni-ux_if-youre-giving-donations-to-palestinians-share-7471827839370125312-8Sqd/",
  },
] as const;

const LINKEDIN_TICKER_POSTS = [...LINKEDIN_POSTS, ...LINKEDIN_POSTS] as const;

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const tHero = await getTranslations("Hero");
  const tNav = await getTranslations("Nav");
  const tTrust = await getTranslations("TrustSponsorship");
  const tSeedModel = await getTranslations("SeedModel");
  const tProblemSolution = await getTranslations("ProblemSolution");
  const tSocialProof = await getTranslations("SocialProof");
  const tHow = await getTranslations("HowItWorks");

  return (
    <div className="flex flex-1 flex-col bg-background font-sans">
      <main className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-8 sm:py-28">
        <Reveal direction="fade">
          <section
            aria-labelledby="home-hero-heading"
            className="mb-24 flex flex-col gap-10 sm:mb-32 sm:gap-14"
          >
            <header className="mx-auto flex w-full max-w-6xl flex-col items-center gap-5 overflow-hidden text-center">
              <h1
                id="home-hero-heading"
                className="max-w-full text-[clamp(2.75rem,7vw,5rem)] font-semibold leading-[1.05] tracking-tight text-foreground"
              >
                <span className="block 2xl:whitespace-nowrap">
                  <span className="hero-red-underline">
                    {tHero("headingEmphasis")}
                  </span>{" "}
                  {tHero("headingLine1Rest")}
                </span>
                <span className="block 2xl:whitespace-nowrap">
                  {tHero("headingLine2")}
                </span>
              </h1>
              <p className="max-w-3xl text-balance text-lg leading-relaxed text-muted-foreground sm:text-2xl">
                {tHero("subheading")}
              </p>
              <Link
                href="/projects"
                className="inline-flex min-h-12 items-center justify-center rounded-full bg-accent px-6 text-base font-semibold text-accent-foreground shadow-lg shadow-accent/15 transition hover:-translate-y-0.5 hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
              >
                {tNav("cta")}
              </Link>
            </header>

            <div className="grid grid-cols-1 items-center gap-6 md:grid-cols-[1fr_auto_1fr] md:gap-0">
              <Parallax speed={0.18} maxOffset={72} className="w-full">
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
              </div>

              <Parallax speed={-0.18} maxOffset={72} className="w-full">
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
          <section
            aria-labelledby="trust-sponsorship-heading"
            className="mb-24 flex flex-col items-center gap-6 text-center sm:mb-32 sm:gap-8"
          >
            <span className="inline-flex items-center rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-accent">
              {tTrust("eyebrow")}
            </span>
            <h2
              id="trust-sponsorship-heading"
              className="max-w-2xl text-balance text-2xl font-semibold leading-tight tracking-tight text-foreground sm:text-4xl"
            >
              {tTrust("title")}
            </h2>
            <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
              {tTrust("body")}
            </p>
            <div className="relative mt-2 aspect-[3834/1204] w-full max-w-xl overflow-hidden rounded-2xl border border-border bg-muted/20 p-6 sm:p-10">
              <Image
                src="/t4p-bidhra-wide.png"
                alt={tTrust("logoAlt")}
                fill
                sizes="(min-width: 640px) 36rem, 100vw"
                className="object-contain"
              />
            </div>
          </section>
        </Reveal>

        <Reveal direction="up">
          <section
            aria-labelledby="seed-model-heading"
            className="mb-24 grid items-center gap-10 border-y border-border py-14 sm:mb-32 sm:py-20 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14"
          >
            <div className="order-2 flex flex-col gap-6 lg:order-1">
              <span className="inline-flex items-center self-start rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-accent">
                {tSeedModel("eyebrow")}
              </span>
              <h2
                id="seed-model-heading"
                className="max-w-3xl text-balance text-3xl font-semibold leading-[1.08] tracking-tight text-foreground sm:text-5xl"
              >
                {tSeedModel("title")}
              </h2>
              <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-2xl">
                {tSeedModel("body")}
              </p>
            </div>

            <div className="order-1 lg:order-2">
              <Parallax speed={-0.16} maxOffset={56}>
                <figure className="relative mx-auto aspect-[9/16] w-full max-w-sm overflow-hidden rounded-2xl border border-border bg-muted/30 shadow-2xl shadow-black/25 sm:max-w-md lg:max-w-sm">
                  <Image
                    src="/hero/seed-to-forest-card.png"
                    alt={tSeedModel("imageAlt")}
                    fill
                    sizes="(min-width: 1024px) 360px, (min-width: 640px) 448px, 100vw"
                    className="object-cover"
                  />
                </figure>
              </Parallax>
            </div>
          </section>
        </Reveal>

        <Reveal direction="up">
          <section
            aria-labelledby="problem-solution-heading"
            className="mb-20 sm:mb-36"
          >
            <header className="mx-auto flex max-w-4xl flex-col items-center gap-5 pb-10 text-center sm:pb-14">
              <span className="inline-flex items-center rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-accent">
                {tProblemSolution("eyebrow")}
              </span>
              <h2
                id="problem-solution-heading"
                className="text-balance text-3xl font-semibold leading-[1.08] tracking-tight text-foreground sm:text-5xl"
              >
                {tProblemSolution("heading")}
              </h2>
            </header>

            <Parallax speed={0.1} maxOffset={46}>
              <div className="overflow-hidden rounded-2xl border border-border bg-muted/30 shadow-2xl shadow-black/20">
                <div className="grid divide-y divide-border md:grid-cols-2 md:divide-x md:divide-y-0">
                  <ComparisonColumn
                    title={tProblemSolution("today.title")}
                    tone="problem"
                  >
                    {COMPARISON_KEYS.map((key) => (
                      <ComparisonItem
                        key={key}
                        tone="problem"
                        title={tProblemSolution(`today.items.${key}.title`)}
                        body={tProblemSolution(`today.items.${key}.body`)}
                      />
                    ))}
                  </ComparisonColumn>

                  <ComparisonColumn
                    title={tProblemSolution("withBidhra.title")}
                    tone="solution"
                  >
                    {COMPARISON_KEYS.map((key) => (
                      <ComparisonItem
                        key={key}
                        tone="solution"
                        title={tProblemSolution(`withBidhra.items.${key}.title`)}
                        body={tProblemSolution(`withBidhra.items.${key}.body`)}
                      />
                    ))}
                  </ComparisonColumn>
                </div>
              </div>
            </Parallax>
          </section>
        </Reveal>

        <Reveal direction="up">
          <section
            aria-labelledby="linkedin-proof-heading"
            className="relative left-1/2 mb-20 w-screen -translate-x-1/2 overflow-hidden border-y border-border py-12 sm:mb-32 sm:py-16"
          >
            <header className="mx-auto flex max-w-3xl flex-col items-center gap-3 pb-8 text-center sm:pb-10">
              <span className="inline-flex items-center rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-accent">
                {tSocialProof("eyebrow")}
              </span>
              <h2
                id="linkedin-proof-heading"
                className="text-balance text-2xl font-semibold leading-tight tracking-tight text-foreground sm:text-4xl"
              >
                {tSocialProof("heading")}
              </h2>
            </header>

            <div className="linkedin-ticker -mx-4 overflow-hidden sm:-mx-8">
              <div className="linkedin-ticker-track flex w-max">
                {[0, 1].map((groupIndex) => (
                  <div
                    key={groupIndex}
                    aria-hidden={groupIndex === 1}
                    className="flex shrink-0 gap-5 px-2 sm:gap-6 sm:px-3"
                  >
                    {LINKEDIN_TICKER_POSTS.map((post, postIndex) => (
                      <article
                        key={`${post.id}-${groupIndex}-${postIndex}`}
                        className="w-[min(76vw,320px)] shrink-0 overflow-hidden rounded-lg border border-border bg-muted/20 shadow-2xl shadow-black/15"
                      >
                        <iframe
                          src={`https://www.linkedin.com/embed/feed/update/urn:li:share:${post.id}`}
                          title={`${tSocialProof("postTitle")} ${
                            (postIndex % LINKEDIN_POSTS.length) + 1
                          }`}
                          loading="lazy"
                          tabIndex={groupIndex === 1 ? -1 : 0}
                          className="h-[560px] w-full border-0 bg-background"
                        />
                        <a
                          href={post.href}
                          target="_blank"
                          rel="noreferrer"
                          tabIndex={groupIndex === 1 ? -1 : 0}
                          className="flex items-center justify-center border-t border-border px-4 py-3 text-sm font-semibold text-foreground/75 transition hover:text-accent"
                        >
                          {tSocialProof("openPost")}
                        </a>
                      </article>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </section>
        </Reveal>

        <section id="how-it-works" className="mt-20 scroll-mt-24 sm:mt-36">
          <Reveal direction="up">
            <Parallax speed={0.12} maxOffset={42}>
              <header className="flex flex-col gap-4 pb-10 sm:gap-6 sm:pb-12">
                <span className="inline-flex items-center self-start rounded-full border border-border bg-muted/60 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground">
                  {tHow("eyebrow")}
                </span>
                <h2 className="max-w-3xl text-3xl font-semibold leading-tight tracking-tight text-foreground sm:text-4xl md:text-5xl">
                  {tHow("heading")}
                </h2>
              </header>
            </Parallax>
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
            <Parallax speed={-0.1} maxOffset={36}>
              <p className="mt-10 max-w-3xl text-balance text-xl font-medium leading-snug tracking-tight text-foreground sm:mt-12 sm:text-3xl">
                {tHow("closing")}
              </p>
            </Parallax>
          </Reveal>
        </section>
      </main>
    </div>
  );
}

function ComparisonColumn({
  children,
  title,
  tone,
}: {
  children: ReactNode;
  title: string;
  tone: "problem" | "solution";
}) {
  const borderClass =
    tone === "solution" ? "border-accent/60" : "border-red-400/60";

  return (
    <div className="p-5 sm:p-8">
      <div className={`mb-7 border-s-4 ${borderClass} ps-4`}>
        <h3 className="text-xl font-semibold leading-snug text-foreground sm:text-2xl">
          {title}
        </h3>
      </div>
      <div className="flex flex-col gap-6">{children}</div>
    </div>
  );
}

function ComparisonItem({
  body,
  title,
  tone,
}: {
  body: string;
  title: string;
  tone: "problem" | "solution";
}) {
  return (
    <article className="flex gap-3.5">
      <ComparisonIcon tone={tone} />
      <div className="flex flex-col gap-1.5">
        <h4 className="text-base font-semibold leading-snug text-foreground">
          {title}
        </h4>
        <p className="text-sm leading-relaxed text-muted-foreground sm:text-[15px]">
          {body}
        </p>
      </div>
    </article>
  );
}

function ComparisonIcon({ tone }: { tone: "problem" | "solution" }) {
  const isSolution = tone === "solution";

  return (
    <span
      aria-hidden
      className={`mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border ${
        isSolution
          ? "border-accent/30 bg-accent/10 text-accent"
          : "border-red-400/30 bg-red-400/10 text-red-300"
      }`}
    >
      <svg
        viewBox="0 0 16 16"
        className="h-3.5 w-3.5"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2.2"
      >
        {isSolution ? (
          <path d="M3.5 8.5 6.5 11.5 12.5 4.5" />
        ) : (
          <>
            <path d="M4.5 4.5 11.5 11.5" />
            <path d="M11.5 4.5 4.5 11.5" />
          </>
        )}
      </svg>
    </span>
  );
}
