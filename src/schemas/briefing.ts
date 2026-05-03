import { z } from "zod";

export const briefingPrioritySchema = z.enum(["low", "medium", "high", "critical"]);

export const briefingActionSchema = z.object({
  ownerTeam: z.enum(["Sales", "Partnerships", "Customer Success", "Product", "Leadership"]),
  priority: briefingPrioritySchema,
  recommendation: z.string().min(1),
  rationale: z.string().min(1)
});

export const briefingSectionSchema = z.object({
  title: z.string().min(1),
  finding: z.string().min(1),
  evidenceRefs: z.array(z.string()).min(1),
  businessImpact: z.string().min(1),
  recommendedActions: z.array(briefingActionSchema).min(1)
});

export const executiveBriefingSchema = z.object({
  title: z.string().min(1),
  date: z.string().min(1),
  executiveSummary: z.string().min(1),
  overallRiskLevel: z.enum(["low", "medium", "high", "critical"]),
  sections: z.array(briefingSectionSchema).min(1),
  assumptions: z.array(z.string()),
  nextBestActions: z.array(briefingActionSchema).min(1)
});

export type ExecutiveBriefing = z.infer<typeof executiveBriefingSchema>;
