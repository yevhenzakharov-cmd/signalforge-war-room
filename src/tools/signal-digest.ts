import { loadAllMockData } from "../db/mock-data.js";
import {
  warRoomSignalDigestSchema,
  type WarRoomSignalDigest
} from "../schemas/tools.js";

const severityRank = {
  low: 1,
  medium: 2,
  high: 3,
  critical: 4
} as const;

export async function getWarRoomSignalDigest(): Promise<WarRoomSignalDigest> {
  const data = await loadAllMockData();

  const highImpactSignals = [...data.marketSignals]
    .filter((signal) => signal.impactScore >= 75)
    .sort((a, b) => b.impactScore - a.impactScore);

  const riskyAccounts = [...data.accounts]
    .filter((account) => account.healthScore < 75)
    .sort((a, b) => a.healthScore - b.healthScore);

  const productRisks = [...data.productMetrics]
    .filter((metric) => metric.riskLevel !== "low")
    .sort((a, b) => {
      const rank = { low: 1, medium: 2, high: 3 };
      return rank[b.riskLevel] - rank[a.riskLevel];
    });

  const supportThemeMap = new Map<
    string,
    { theme: string; count: number; severity: "low" | "medium" | "high" | "critical" }
  >();

  for (const ticket of data.supportTickets) {
    const current = supportThemeMap.get(ticket.theme);

    if (!current) {
      supportThemeMap.set(ticket.theme, {
        theme: ticket.theme,
        count: 1,
        severity: ticket.severity
      });
      continue;
    }

    current.count += 1;

    if (severityRank[ticket.severity] > severityRank[current.severity]) {
      current.severity = ticket.severity;
    }
  }

  const supportHotspots = [...supportThemeMap.values()].sort(
    (a, b) => b.count - a.count
  );

  const digest: WarRoomSignalDigest = {
    highImpactSignals,
    riskyAccounts,
    productRisks,
    supportHotspots
  };

  return warRoomSignalDigestSchema.parse(digest);
}
