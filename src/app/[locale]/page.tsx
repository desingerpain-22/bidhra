import { setRequestLocale, getTranslations } from "next-intl/server";
import { Reveal } from "@/components/reveal";
import { getChuffedRecentDonations } from "@/lib/chuffed";
import { DonationToast } from "@/components/donation-toast";
import { HomeHero } from "@/components/home-hero";
import { ImpactStats } from "@/components/impact-stats";
import { TrustSponsorship } from "@/components/trust-sponsorship";
import { ProblemSolution } from "@/components/problem-solution";
import { HowItWorks } from "@/components/how-it-works";
import { HomeProjects } from "@/components/home-projects";

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
  const tSocialProof = await getTranslations("SocialProof");
  const recentDonations = await getChuffedRecentDonations();

  return (
    <div className="flex flex-1 flex-col bg-background font-sans">
      <DonationToast donations={recentDonations} />
      <HomeHero locale={locale} />
      <ImpactStats locale={locale} />
      <TrustSponsorship />
      <ProblemSolution />
      <main className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-8 sm:py-28">
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
                className="headline-display text-balance text-2xl font-semibold leading-tight tracking-tight text-foreground sm:text-4xl"
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

        <HomeProjects locale={locale} />

        <HowItWorks />
      </main>
    </div>
  );
}
