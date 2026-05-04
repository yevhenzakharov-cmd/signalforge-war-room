"use client";

import { useMemo, useState } from "react";

type ViewKey = "war-room" | "signals" | "accounts" | "competitors" | "briefings" | "system";

type Detail = {
  title: string;
  label: string;
  body: string;
  meta: Array<[string, string]>;
};

const navItems: Array<{ key: ViewKey; label: string }> = [
  { key: "war-room", label: "War Room" },
  { key: "signals", label: "Signals" },
  { key: "accounts", label: "Accounts" },
  { key: "competitors", label: "Competitors" },
  { key: "briefings", label: "Briefings" },
  { key: "system", label: "System" }
];

const accounts = [
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

const signals = [
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

const competitors = [
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

const agents = [
  ["01", "Data Validator", "Loads synthetic JSON datasets and validates them with Zod schemas."],
  ["02", "Deterministic Tools", "Build account snapshots, competitor reports, and signal digests."],
  ["03", "Executive Briefer", "Uses OpenAI Structured Outputs to generate a typed briefing."],
  ["04", "Evidence Judge", "Scores the briefing against evidence, actions, assumptions, and safety."],
  ["05", "Output Writer", "Saves reviewable Markdown and JSON artifacts for inspection."]
];

const actions = [
  ["Sales", "Prepare a NovaFox-specific launch intelligence demo."],
  ["Customer Success", "Reduce onboarding friction around reporting exports."],
  ["Product", "Prioritize actionable workflow differentiation against analytics-only competitors."]
];

const metrics = [
  {
    label: "Accounts",
    value: "4",
    icon: "◎",
    accent: "purple",
    note: "Synthetic pipeline"
  },
  {
    label: "Market Signals",
    value: "6",
    icon: "⌁",
    accent: "blue",
    note: "Detected"
  },
  {
    label: "Evidence Judge",
    value: "100%",
    icon: "◇",
    accent: "green",
    note: "Pass rate"
  },
  {
    label: "Tests",
    value: "10 / 10",
    icon: "△",
    accent: "violet",
    note: "Passing"
  }
];

function Sparkline() {
  return (
    <svg viewBox="0 0 120 34" aria-hidden="true" className="sparkline">
      <path d="M2 24 L14 17 L25 22 L37 10 L50 25 L62 15 L73 18 L84 7 L96 20 L108 12 L118 5" />
    </svg>
  );
}

function Globe() {
  return (
    <div className="globe-wrap" aria-hidden="true">
      <div className="globe">
        <div className="orbit orbit-one" />
        <div className="orbit orbit-two" />
        <div className="orbit orbit-three" />
        <div className="dot dot-one" />
        <div className="dot dot-two" />
        <div className="dot dot-three" />
      </div>
    </div>
  );
}

export default function HomePage() {
  const [activeView, setActiveView] = useState<ViewKey>("war-room");
  const [detail, setDetail] = useState<Detail | null>(null);

  const viewTitle = useMemo(() => {
    return navItems.find((item) => item.key === activeView)?.label ?? "War Room";
  }, [activeView]);

  function openPipelineDetail() {
    setActiveView("system");
    setDetail({
      label: "Pipeline Run",
      title: "SignalForge pipeline completed",
      body:
        "The demo pipeline validates synthetic datasets, builds deterministic intelligence snapshots, generates an executive briefing, applies sanitizer guardrails, runs the Evidence Judge, and saves Markdown/JSON outputs.",
      meta: [
        ["Data validation", "Passed"],
        ["Tools demo", "Passed"],
        ["Evidence Judge", "100 / 100"],
        ["Output artifacts", "Saved locally"]
      ]
    });
  }

  function openSignalDetail(signal: (typeof signals)[number]) {
    setDetail({
      label: signal.category,
      title: signal.title,
      body: signal.copy,
      meta: [
        ["Detected", signal.time],
        ["Risk", signal.risk],
        ["Evidence", signal.evidence],
        ["Recommended team", signal.risk === "HIGH" ? "Sales" : "Product"]
      ]
    });
  }

  function openAccountDetail(account: (typeof accounts)[number]) {
    setDetail({
      label: account.stage,
      title: account.name,
      body: account.summary,
      meta: [
        ["Region", account.region],
        ["Pipeline value", account.value],
        ["Fit score", account.fit],
        ["Health score", account.health]
      ]
    });
  }

  function openCompetitorDetail(competitor: (typeof competitors)[number]) {
    setDetail({
      label: competitor.category,
      title: competitor.name,
      body:
        "Competitor watch converts market positioning, strengths, weaknesses, watched signals, and sales objections into briefing-ready intelligence.",
      meta: [
        ["Strength", competitor.strength],
        ["Weakness", competitor.weakness],
        ["Sales objection", competitor.objection],
        ["Recommended angle", "Differentiate with action workflows"]
      ]
    });
  }

  function openBriefingDetail() {
    setActiveView("briefings");
    setDetail({
      label: "Executive Briefing",
      title: "NovaFox Studios opportunity and market context",
      body:
        "NovaFox Studios shows a medium-risk but high-fit opportunity. The system recommends a sales motion around launch monitoring, retention visibility, and unified intelligence workflows before a live-ops-heavy release.",
      meta: [
        ["Overall risk", "Medium"],
        ["Evidence Judge", "100 / 100"],
        ["Primary team", "Sales"],
        ["Output formats", "Markdown + JSON"]
      ]
    });
  }

  return (
    <main className="shell">
      <nav className="nav">
        <button className="brand" onClick={() => setActiveView("war-room")}>
          <div className="brand-mark">⌁</div>
          <div>
            <strong>SIGNALFORGE</strong>
            <span>WAR ROOM</span>
          </div>
        </button>

        <div className="nav-links">
          {navItems.map((item) => (
            <button
              className={activeView === item.key ? "nav-button active" : "nav-button"}
              key={item.key}
              onClick={() => setActiveView(item.key)}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="nav-actions">
          <button className="status-pill" onClick={() => setActiveView("system")}>
            <i />
            <div>
              <span>System Status</span>
              <strong>Operational</strong>
            </div>
          </button>
          <button className="run-button" onClick={openPipelineDetail}>
            Run Pipeline
          </button>
        </div>
      </nav>

      <section className="hero-grid">
        <div className="hero-copy">
          <p className="eyebrow">AI-powered business intelligence</p>
          <h1>
            Agentic <span>intelligence.</span>
            <br />
            Evidence. Action. Impact.
          </h1>
          <p className="lede">
            SignalForge War Room turns synthetic market, competitor, product,
            and support data into executive briefings your team can act on.
          </p>

          <div className="hero-buttons">
            <button onClick={openBriefingDetail}>View Latest Briefing</button>
            <button className="secondary" onClick={() => setActiveView("signals")}>
              Explore Signals
            </button>
          </div>
        </div>

        <Globe />

        <aside className="mission-card">
          <div className="card-kicker">Mission Control</div>
          <p>Latest Executive Briefing</p>
          <strong>100 / 100</strong>
          <span>Evidence Judge Score</span>

          <button className="shield" onClick={openBriefingDetail} aria-label="Open briefing judge detail">
            ◇
          </button>

          <dl>
            <button onClick={() => setActiveView("accounts")}>
              <dt>Accounts Analyzed</dt>
              <dd>4</dd>
            </button>
            <button onClick={() => setActiveView("signals")}>
              <dt>Market Signals</dt>
              <dd>6</dd>
            </button>
            <button onClick={() => setActiveView("system")}>
              <dt>Tests Passing</dt>
              <dd>10 / 10</dd>
            </button>
            <button onClick={() => setActiveView("system")}>
              <dt>System Uptime</dt>
              <dd>100%</dd>
            </button>
          </dl>

          <small>Current view: {viewTitle}</small>
        </aside>
      </section>

      <section className="metric-grid">
        {metrics.map((metric) => (
          <button
            className={`metric-card ${metric.accent}`}
            key={metric.label}
            onClick={() => {
              if (metric.label === "Accounts") setActiveView("accounts");
              if (metric.label === "Market Signals") setActiveView("signals");
              if (metric.label === "Evidence Judge") openBriefingDetail();
              if (metric.label === "Tests") setActiveView("system");
            }}
          >
            <div className="metric-icon">{metric.icon}</div>
            <strong>{metric.value}</strong>
            <div>
              <p>{metric.label}</p>
              <span>{metric.note}</span>
            </div>
            <Sparkline />
          </button>
        ))}
      </section>

      <section className="dashboard-grid">
        {activeView === "war-room" && (
          <>
            <SignalTimeline onOpen={openSignalDetail} />
            <BriefingPanel onOpen={openBriefingDetail} />
            <AgentPanel />
          </>
        )}

        {activeView === "signals" && (
          <>
            <SignalExplorer onOpen={openSignalDetail} />
            <BriefingPanel onOpen={openBriefingDetail} />
            <AgentPanel />
          </>
        )}

        {activeView === "accounts" && (
          <>
            <AccountExplorer onOpen={openAccountDetail} />
            <BriefingPanel onOpen={openBriefingDetail} />
            <AgentPanel />
          </>
        )}

        {activeView === "competitors" && (
          <>
            <CompetitorExplorer onOpen={openCompetitorDetail} />
            <BriefingPanel onOpen={openBriefingDetail} />
            <AgentPanel />
          </>
        )}

        {activeView === "briefings" && (
          <>
            <BriefingPanel onOpen={openBriefingDetail} expanded />
            <SignalTimeline onOpen={openSignalDetail} compact />
            <AgentPanel />
          </>
        )}

        {activeView === "system" && (
          <>
            <SystemPanel onRun={openPipelineDetail} />
            <BriefingPanel onOpen={openBriefingDetail} />
            <AgentPanel />
          </>
        )}
      </section>

      {detail && (
        <section className="detail-drawer">
          <div>
            <p className="panel-kicker">{detail.label}</p>
            <h2>{detail.title}</h2>
            <p>{detail.body}</p>

            <dl>
              {detail.meta.map(([key, value]) => (
                <div key={key}>
                  <dt>{key}</dt>
                  <dd>{value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <button onClick={() => setDetail(null)}>Close</button>
        </section>
      )}

      <footer>
        <span>Synthetic Data Only</span>
        <span>CLI-First Architecture</span>
        <span>OpenAI Structured Outputs</span>
        <span>Deterministic Tools</span>
        <span>Evidence Grounded</span>
        <strong>v0.1.0 MVP</strong>
      </footer>
    </main>
  );
}

function SignalTimeline({
  onOpen,
  compact = false
}: {
  onOpen: (signal: (typeof signals)[number]) => void;
  compact?: boolean;
}) {
  return (
    <article className={compact ? "panel timeline-panel compact-panel" : "panel timeline-panel"}>
      <div className="panel-head">
        <div>
          <p className="panel-kicker">Signal Timeline</p>
          <h2>Live-style intelligence stream</h2>
        </div>
        <span className="live-badge">Live Feed</span>
      </div>

      <div className="timeline-list">
        {signals.map((item) => (
          <button className="timeline-row" key={item.title} onClick={() => onOpen(item)}>
            <time>{item.time}</time>
            <span className="timeline-dot" />
            <div>
              <span className={`risk ${item.risk.toLowerCase()}`}>{item.risk}</span>
              <strong>{item.title}</strong>
              <p>{item.copy}</p>
            </div>
          </button>
        ))}
      </div>
    </article>
  );
}

function SignalExplorer({ onOpen }: { onOpen: (signal: (typeof signals)[number]) => void }) {
  return (
    <article className="panel explorer-panel">
      <div className="panel-head">
        <div>
          <p className="panel-kicker">Signals</p>
          <h2>Market signal explorer</h2>
        </div>
        <span className="live-badge">6 detected</span>
      </div>

      <div className="record-grid">
        {signals.map((signal) => (
          <button key={signal.title} className="record-card" onClick={() => onOpen(signal)}>
            <span className={`risk ${signal.risk.toLowerCase()}`}>{signal.risk}</span>
            <strong>{signal.title}</strong>
            <p>{signal.copy}</p>
            <small>{signal.evidence}</small>
          </button>
        ))}
      </div>
    </article>
  );
}

function AccountExplorer({ onOpen }: { onOpen: (account: (typeof accounts)[number]) => void }) {
  return (
    <article className="panel explorer-panel">
      <div className="panel-head">
        <div>
          <p className="panel-kicker">Accounts</p>
          <h2>Pipeline intelligence</h2>
        </div>
        <span className="judge-badge">$455K influenced</span>
      </div>

      <div className="record-grid">
        {accounts.map((account) => (
          <button key={account.name} className="record-card" onClick={() => onOpen(account)}>
            <span>{account.stage}</span>
            <strong>{account.name}</strong>
            <p>{account.summary}</p>
            <small>
              {account.region} · {account.value} · Fit {account.fit}
            </small>
          </button>
        ))}
      </div>
    </article>
  );
}

function CompetitorExplorer({
  onOpen
}: {
  onOpen: (competitor: (typeof competitors)[number]) => void;
}) {
  return (
    <article className="panel explorer-panel">
      <div className="panel-head">
        <div>
          <p className="panel-kicker">Competitors</p>
          <h2>Competitive watch</h2>
        </div>
        <span className="live-badge">3 tracked</span>
      </div>

      <div className="record-grid">
        {competitors.map((competitor) => (
          <button
            key={competitor.name}
            className="record-card"
            onClick={() => onOpen(competitor)}
          >
            <span>{competitor.category}</span>
            <strong>{competitor.name}</strong>
            <p>{competitor.weakness}</p>
            <small>{competitor.objection}</small>
          </button>
        ))}
      </div>
    </article>
  );
}

function BriefingPanel({
  onOpen,
  expanded = false
}: {
  onOpen: () => void;
  expanded?: boolean;
}) {
  return (
    <article className={expanded ? "panel briefing-panel expanded" : "panel briefing-panel"}>
      <div className="panel-head">
        <div>
          <p className="panel-kicker">Latest Executive Briefing</p>
          <h2>NovaFox Studios opportunity</h2>
        </div>
        <span className="judge-badge">Judge 100/100</span>
      </div>

      <p className="briefing-text">
        NovaFox Studios shows a medium-risk but high-fit opportunity. The system
        recommends a sales motion around launch monitoring, retention visibility,
        and unified intelligence workflows before a live-ops-heavy release.
      </p>

      <div className="action-grid">
        {actions.map(([team, copy]) => (
          <button className="action-card" key={team} onClick={onOpen}>
            <span>◎</span>
            <strong>{team}</strong>
            <p>{copy}</p>
          </button>
        ))}
      </div>

      <button className="panel-link" onClick={onOpen}>
        View full briefing →
      </button>
    </article>
  );
}

function AgentPanel() {
  return (
    <aside className="panel agent-panel">
      <div className="panel-head">
        <div>
          <p className="panel-kicker">Agent Stack</p>
          <h2>System workflow</h2>
        </div>
      </div>

      <div className="agent-list">
        {agents.map(([num, name, copy]) => (
          <div className="agent-row" key={name}>
            <span>{num}</span>
            <div>
              <strong>{name}</strong>
              <p>{copy}</p>
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
}

function SystemPanel({ onRun }: { onRun: () => void }) {
  return (
    <article className="panel explorer-panel">
      <div className="panel-head">
        <div>
          <p className="panel-kicker">System</p>
          <h2>Agent runtime status</h2>
        </div>
        <span className="judge-badge">Operational</span>
      </div>

      <div className="record-grid">
        <button className="record-card" onClick={onRun}>
          <span>Pipeline</span>
          <strong>Run full intelligence flow</strong>
          <p>Validate data, run tools, generate briefing, judge it, and save outputs.</p>
          <small>Click to simulate pipeline result</small>
        </button>

        <button className="record-card" onClick={onRun}>
          <span>CI</span>
          <strong>GitHub Actions passing</strong>
          <p>Typecheck and Vitest run automatically on pushes and pull requests.</p>
          <small>4 test files · 10 tests</small>
        </button>

        <button className="record-card" onClick={onRun}>
          <span>Safety</span>
          <strong>Public-demo guardrails active</strong>
          <p>Briefings are sanitized and judged for private-data language.</p>
          <small>Evidence Judge score: 100/100</small>
        </button>
      </div>
    </article>
  );
}
