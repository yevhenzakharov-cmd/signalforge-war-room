export type ViewKey =
  | "war-room"
  | "signals"
  | "accounts"
  | "competitors"
  | "briefings"
  | "system";

export const navItems: Array<{ key: ViewKey; label: string; href: string }> = [
  { key: "war-room", label: "War Room", href: "/" },
  { key: "signals", label: "Signals", href: "/signals" },
  { key: "accounts", label: "Accounts", href: "/accounts" },
  { key: "competitors", label: "Competitors", href: "/competitors" },
  { key: "briefings", label: "Briefings", href: "/briefings" },
  { key: "system", label: "System", href: "/system" }
];

export const accounts = [
  {
    name: "NovaFox Studios",
    stage: "Discovery",
    region: "Europe",
    value: "$84K",
    fit: "87",
    health: "72",
    summary:
      "Mid-market game studio preparing for a live-ops-heavy launch cycle. Strong fit for launch monitoring, retention visibility, and unified intelligence workflows."
  },
  {
    name: "Arcadia Playworks",
    stage: "Evaluation",
    region: "North America",
    value: "$125K",
    fit: "91",
    health: "81",
    summary:
      "Mobile game publisher evaluating portfolio intelligence, competitor launch tracking, and publisher-level reporting workflows."
  },
  {
    name: "PixelGuild Interactive",
    stage: "Pilot",
    region: "United Kingdom",
    value: "$36K",
    fit: "78",
    health: "64",
    summary:
      "Indie game studio with reporting export friction and onboarding questions. Good fit for analyst-in-a-box workflow positioning."
  },
  {
    name: "Luminary Games",
    stage: "Prospect",
    region: "Eastern Europe",
    value: "$210K",
    fit: "84",
    health: "70",
    summary:
      "AAA-adjacent co-development studio. Opportunity angle is publisher demand tracking and market positioning intelligence."
  }
];

export const signals = [
  {
    time: "08:00 UTC",
    title: "NovaFox increases live-ops hiring",
    category: "Hiring",
    copy: "Potential launch-readiness opportunity detected.",
    risk: "HIGH",
    evidence: "mock_news:novafox_liveops_hiring_2026_05_04"
  },
  {
    time: "09:30 UTC",
    title: "DataPulse shifts toward publisher bundles",
    category: "Competitor Update",
    copy: "Competitive positioning update for sales strategy.",
    risk: "MEDIUM",
    evidence: "mock_competitor:data_pulse_pricing_snapshot"
  },
  {
    time: "10:00 UTC",
    title: "PixelGuild support questions cluster",
    category: "Support Spike",
    copy: "Reporting export friction appears during pilot onboarding.",
    risk: "MEDIUM",
    evidence: "support_cluster:pixelguild_reporting_exports"
  },
  {
    time: "10:20 UTC",
    title: "Co-development demand signals increase",
    category: "Market Report",
    copy: "Partnership opportunity for studios tracking publisher demand.",
    risk: "LOW",
    evidence: "source_notes:co_development_market_signals"
  }
];

export const competitors = [
  {
    name: "DataPulse Gaming",
    category: "Game analytics platform",
    strength: "Clear analytics dashboard positioning",
    weakness: "Limited AI-assisted action workflows",
    objection: "We already have analytics dashboards."
  },
  {
    name: "PlayIntel Labs",
    category: "Market intelligence and competitor research",
    strength: "Strong research brand",
    weakness: "Manual report delivery",
    objection: "We already buy analyst reports."
  },
  {
    name: "OpsMatrix AI",
    category: "AI operations assistant",
    strength: "Broad productivity pitch",
    weakness: "Generic positioning",
    objection: "Generic AI assistants are cheaper."
  }
];

export const agents = [
  ["01", "Data Validator", "Loads synthetic JSON datasets and validates them with Zod schemas."],
  ["02", "Deterministic Tools", "Build account snapshots, competitor reports, and signal digests."],
  ["03", "Executive Briefer", "Uses OpenAI Structured Outputs to generate a typed briefing."],
  ["04", "Evidence Judge", "Scores the briefing against evidence, actions, assumptions, and safety."],
  ["05", "Output Writer", "Saves reviewable Markdown and JSON artifacts for inspection."]
];

export const actions = [
  ["Sales", "Prepare a NovaFox-specific launch intelligence demo."],
  ["Customer Success", "Reduce onboarding friction around reporting exports."],
  ["Product", "Prioritize actionable workflow differentiation against analytics-only competitors."]
];

export const metrics = [
  {
    label: "Accounts",
    value: "4",
    icon: "◎",
    accent: "purple",
    note: "Synthetic pipeline",
    href: "/accounts"
  },
  {
    label: "Market Signals",
    value: "6",
    icon: "⌁",
    accent: "blue",
    note: "Detected",
    href: "/signals"
  },
  {
    label: "Evidence Judge",
    value: "100%",
    icon: "◇",
    accent: "green",
    note: "Pass rate",
    href: "/briefings"
  },
  {
    label: "Tests",
    value: "10 / 10",
    icon: "△",
    accent: "violet",
    note: "Passing",
    href: "/system"
  }
];
