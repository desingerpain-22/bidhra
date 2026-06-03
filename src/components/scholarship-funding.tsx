"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { DonateModal } from "./donate-modal";

export function ScholarshipFunding({
  slug,
  studentName,
  goal,
  initialRaised,
  initialSupporters,
  daysLeft,
  locale,
}: {
  slug: string;
  studentName: string;
  goal: number;
  initialRaised: number;
  initialSupporters: number;
  daysLeft: number;
  locale: string;
}) {
  const t = useTranslations("Scholarship");
  const [raised, setRaised] = useState(initialRaised);
  const [supporters, setSupporters] = useState(initialSupporters);
  const [donateOpen, setDonateOpen] = useState(false);
  const formatter = new Intl.NumberFormat(locale);
  const pct = Math.min(100, Math.round((raised / goal) * 100));
  const fullyFunded = raised >= goal;

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
            {daysLeft > 0 && (
              <span className="text-muted-foreground">
                {daysLeft} {t("daysLeft")}
              </span>
            )}
            {fullyFunded && (
              <span className="font-medium text-emerald-700 dark:text-emerald-300">
                {t("fullyFunded")}
              </span>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row">
          <button
            type="button"
            onClick={() => setDonateOpen(true)}
            disabled={fullyFunded}
            className="inline-flex h-11 items-center justify-center rounded-full bg-primary px-6 text-sm font-medium text-primary-foreground transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {fullyFunded ? t("fullyFundedShort") : t("supportStudent")}
          </button>
        </div>
      </section>

      <DonateModal
        open={donateOpen}
        onOpenChange={setDonateOpen}
        projectSlug={`scholarship:${slug}`}
        projectTitle={studentName}
        onSuccess={(amount) => {
          setRaised((r) => r + amount);
          setSupporters((s) => s + 1);
        }}
      />
    </>
  );
}
