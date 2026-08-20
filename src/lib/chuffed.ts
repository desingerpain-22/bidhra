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

    return { raised: Math.round(amountCents) / 100, supporters };
  } catch {
    return null;
  }
}
