import { zodTextFormat } from "openai/helpers/zod";
import { createOpenAIClient } from "../config/openai.js";
import {
  executiveBriefingSchema,
  type ExecutiveBriefing
} from "../schemas/briefing.js";
import type {
  AccountIntelligenceSnapshot,
  CompetitorWatchSnapshot,
  WarRoomSignalDigest
} from "../schemas/tools.js";

type ExecutiveBriefingInput = {
  accountSnapshot: AccountIntelligenceSnapshot;
  competitorSnapshot: CompetitorWatchSnapshot;
  signalDigest: WarRoomSignalDigest;
};

export async function generateExecutiveBriefing(
  input: ExecutiveBriefingInput
): Promise<ExecutiveBriefing> {
  const openai = createOpenAIClient();

  const response = await openai.responses.parse({
    model: "gpt-4.1-mini",
    input: [
      {
        role: "system",
        content: [
          "You are the Executive Briefer Agent inside SignalForge War Room.",
          "Your job is to turn deterministic intelligence tool outputs into a concise executive business briefing.",
          "Write for sales, partnerships, product, customer success, and leadership.",
          "Use only the provided synthetic/public-source-style data.",
          "Do not invent private company data, private APIs, or confidential workflows.",
          "Clearly separate findings, business impact, evidence references, assumptions, and next actions.",
          "Keep the language business-readable and avoid blockchain-heavy jargon."
        ].join(" ")
      },
      {
        role: "user",
        content: JSON.stringify(
          {
            task: "Generate a structured executive briefing from these tool outputs.",
            dataPolicy:
              "Synthetic/public-source-style data only. No private company data.",
            accountSnapshot: input.accountSnapshot,
            competitorSnapshot: input.competitorSnapshot,
            signalDigest: input.signalDigest
          },
          null,
          2
        )
      }
    ],
    text: {
      format: zodTextFormat(executiveBriefingSchema, "executive_briefing")
    }
  });

  if (!response.output_parsed) {
    throw new Error("OpenAI returned no parsed executive briefing.");
  }

  return executiveBriefingSchema.parse(response.output_parsed);
}
