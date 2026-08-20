import { getTranslations } from "next-intl/server";
import { getChuffedCampaignStats } from "@/lib/chuffed";

const CHUFFED_URL =
  "https://chuffed.org/donate/bidhra-project-turning-aid-into-palestinian-businesses-for-economic-recovery";

export async function ProjectFunding({
  goal,
  fallbackRaised,
  fallbackSupporters,
  locale,
  hasKnowledgeRequest,
}: {
  goal: number;
  fallbackRaised: number;
  fallbackSupporters: number;
  locale: string;
  hasKnowledgeRequest: boolean;
}) {
  const t = await getTranslations("Project");
  const stats = await getChuffedCampaignStats();
  const raised = stats?.raised ?? fallbackRaised;
  const supporters = stats?.supporters ?? fallbackSupporters;

  const formatter = new Intl.NumberFormat(locale);
  const pct = Math.min(100, Math.round((raised / goal) * 100));
  const isRTL = locale === "ar";

  return (
    <section className="flex flex-col gap-6 rounded-2xl border border-border bg-background p-5 sm:p-6">
      <div className="flex flex-col gap-3">
        <div className="flex items-end justify-between gap-2">
          <div>
            <span className="text-2xl font-bold text-foreground sm:text-3xl">
              ${formatter.format(raised)}
            </span>
            <span className="ms-1.5 text-sm text-muted-foreground">
              {t("raised")} ${formatter.format(goal)}
            </span>
          </div>
          <span className="text-sm font-semibold text-accent">{pct}%</span>
        </div>

        <div className="relative h-3 w-full overflow-hidden rounded-full bg-muted">
          <div
            className="absolute top-0 h-full rounded-full bg-accent transition-[width] duration-700 ease-out"
            style={
              isRTL
                ? { right: 0, width: `${pct}%` }
                : { left: 0, width: `${pct}%` }
            }
          />
        </div>

        <div className="grid grid-cols-2 gap-2 pt-1">
          <Stat value={formatter.format(supporters)} label={t("supporters")} />
          <Stat value={`${pct}%`} label={isRTL ? "ممول" : "funded"} />
        </div>
      </div>

      <div className="flex flex-col gap-2 sm:flex-row">
        <a
          href={CHUFFED_URL}
          target="_blank"
          rel="noreferrer"
          className="inline-flex h-12 flex-1 items-center justify-center rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
        >
          {t("contributeMoney")}
        </a>
        {hasKnowledgeRequest && (
          <a
            href="#project-knowledge"
            className="inline-flex h-12 items-center justify-center rounded-full border border-border px-6 text-sm font-medium text-foreground transition hover:bg-muted"
          >
            {t("offerSkills")}
          </a>
        )}
      </div>
    </section>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col items-center gap-0.5 rounded-xl border border-border bg-muted/30 px-2 py-3 text-center">
      <span className="text-lg font-bold text-foreground">{value}</span>
      <span className="text-[10px] uppercase tracking-widest text-muted-foreground">{label}</span>
    </div>
  );
}
