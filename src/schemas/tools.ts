import { z } from "zod";
import {
  accountSchema,
  competitorSchema,
  marketSignalSchema,
  productMetricSchema,
  supportTicketSchema
} from "./data.js";

export const accountIntelligenceSnapshotSchema = z.object({
  account: accountSchema,
  linkedSignals: z.array(marketSignalSchema),
  supportTickets: z.array(supportTicketSchema),
  riskSummary: z.object({
    openTickets: z.number().int().nonnegative(),
    highestSeverity: z.enum(["none", "low", "medium", "high", "critical"]),
    riskLevel: z.enum(["low", "medium", "high"]),
    summary: z.string()
  })
});

export const competitorWatchSnapshotSchema = z.object({
  competitor: competitorSchema,
  watchedSignals: z.array(marketSignalSchema),
  likelySalesObjections: z.array(z.string())
});

export const warRoomSignalDigestSchema = z.object({
  highImpactSignals: z.array(marketSignalSchema),
  riskyAccounts: z.array(accountSchema),
  productRisks: z.array(productMetricSchema),
  supportHotspots: z.array(
    z.object({
      theme: z.string(),
      count: z.number().int().nonnegative(),
      severity: z.enum(["low", "medium", "high", "critical"])
    })
  )
});

export type AccountIntelligenceSnapshot = z.infer<
  typeof accountIntelligenceSnapshotSchema
>;

export type CompetitorWatchSnapshot = z.infer<
  typeof competitorWatchSnapshotSchema
>;

export type WarRoomSignalDigest = z.infer<typeof warRoomSignalDigestSchema>;
