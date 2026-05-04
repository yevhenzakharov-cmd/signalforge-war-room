import { describe, expect, it } from "vitest";
import { judgeExecutiveBriefing, sanitizeBriefingForPublicDemo } from "../../src/agents/evidence-judge.js";
import type { ExecutiveBriefing } from "../../src/schemas/briefing.js";

function createValidBriefing(): ExecutiveBriefing {
  return {
    title: "Executive Briefing: NovaFox Studios",
    date: "2026-05-04",
    executiveSummary:
      "NovaFox Studios shows a strong sales opportunity based on live-ops hiring, market retention pressure, and clear product pain points around analytics fragmentation. The briefing recommends a focused sales motion around launch intelligence, retention visibility, and operational readiness for upcoming releases.",
    overallRiskLevel: "medium",
    sections: [
      {
        title: "Account Opportunity",
        finding:
          "NovaFox has linked signals around live-ops hiring and market retention pressure.",
        evidenceRefs: ["mock_news:novafox_liveops_hiring_2026_05_04"],
        businessImpact:
          "This creates a timely opportunity to position SignalForge as a launch-readiness intelligence system.",
        recommendedActions: [
          {
            ownerTeam: "Sales",
            priority: "high",
            recommendation:
              "Run a tailored discovery call focused on launch monitoring and retention risk.",
            rationale:
              "The account has matching pain points and active market signals."
          }
        ]
      }
    ],
    assumptions: [
      "The briefing uses only provided synthetic and public-style inputs."
    ],
    nextBestActions: [
      {
        ownerTeam: "Sales",
        priority: "high",
        recommendation: "Prepare a NovaFox-specific account dossier.",
        rationale: "The account has strong fit and timely buying signals."
      },
      {
        ownerTeam: "Customer Success",
        priority: "medium",
        recommendation: "Prepare onboarding notes for launch-readiness use cases.",
        rationale: "Support-readiness can reduce friction during evaluation."
      }
    ]
  };
}

describe("evidence judge", () => {
  it("passes a valid evidence-grounded briefing", () => {
    const result = judgeExecutiveBriefing(createValidBriefing());

    expect(result.passed).toBe(true);
    expect(result.score).toBe(100);
  });

  it("fails when evidence references are missing", () => {
    const briefing = createValidBriefing();
    briefing.sections[0]!.evidenceRefs = [];

    const result = judgeExecutiveBriefing(briefing);

    expect(result.passed).toBe(false);
    expect(result.checks.some((check) => check.name === "section_evidence_refs" && !check.passed)).toBe(true);
  });

  it("sanitizes disallowed private-data language before judging", () => {
    const briefing = createValidBriefing();
    briefing.assumptions = ["No NDA material is used in this briefing."];

    const sanitized = sanitizeBriefingForPublicDemo(briefing);
    const serialized = JSON.stringify(sanitized).toLowerCase();

    expect(serialized).not.toMatch(/\\bnda\\b/i);

    const result = judgeExecutiveBriefing(sanitized);

    expect(result.passed).toBe(true);
  });
});
