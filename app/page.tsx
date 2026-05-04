const metrics = [
  {
    label: "Accounts analyzed",
    value: "4",
    note: "Synthetic game studio pipeline"
  },
  {
    label: "Market signals",
    value: "6",
    note: "Hiring, retention, support, competitor movement"
  },
  {
    label: "Evidence Judge",
    value: "100%",
    note: "Latest briefing passed validation"
  },
  {
    label: "Tests passing",
    value: "10",
    note: "Offline checks running in CI"
  }
];

const signals = [
  {
    time: "08:00 UTC",
    title: "NovaFox increases live-ops hiring",
    copy: "Potential launch-readiness opportunity detected.",
    risk: "HIGH"
  },
  {
    time: "09:30 UTC",
    title: "DataPulse shifts toward publisher bundles",
    copy: "Competitive positioning update for sales strategy.",
    risk: "MEDIUM"
  },
  {
    time: "10:00 UTC",
    title: "PixelGuild support questions cluster",
    copy: "Reporting export friction appears during pilot onboarding.",
    risk: "MEDIUM"
  },
  {
    time: "10:20 UTC",
    title: "Co-development demand signals increase",
    copy: "Partnership opportunity for studios tracking publisher demand.",
    risk: "LOW"
  }
];

const agents = [
  {
    name: "Data Validator",
    copy: "Loads synthetic JSON datasets and validates them with Zod schemas."
  },
  {
    name: "Deterministic Tools",
    copy: "Build account snapshots, competitor reports, and war room signal digests."
  },
  {
    name: "Executive Briefer",
    copy: "Uses OpenAI Structured Outputs to generate a typed executive briefing."
  },
  {
    name: "Evidence Judge",
    copy: "Scores the briefing against evidence, actions, assumptions, and safety checks."
  },
  {
    name: "Output Writer",
    copy: "Saves reviewable Markdown and JSON artifacts for inspection."
  }
];

export default function HomePage() {
  return (
    <main className="page-shell">
      <section className="hero">
        <div>
          <p className="eyebrow">SignalForge War Room</p>
          <h1>Agentic business intelligence for market, sales, and product teams.</h1>
          <p className="hero-copy">
            A CLI-first AI agent system that turns synthetic account, competitor,
            market, support, and product data into evidence-grounded executive
            briefings.
          </p>
        </div>

        <div className="hero-card">
          <span>v0.1.0 MVP</span>
          <strong>CI passing</strong>
          <p>TypeScript · OpenAI · Zod · Vitest · GitHub Actions</p>
        </div>
      </section>

      <section className="metrics-grid">
        {metrics.map((metric) => (
          <article className="metric-card" key={metric.label}>
            <p>{metric.label}</p>
            <strong>{metric.value}</strong>
            <span>{metric.note}</span>
          </article>
        ))}
      </section>

      <section className="content-grid">
        <article className="panel panel-large">
          <div className="section-heading">
            <div>
              <p className="eyebrow small">Synthetic data stream</p>
              <h2>War Room Signal Timeline</h2>
            </div>
            <span className="pill">Live-style demo</span>
          </div>

          <div className="timeline">
            {signals.map((signal) => (
              <div className="signal-row" key={signal.title}>
                <span className="time">{signal.time}</span>
                <div>
                  <strong>{signal.title}</strong>
                  <p>{signal.copy}</p>
                </div>
                <span className={`risk risk-${signal.risk.toLowerCase()}`}>
                  {signal.risk}
                </span>
              </div>
            ))}
          </div>

          <div className="briefing-card">
            <div className="section-heading compact">
              <div>
                <p className="eyebrow small">Structured output</p>
                <h2>Latest Executive Briefing</h2>
              </div>
              <span className="pill success">Judge 100/100</span>
            </div>

            <p>
              NovaFox Studios shows a medium-risk but high-fit opportunity. The
              system recommends a sales motion around launch monitoring,
              retention visibility, and unified intelligence workflows before a
              live-ops-heavy release.
            </p>

            <div className="actions">
              <div>
                <strong>Sales</strong>
                <span>Prepare a NovaFox-specific launch intelligence demo.</span>
              </div>
              <div>
                <strong>Customer Success</strong>
                <span>Reduce onboarding friction around reporting exports.</span>
              </div>
              <div>
                <strong>Product</strong>
                <span>
                  Prioritize actionable workflow differentiation against
                  analytics-only competitors.
                </span>
              </div>
            </div>
          </div>
        </article>

        <aside className="panel">
          <div className="section-heading">
            <div>
              <p className="eyebrow small">System design</p>
              <h2>Agent Stack</h2>
            </div>
          </div>

          <div className="agent-list">
            {agents.map((agent, index) => (
              <div className="agent-card" key={agent.name}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <strong>{agent.name}</strong>
                  <p>{agent.copy}</p>
                </div>
              </div>
            ))}
          </div>
        </aside>
      </section>

      <footer>
        Synthetic data only · Public demo project · No private company systems
      </footer>
    </main>
  );
}
