"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { DonateModal } from "./donate-modal";

export function ProjectFunding({
  projectSlug,
  projectTitle,
  goal,
  initialRaised,
  initialSupporters,
  daysLeft,
  locale,
  hasKnowledgeRequest,
}: {
  projectSlug: string;
  projectTitle: string;
  goal: number;
  initialRaised: number;
  initialSupporters: number;
  daysLeft: number;
  locale: string;
  hasKnowledgeRequest: boolean;
}) {
  const t = useTranslations("Project");
  const [raised, setRaised] = useState(initialRaised);
  const [supporters, setSupporters] = useState(initialSupporters);
  const [donateOpen, setDonateOpen] = useState(false);

  const formatter = new Intl.NumberFormat(locale);
  const pct = Math.min(100, Math.round((raised / goal) * 100));

  function scrollToKnowledge() {
    const el = document.getElementById("project-knowledge");
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <>
      <section className="grid gap-5 rounded-xl border border-border bg-background p-5 sm:gap-6 sm:p-6 md:grid-cols-[1fr_auto] md:items-center">
        <div className="flex flex-col gap-3">
          <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
            <div
              className="h-full bg-accent transition-[width] duration-500 ease-out"
              style={{ width: `${pct}%` }}
            />
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-1 text-sm">
            <span className="font-semibold text-foreground">
              ${formatter.format(raised)}{" "}
              <span className="font-normal text-muted-foreground">
                {t("raised")} ${formatter.format(goal)}
              </span>
            </span>
            <span className="text-muted-foreground">
              {formatter.format(supporters)} {t("supporters")}
            </span>
            <span className="text-muted-foreground">
              {daysLeft} {t("daysLeft")}
            </span>
          </div>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row md:flex-col lg:flex-row">
          <button
            type="button"
            onClick={() => setDonateOpen(true)}
            className="inline-flex h-11 items-center justify-center rounded-full bg-primary px-6 text-sm font-medium text-primary-foreground transition hover:opacity-90"
          >
            {t("contributeMoney")}
          </button>
          {hasKnowledgeRequest && (
            <button
              type="button"
              onClick={scrollToKnowledge}
              className="inline-flex h-11 items-center justify-center rounded-full border border-border px-6 text-sm font-medium text-foreground transition hover:bg-muted"
            >
              {t("offerSkills")}
            </button>
          )}
        </div>
      </section>

      <DonateModal
        open={donateOpen}
        onOpenChange={setDonateOpen}
        projectSlug={projectSlug}
        projectTitle={projectTitle}
        onSuccess={(amount) => {
          setRaised((r) => r + amount);
          setSupporters((s) => s + 1);
        }}
      />
    </>
  );
}
