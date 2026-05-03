import { loadAllMockData } from "../db/mock-data.js";
import {
  competitorWatchSnapshotSchema,
  type CompetitorWatchSnapshot
} from "../schemas/tools.js";

export async function getCompetitorWatchSnapshot(
  competitorId: string
): Promise<CompetitorWatchSnapshot> {
  const data = await loadAllMockData();

  const competitor = data.competitors.find(
    (candidate) => candidate.id === competitorId
  );

  if (!competitor) {
    throw new Error(`Competitor not found: ${competitorId}`);
  }

  const watchedSignals = data.marketSignals.filter((signal) =>
    competitor.watchedSignals.includes(signal.id)
  );

  const snapshot: CompetitorWatchSnapshot = {
    competitor,
    watchedSignals,
    likelySalesObjections: competitor.salesObjections
  };

  return competitorWatchSnapshotSchema.parse(snapshot);
}
