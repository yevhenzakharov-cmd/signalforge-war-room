import { loadAllMockData } from "../db/mock-data.js";
import {
  accountIntelligenceSnapshotSchema,
  type AccountIntelligenceSnapshot
} from "../schemas/tools.js";
import { getHighestSeverity, scoreSupportRisk } from "./severity.js";

export async function getAccountIntelligenceSnapshot(
  accountId: string
): Promise<AccountIntelligenceSnapshot> {
  const data = await loadAllMockData();

  const account = data.accounts.find((candidate) => candidate.id === accountId);

  if (!account) {
    throw new Error(`Account not found: ${accountId}`);
  }

  const linkedSignals = data.marketSignals.filter((signal) =>
    account.linkedSignalIds.includes(signal.id)
  );

  const supportTickets = data.supportTickets.filter(
    (ticket) => ticket.accountId === account.id
  );

  const openTickets = supportTickets.filter(
    (ticket) => ticket.status !== "resolved"
  );

  const highestSeverity = getHighestSeverity(openTickets);
  const riskLevel = scoreSupportRisk(supportTickets);

  const snapshot: AccountIntelligenceSnapshot = {
    account,
    linkedSignals,
    supportTickets,
    riskSummary: {
      openTickets: openTickets.length,
      highestSeverity,
      riskLevel,
      summary:
        openTickets.length === 0
          ? "No open support issues detected for this account."
          : `${openTickets.length} open support issue(s) detected. Highest active severity is ${highestSeverity}.`
    }
  };

  return accountIntelligenceSnapshotSchema.parse(snapshot);
}
