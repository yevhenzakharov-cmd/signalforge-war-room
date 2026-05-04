import { z } from "zod";

export const evidenceJudgeResultSchema = z.object({
  passed: z.boolean(),
  score: z.number().min(0).max(100),
  checks: z.array(
    z.object({
      name: z.string().min(1),
      passed: z.boolean(),
      message: z.string().min(1)
    })
  ),
  summary: z.string().min(1)
});

export type EvidenceJudgeResult = z.infer<typeof evidenceJudgeResultSchema>;
