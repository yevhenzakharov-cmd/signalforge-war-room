import { describe, expect, it } from "vitest";
import { loadAllMockData } from "../../src/db/mock-data.js";

describe("mock data", () => {
  it("loads and validates all synthetic datasets", async () => {
    const data = await loadAllMockData();

    expect(data.accounts.length).toBeGreaterThanOrEqual(4);
    expect(data.competitors.length).toBeGreaterThanOrEqual(3);
    expect(data.marketSignals.length).toBeGreaterThanOrEqual(6);
    expect(data.supportTickets.length).toBeGreaterThanOrEqual(4);
    expect(data.productMetrics.length).toBeGreaterThanOrEqual(4);
  });

  it("links account signals to existing market signals", async () => {
    const data = await loadAllMockData();
    const signalIds = new Set(data.marketSignals.map((signal) => signal.id));

    for (const account of data.accounts) {
      for (const linkedSignalId of account.linkedSignalIds) {
        expect(signalIds.has(linkedSignalId)).toBe(true);
      }
    }
  });
});
