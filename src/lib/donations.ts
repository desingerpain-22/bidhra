import { createClient } from "@/lib/supabase/server";

export type DonationTotals = {
  raised: number;
  supporters: number;
};

export type ProjectDonor = {
  displayName: string;
  amount: number;
  createdAt: string;
};

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

export async function getProjectDonors(projectSlug: string): Promise<ProjectDonor[]> {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    return [];
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("project_donor_list")
    .select("display_name, price_amount, created_at")
    .eq("project_slug", projectSlug)
    .order("created_at", { ascending: false })
    .limit(50);

  if (error || !data) {
    return [];
  }

  return data.map((row) => ({
    displayName: row.display_name as string,
    amount: Number(row.price_amount),
    createdAt: row.created_at as string,
  }));
}
