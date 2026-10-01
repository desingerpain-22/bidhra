import { getTranslations } from "next-intl/server";
import { Reveal } from "@/components/reveal";

type StepKey = "identify" | "equip" | "restart" | "forward";

const STEP_KEYS: StepKey[] = ["identify", "equip", "restart", "forward"];

// How Bidhra works: four steps read left to right on one thin rule, each
// marked by a small green dot, with a large quiet number, a bold title and
// one line of description. On mobile the rule turns vertical and the steps
// stack along it. Keeps the #how-it-works anchor used by the hero and header.
export async function HowItWorks() {
  const t = await getTranslations("HowItWorks");

  return (
    <section
      id="how-it-works"
      aria-labelledby="how-it-works-heading"
      className="scroll-mt-24 pb-6 pt-4 sm:pb-10"
    >
      <Reveal direction="up">
        <header className="mx-auto flex max-w-3xl flex-col items-center pb-14 text-center sm:pb-20">
          <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.24em] text-muted-foreground sm:text-xs">
            <span aria-hidden className="h-px w-8 bg-foreground/30" />
            {t("eyebrow")}
            <span aria-hidden className="h-px w-8 bg-foreground/30" />
          </p>
          <h2
            id="how-it-works-heading"
            className="headline-display mt-6 text-balance text-foreground"
          >
            {t("heading")}
          </h2>
        </header>
      </Reveal>

      <ol className="relative grid gap-12 ps-8 md:grid-cols-4 md:gap-10 md:ps-0 lg:gap-14">
        {/* The connecting rule: vertical on mobile, horizontal from md up. */}
        <span
          aria-hidden
          className="absolute bottom-3 start-[3.5px] top-3 w-px bg-foreground/15 md:hidden"
        />
        <span
          aria-hidden
          className="absolute inset-x-0 top-0 hidden h-px bg-foreground/15 md:block"
        />

        {STEP_KEYS.map((key, i) => (
          <li key={key} className="relative md:pt-10">
            <span
              aria-hidden
              className="absolute -start-8 top-3 h-2 w-2 rounded-full bg-accent md:start-0 md:top-0 md:-translate-y-1/2"
            />
            <Reveal direction="up" delay={i * 90}>
              <p
                aria-hidden
                className="text-[clamp(2.75rem,5vw,4rem)] font-semibold leading-none tracking-[-0.04em] text-foreground/20 tabular-nums"
              >
                {String(i + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-5 text-xl leading-snug text-foreground sm:text-[1.375rem]">
                {/* The span carries the weight: the global h3 rule would
                    override a weight class on the heading itself. */}
                <span className="font-bold">{t(`steps.${key}.title`)}</span>
              </h3>
              <p className="mt-3 max-w-xs text-pretty text-base leading-relaxed text-muted-foreground">
                {t(`steps.${key}.body`)}
              </p>
            </Reveal>
          </li>
        ))}
      </ol>
    </section>
  );
}
