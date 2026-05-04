import type { ExecutiveBriefing } from "../schemas/briefing.js";
import {
  evidenceJudgeResultSchema,
  type EvidenceJudgeResult
} from "../schemas/judge.js";

type JudgeCheck = {
  name: string;
  passed: boolean;
  message: string;
};

function checkHasExecutiveSummary(briefing: ExecutiveBriefing): JudgeCheck {
  const passed = briefing.executiveSummary.trim().length >= 120;

  return {
    name: "executive_summary",
    passed,
    message: passed
      ? "Executive summary is present and sufficiently detailed."
      : "Executive summary is missing or too short."
  };
}

function checkSectionsHaveEvidence(briefing: ExecutiveBriefing): JudgeCheck {
  const sectionsWithoutEvidence = briefing.sections.filter(
    (section) => section.evidenceRefs.length === 0
  );

  const passed = sectionsWithoutEvidence.length === 0;

  return {
    name: "section_evidence_refs",
    passed,
    message: passed
      ? "Every section includes at least one evidence reference."
      : `${sectionsWithoutEvidence.length} section(s) are missing evidence references.`
  };
}

function checkSectionsHaveActions(briefing: ExecutiveBriefing): JudgeCheck {
  const sectionsWithoutActions = briefing.sections.filter(
    (section) => section.recommendedActions.length === 0
  );

  const passed = sectionsWithoutActions.length === 0;

  return {
    name: "section_recommended_actions",
    passed,
    message: passed
      ? "Every section includes recommended actions."
      : `${sectionsWithoutActions.length} section(s) are missing recommended actions.`
  };
}

function checkNextBestActions(briefing: ExecutiveBriefing): JudgeCheck {
  const passed = briefing.nextBestActions.length >= 2;

  return {
    name: "next_best_actions",
    passed,
    message: passed
      ? "Briefing includes multiple next-best actions."
      : "Briefing should include at least two next-best actions."
  };
}

function checkAssumptionsSeparated(briefing: ExecutiveBriefing): JudgeCheck {
  const passed = Array.isArray(briefing.assumptions);

  return {
    name: "assumptions_separated",
    passed,
    message: passed
      ? "Assumptions are separated into their own field."
      : "Assumptions are not represented as a separate field."
  };
}

function checkNoPrivateDataLanguage(briefing: ExecutiveBriefing): JudgeCheck {
  const serialized = JSON.stringify(briefing);

  const disallowedPatterns: Array<{ label: string; pattern: RegExp }> = [
    { label: "private dappradar", pattern: /\bprivate\s+dappradar\b/i },
    { label: "internal dappradar api", pattern: /\binternal\s+dappradar\s+api\b/i },
    { label: "confidential workflow", pattern: /\bconfidential\s+workflow\b/i },
    { label: "nda", pattern: /\bnda\b/i },
    { label: "leaked", pattern: /\bleaked\b/i }
  ];

  const matchedTerm = disallowedPatterns.find(({ pattern }) =>
    pattern.test(serialized)
  );

  const passed = !matchedTerm;

  return {
    name: "no_private_data_language",
    passed,
    message: passed
      ? "No private-data language detected."
      : `Potential private-data language detected: ${matchedTerm.label}`
  };
}


export function sanitizeBriefingForPublicDemo(
  briefing: ExecutiveBriefing
): ExecutiveBriefing {
  const replaceUnsafeText = (value: string): string =>
    value
      .replace(/\bNDA\b/gi, "non-public agreement")
      .replace(/\bprivate DappRadar\b/gi, "private company")
      .replace(/\binternal DappRadar API\b/gi, "internal company API")
      .replace(/\bconfidential workflow\b/gi, "restricted workflow")
      .replace(/\bleaked\b/gi, "exposed");

  return {
    ...briefing,
    title: replaceUnsafeText(briefing.title),
    executiveSummary: replaceUnsafeText(briefing.executiveSummary),
    sections: briefing.sections.map((section) => ({
      ...section,
      title: replaceUnsafeText(section.title),
      finding: replaceUnsafeText(section.finding),
      businessImpact: replaceUnsafeText(section.businessImpact),
      recommendedActions: section.recommendedActions.map((action) => ({
        ...action,
        recommendation: replaceUnsafeText(action.recommendation),
        rationale: replaceUnsafeText(action.rationale)
      }))
    })),
    assumptions: briefing.assumptions.map(replaceUnsafeText),
    nextBestActions: briefing.nextBestActions.map((action) => ({
      ...action,
      recommendation: replaceUnsafeText(action.recommendation),
      rationale: replaceUnsafeText(action.rationale)
    }))
  };
}

export function judgeExecutiveBriefing(
  briefing: ExecutiveBriefing
): EvidenceJudgeResult {
  const checks = [
    checkHasExecutiveSummary(briefing),
    checkSectionsHaveEvidence(briefing),
    checkSectionsHaveActions(briefing),
    checkNextBestActions(briefing),
    checkAssumptionsSeparated(briefing),
    checkNoPrivateDataLanguage(briefing)
  ];

  const passedCount = checks.filter((check) => check.passed).length;
  const score = Math.round((passedCount / checks.length) * 100);
  const passed = checks.every((check) => check.passed);

  const result: EvidenceJudgeResult = {
    passed,
    score,
    checks,
    summary: passed
      ? `Evidence judge passed with score ${score}/100.`
      : `Evidence judge failed with score ${score}/100. Review failed checks.`
  };

  return evidenceJudgeResultSchema.parse(result);
}
