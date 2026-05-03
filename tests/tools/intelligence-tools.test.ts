import { describe, expect, it } from "vitest";
import {
  getAccountIntelligenceSnapshot,
  getCompetitorWatchSnapshot,
  getWarRoomSignalDigest
} from "../../src/tools/index.js";

describe("intelligence tools", () => {
  it("builds an account intelligence snapshot", async () => {
    const snapshot = await getAccountIntelligenceSnapshot("acct_novafox");

    expect(snapshot.account.id).toBe("acct_novafox");
    expect(snapshot.linkedSignals.length).toBeGreaterThanOrEqual(1);
    expect(snapshot.riskSummary.openTickets).toBeGreaterThanOrEqual(0);
  });

  it("throws for an unknown account", async () => {
    await expect(
      getAccountIntelligenceSnapshot("acct_does_not_exist")
    ).rejects.toThrow("Account not found");
  });

  it("builds a competitor watch snapshot", async () => {
    const snapshot = await getCompetitorWatchSnapshot("comp_datapulse");

    expect(snapshot.competitor.id).toBe("comp_datapulse");
    expect(snapshot.likelySalesObjections.length).toBeGreaterThanOrEqual(1);
  });

  it("builds a war room signal digest", async () => {
    const digest = await getWarRoomSignalDigest();

    expect(digest.highImpactSignals.length).toBeGreaterThanOrEqual(1);
    expect(digest.riskyAccounts.length).toBeGreaterThanOrEqual(1);
    expect(digest.productRisks.length).toBeGreaterThanOrEqual(1);
  });
});
