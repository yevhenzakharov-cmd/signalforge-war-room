import { z } from "zod";

export const accountStageSchema = z.enum([
  "Prospect",
  "Discovery",
  "Evaluation",
  "Pilot",
  "Customer",
  "At Risk"
]);

export const accountSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  segment: z.string().min(1),
  region: z.string().min(1),
  stage: accountStageSchema,
  pipelineValueUsd: z.number().int().nonnegative(),
  fitScore: z.number().min(0).max(100),
  healthScore: z.number().min(0).max(100),
  ownerTeam: z.enum(["Sales", "Partnerships", "Customer Success"]),
  painPoints: z.array(z.string()).min(1),
  recommendedAngle: z.string().min(1),
  linkedSignalIds: z.array(z.string())
});

export const competitorSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  category: z.string().min(1),
  positioning: z.string().min(1),
  strengths: z.array(z.string()).min(1),
  weaknesses: z.array(z.string()).min(1),
  watchedSignals: z.array(z.string()),
  salesObjections: z.array(z.string())
});

export const signalCategorySchema = z.enum([
  "funding",
  "product_launch",
  "hiring",
  "partnership",
  "competitor_update",
  "market_report",
  "customer_risk",
  "support_spike"
]);

export const signalSourceTypeSchema = z.enum([
  "public_summary",
  "synthetic_internal",
  "mock_news"
]);

export const marketSignalSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  category: signalCategorySchema,
  sourceType: signalSourceTypeSchema,
  entityNames: z.array(z.string()).min(1),
  summary: z.string().min(1),
  detectedAt: z.string().datetime(),
  confidence: z.number().min(0).max(1),
  impactScore: z.number().min(0).max(100),
  evidenceRefs: z.array(z.string()).min(1)
});

export const supportTicketSchema = z.object({
  id: z.string().min(1),
  accountId: z.string().min(1),
  theme: z.string().min(1),
  severity: z.enum(["low", "medium", "high", "critical"]),
  summary: z.string().min(1),
  status: z.enum(["open", "in_progress", "resolved"]),
  createdAt: z.string().datetime()
});

export const productMetricSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  area: z.enum(["Acquisition", "Activation", "Retention", "Revenue", "Support"]),
  currentValue: z.number(),
  previousValue: z.number(),
  unit: z.enum(["count", "percent", "usd", "days"]),
  trend: z.enum(["up", "down", "flat"]),
  riskLevel: z.enum(["low", "medium", "high"]),
  summary: z.string().min(1)
});

export const accountsSchema = z.array(accountSchema);
export const competitorsSchema = z.array(competitorSchema);
export const marketSignalsSchema = z.array(marketSignalSchema);
export const supportTicketsSchema = z.array(supportTicketSchema);
export const productMetricsSchema = z.array(productMetricSchema);

export type Account = z.infer<typeof accountSchema>;
export type Competitor = z.infer<typeof competitorSchema>;
export type MarketSignal = z.infer<typeof marketSignalSchema>;
export type SupportTicket = z.infer<typeof supportTicketSchema>;
export type ProductMetric = z.infer<typeof productMetricSchema>;
