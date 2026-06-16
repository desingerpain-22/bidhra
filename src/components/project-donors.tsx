import { getTranslations } from "next-intl/server";
import type { ProjectDonor } from "@/lib/donations";

export async function ProjectDonors({
  donors,
}: {
  donors: ProjectDonor[];
}) {
  const t = await getTranslations("Donors");

  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
        {t("heading")}
      </h2>
      {donors.length === 0 ? (
        <p className="text-sm text-muted-foreground">{t("empty")}</p>
      ) : (
        <ul className="flex flex-col divide-y divide-border rounded-xl border border-border">
          {donors.map((donor, i) => (
            <li key={i} className="flex items-center justify-between gap-4 px-4 py-3">
              <div className="flex items-center gap-3 min-w-0">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-semibold text-foreground uppercase">
                  {donor.displayName.charAt(0)}
                </div>
                <span className="truncate text-sm font-medium text-foreground">
                  {donor.displayName}
                </span>
              </div>
              <span className="shrink-0 text-sm font-semibold text-accent">
                ${donor.amount.toLocaleString()}
              </span>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
