import { createClient } from "@/lib/supabase/server";

export type DonationTotals = {
  raised: number;
  supporters: number;
};

/**
 * Sum of confirmed/finished crypto donations for a project, read from the
 * project_donation_totals view (public read-only aggregate). Falls back to
 * zero if Supabase isn't configured or the query fails, so the page always
 * renders.
 */
export async function getDonationTotals(projectSlug: string): Promise<DonationTotals> {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    return { raised: 0, supporters: 0 };
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("project_donation_totals")
    .select("raised_usd, supporters")
    .eq("project_slug", projectSlug)
    .maybeSingle();

  if (error || !data) {
    return { raised: 0, supporters: 0 };
  }

  return { raised: Number(data.raised_usd), supporters: data.supporters };
}
