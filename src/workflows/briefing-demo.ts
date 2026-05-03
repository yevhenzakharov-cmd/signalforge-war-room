import { generateExecutiveBriefing } from "../agents/executive-briefer.js";
import type { ExecutiveBriefing } from "../schemas/briefing.js";
import {
  getAccountIntelligenceSnapshot,
  getCompetitorWatchSnapshot,
  getWarRoomSignalDigest
} from "../tools/index.js";

export async function runBriefingDemo(): Promise<ExecutiveBriefing> {
  const [accountSnapshot, competitorSnapshot, signalDigest] = await Promise.all([
    getAccountIntelligenceSnapshot("acct_novafox"),
    getCompetitorWatchSnapshot("comp_datapulse"),
    getWarRoomSignalDigest()
  ]);

  return generateExecutiveBriefing({
    accountSnapshot,
    competitorSnapshot,
    signalDigest
  });
}
