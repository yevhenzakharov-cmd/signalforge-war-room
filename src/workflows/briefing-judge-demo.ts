import {
  judgeExecutiveBriefing,
  sanitizeBriefingForPublicDemo
} from "../agents/evidence-judge.js";
import type { ExecutiveBriefing } from "../schemas/briefing.js";
import type { EvidenceJudgeResult } from "../schemas/judge.js";
import { runBriefingDemo } from "./briefing-demo.js";

export type BriefingJudgeDemoResult = {
  briefing: ExecutiveBriefing;
  judge: EvidenceJudgeResult;
};

export async function runBriefingJudgeDemo(): Promise<BriefingJudgeDemoResult> {
  const briefing = await runBriefingDemo();
  const sanitizedBriefing = sanitizeBriefingForPublicDemo(briefing);
  const judge = judgeExecutiveBriefing(sanitizedBriefing);

  return {
    briefing: sanitizedBriefing,
    judge
  };
}
