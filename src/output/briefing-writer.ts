import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import type { ExecutiveBriefing } from "../schemas/briefing.js";
import type { EvidenceJudgeResult } from "../schemas/judge.js";

const outputsRoot = path.join(process.cwd(), "outputs");

function formatAction(priority: string, ownerTeam: string, recommendation: string): string {
  return `- [${priority}] ${ownerTeam}: ${recommendation}`;
}

export function briefingToMarkdown(briefing: ExecutiveBriefing): string {
  const sections = briefing.sections
    .map((section) => {
      const evidence = section.evidenceRefs.map((ref) => `- ${ref}`).join("\n");
      const actions = section.recommendedActions
        .map((action) =>
          formatAction(action.priority, action.ownerTeam, action.recommendation)
        )
        .join("\n");

      return [
        `## ${section.title}`,
        "",
        `**Finding:** ${section.finding}`,
        "",
        `**Business impact:** ${section.businessImpact}`,
        "",
        "**Evidence refs:**",
        evidence,
        "",
        "**Recommended actions:**",
        actions
      ].join("\n");
    })
    .join("\n\n");

  const nextBestActions = briefing.nextBestActions
    .map((action) =>
      formatAction(action.priority, action.ownerTeam, action.recommendation)
    )
    .join("\n");

  const assumptions =
    briefing.assumptions.length > 0
      ? briefing.assumptions.map((assumption) => `- ${assumption}`).join("\n")
      : "- None";

  return [
    `# ${briefing.title}`,
    "",
    `**Date:** ${briefing.date}`,
    `**Overall risk:** ${briefing.overallRiskLevel}`,
    "",
    "## Executive summary",
    "",
    briefing.executiveSummary,
    "",
    sections,
    "",
    "## Assumptions",
    "",
    assumptions,
    "",
    "## Next best actions",
    "",
    nextBestActions,
    ""
  ].join("\n");
}

export async function saveBriefingOutputs(
  briefing: ExecutiveBriefing,
  judge: EvidenceJudgeResult
): Promise<{
  briefingMarkdownPath: string;
  briefingJsonPath: string;
  judgeJsonPath: string;
}> {
  const briefingsDir = path.join(outputsRoot, "briefings");
  const judgeReportsDir = path.join(outputsRoot, "judge-reports");

  await Promise.all([
    mkdir(briefingsDir, { recursive: true }),
    mkdir(judgeReportsDir, { recursive: true })
  ]);

  const briefingMarkdownPath = path.join(briefingsDir, "latest-briefing.md");
  const briefingJsonPath = path.join(briefingsDir, "latest-briefing.json");
  const judgeJsonPath = path.join(judgeReportsDir, "latest-judge-report.json");

  await Promise.all([
    writeFile(briefingMarkdownPath, briefingToMarkdown(briefing), "utf8"),
    writeFile(briefingJsonPath, JSON.stringify(briefing, null, 2), "utf8"),
    writeFile(judgeJsonPath, JSON.stringify(judge, null, 2), "utf8")
  ]);

  return {
    briefingMarkdownPath,
    briefingJsonPath,
    judgeJsonPath
  };
}
