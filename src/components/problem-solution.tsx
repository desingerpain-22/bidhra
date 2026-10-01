import { getTranslations } from "next-intl/server";
import { Reveal } from "@/components/reveal";

type ComparisonKey = "needs" | "trust" | "choice" | "aid";

const COMPARISON_KEYS: ComparisonKey[] = ["needs", "trust", "choice", "aid"];

// "Today" vs "With Bidhra", set as an editorial table rather than two
// cards: numbered rows divided by thin rules, the problem in a quieter
// voice and the answer on a faint warm band so it carries the weight. Red
// and green appear only as the two short rules over the column labels.
// On mobile each row stacks: the problem, then its answer.
export async function ProblemSolution() {
  const t = await getTranslations("ProblemSolution");
  const headingLines = t.raw("headingLines") as string[];

  const rows = COMPARISON_KEYS.map((key, i) => ({
    key,
    number: String(i + 1).padStart(2, "0"),
    today: {
      title: t(`today.items.${key}.title`),
      body: t(`today.items.${key}.body`),
    },
    withBidhra: {
      title: t(`withBidhra.items.${key}.title`),
      body: t(`withBidhra.items.${key}.body`),
    },
  }));

  return (
    <section aria-labelledby="problem-solution-heading">
      <div className="mx-auto w-full max-w-6xl px-4 pb-20 pt-16 sm:px-8 sm:pb-32 sm:pt-24">
        <Reveal direction="up">
          <header className="mx-auto flex max-w-4xl flex-col items-center pb-12 text-center sm:pb-16">
            <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.24em] text-muted-foreground sm:text-xs">
              <span aria-hidden className="h-px w-8 bg-foreground/30" />
              {t("eyebrow")}
              <span aria-hidden className="h-px w-8 bg-foreground/30" />
            </p>
            <h2
              id="problem-solution-heading"
              className="headline-display mt-6 !leading-[1.08] text-foreground"
            >
              {headingLines.map((line) => (
                <span key={line} className="block text-balance">
                  {line}
                </span>
              ))}
            </h2>
          </header>
        </Reveal>

        <Reveal direction="up">
          <div className="border-b border-foreground/15">
            {/* Column labels (desktop). Mobile repeats them inside each row. */}
            <div
              aria-hidden
              className="hidden grid-cols-[3.5rem_minmax(0,1fr)_minmax(0,1.15fr)] border-t border-foreground/80 md:grid"
            >
              <span />
              <ColumnLabel tone="problem" title={t("today.title")} note={t("today.sublabel")} />
              <ColumnLabel tone="solution" title={t("withBidhra.title")} note={t("withBidhra.sublabel")} banded />
            </div>

            <ol className="border-t border-foreground/80 md:border-foreground/15">
              {rows.map((row) => (
                <li
                  key={row.key}
                  className="grid grid-cols-[2.25rem_minmax(0,1fr)] border-b border-foreground/10 last:border-b-0 md:grid-cols-[3.5rem_minmax(0,1fr)_minmax(0,1.15fr)]"
                >
                  <span className="row-span-2 pt-7 text-sm font-medium tabular-nums text-muted-foreground/80 md:row-span-1 md:pt-9">
                    {row.number}
                  </span>

                  <div className="pb-6 pt-7 md:pe-10 md:pb-9 md:pt-9">
                    <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-problem md:sr-only">
                      {t("today.title")}
                    </p>
                    <h3 className="text-pretty text-lg leading-snug text-foreground/75 sm:text-xl">
                      {row.today.title}
                    </h3>
                    <p className="mt-3 max-w-md text-pretty text-[0.9375rem] leading-relaxed text-muted-foreground">
                      {row.today.body}
                    </p>
                  </div>

                  <div className="-me-4 bg-solution-soft/70 pb-7 pe-4 ps-5 pt-6 sm:-me-8 sm:pe-8 md:me-0 md:px-10 md:pb-9 md:pt-9">
                    <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-accent md:sr-only">
                      {t("withBidhra.title")}
                    </p>
                    <h3 className="text-pretty text-lg leading-snug text-foreground sm:text-xl">
                      {/* The span carries the weight: the global h3 rule would
                          override a weight class on the heading itself. */}
                      <span className="font-bold">{row.withBidhra.title}</span>
                    </h3>
                    <p className="mt-3 max-w-lg text-pretty text-[0.9375rem] leading-relaxed text-foreground/70">
                      {row.withBidhra.body}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function ColumnLabel({
  tone,
  title,
  note,
  banded = false,
}: {
  tone: "problem" | "solution";
  title: string;
  note: string;
  banded?: boolean;
}) {
  return (
    <div className={`pb-5 pt-6 ${banded ? "bg-solution-soft/70 px-10" : "pe-10"}`}>
      <span
        className={`mb-4 block h-0.5 w-8 ${tone === "problem" ? "bg-problem/70" : "bg-accent"}`}
      />
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-foreground">
        {title}
      </p>
      <p className="mt-1.5 text-sm italic text-muted-foreground">{note}</p>
    </div>
  );
}
