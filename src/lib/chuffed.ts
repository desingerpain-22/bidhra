/**
 * Server-only helper for pulling live progress off Chuffed. This calls the
 * same (unofficial, undocumented) GraphQL endpoint Chuffed's own campaign
 * page uses client-side — it works and needs no API key, but Chuffed could
 * change it without notice, so every caller must treat a null return as
 * "fall back to static numbers" rather than an error.
 */

const CHUFFED_GRAPHQL_URL = "https://chuffed.org/api/graphql";
const CHUFFED_CAMPAIGN_ID = "019fb38b-9270-7367-b773-78d2c0bb72ad";

const CAMPAIGN_QUERY = `
  query getCampaign($id: ID!) {
    campaign(id: $id) {
      collected {
        amount
      }
      donations {
        totalCount
      }
    }
  }
`;

export type ChuffedStats = {
  raised: number;
  supporters: number;
};

export async function getChuffedCampaignStats(): Promise<ChuffedStats | null> {
  try {
    const res = await fetch(CHUFFED_GRAPHQL_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        operationName: "getCampaign",
        variables: { id: CHUFFED_CAMPAIGN_ID },
        query: CAMPAIGN_QUERY,
      }),
      next: { revalidate: 300 },
    });

    if (!res.ok) return null;

    const json = await res.json();
    const campaign = json?.data?.campaign;
    const amountCents = Number(campaign?.collected?.amount);
    const supporters = Number(campaign?.donations?.totalCount);

    if (!Number.isFinite(amountCents) || !Number.isFinite(supporters)) {
      return null;
    }

    // Whole dollars only, matching how Chuffed itself displays the total —
    // no cents, so every consumer of this value is consistent.
    return { raised: Math.round(amountCents / 100), supporters };
  } catch {
    return null;
  }
}

export type ChuffedDonation = {
  displayName: string;
  amount: number;
};

export async function getChuffedRecentDonations(): Promise<ChuffedDonation[]> {
  try {
    const res = await fetch(
      `https://chuffed.org/api/v2/campaigns/${CHUFFED_CAMPAIGN_ID}/supporters?limit=10&offset=0`,
      { next: { revalidate: 300 } },
    );

    if (!res.ok) return [];

    const json = await res.json();
    const rows = Array.isArray(json?.data) ? json.data : [];

    return rows
      .map((row: { amount?: unknown; name?: unknown; is_anonymous?: unknown }) => ({
        displayName:
          row.is_anonymous || !row.name
            ? "Anonymous"
            : String(row.name).trim().split(" ")[0],
        amount: Number(row.amount),
      }))
      .filter((d: ChuffedDonation) => Number.isFinite(d.amount) && d.amount > 0);
  } catch {
    return [];
  }
}
