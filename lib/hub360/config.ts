/** Config server-only del canal APBHUB360. No exponer al browser. */
export function hub360Config() {
  const apiUrl = (process.env.APBHUB360_API_URL || "").replace(/\/$/, "");
  const apiKey = process.env.APBHUB360_API_TOKEN || process.env.APBHUB360_API_KEY || "";
  const channelPrefix = (process.env.APBHUB360_CHANNEL_PREFIX || "/api/v1/channel").replace(/\/$/, "");
  const webhookSecret = process.env.APBHUB360_WEBHOOK_SECRET || "";
  const bookingPath =
    process.env.APBHUB360_BOOKING_PATH || `${channelPrefix}/reservations/`;
  return {
    apiUrl,
    apiKey,
    channelPrefix,
    webhookSecret,
    bookingPath,
    configured: Boolean(apiUrl && apiKey),
  };
}

export const BRANCH_SLUG_TO_CODE: Record<string, string> = {
  "oficina-via-veneto": "M1",
  "plaza-granada": "M2",
  "aeropuerto-tocumen": "PTY",
  "aeropuerto-panama-pacifico": "BLB",
  "david-chiriqui": "CHIRIQUI",
};

export function branchCodeFromSlug(slug: string) {
  return BRANCH_SLUG_TO_CODE[slug] || "";
}
