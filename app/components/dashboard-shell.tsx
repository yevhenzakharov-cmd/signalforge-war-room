"use client";

import { type ReactNode, useState } from "react";
import {
  accounts,
  actions,
  agents,
  competitors,
  metrics,
  navItems,
  signals,
  type ViewKey
} from "../data/dashboard-data.js";


function Link({
  href,
  className,
  children
}: {
  href: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <a className={className} href={href}>
      {children}
    </a>
  );
}

type Detail = {
  title: string;
  label: string;
  body: string;
  meta: Array<[string, string]>;
};

type DashboardShellProps = {
  activeView: ViewKey;
};

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

export function DashboardShell({ activeView }: DashboardShellProps) {
  const [detail, setDetail] = useState<Detail | null>(null);

  function openPipelineDetail() {
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

  function openBriefingDetail() {
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
        <Link className="brand" href="/">
          <div className="brand-mark">⌁</div>
          <div>
            <strong>SIGNALFORGE</strong>
            <span>WAR ROOM</span>
          </div>
        </Link>

        <div className="nav-links">
          {navItems.map((item) => (
            <Link
              className={activeView === item.key ? "nav-button active" : "nav-button"}
              href={item.href}
              key={item.key}
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="nav-actions">
          <Link className="status-pill" href="/system">
            <i />
            <div>
              <span>System Status</span>
              <strong>Operational</strong>
            </div>
          </Link>
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
          </h1>
          <p className="lede">
            SignalForge War Room turns synthetic market, competitor, product,
            and support data into executive briefings your team can act on.
          </p>

          <div className="hero-buttons">
            <Link href="/briefings">View Latest Briefing</Link>
            <Link className="secondary" href="/signals">
              Explore Signals
            </Link>
          </div>
        </div>

        <Globe />

        <aside className="mission-card">
          <div className="card-kicker">Mission Control</div>
          <p>Latest Executive Briefing</p>
          <strong>100 / 100</strong>
          <span>Evidence Judge Score</span>

          <button
            className="shield"
            onClick={openBriefingDetail}
            aria-label="Open briefing judge detail"
          >
            ◇
          </button>

          <dl>
            <Link href="/accounts">
              <dt>Accounts Analyzed</dt>
              <dd>4</dd>
            </Link>
            <Link href="/signals">
              <dt>Market Signals</dt>
              <dd>6</dd>
            </Link>
            <Link href="/system">
              <dt>Tests Passing</dt>
              <dd>10 / 10</dd>
            </Link>
            <Link href="/system">
              <dt>System Uptime</dt>
              <dd>100%</dd>
            </Link>
          </dl>

          <small>Current page: {navItems.find((item) => item.key === activeView)?.label}</small>
        </aside>
      </section>

      <section className="metric-grid">
        {metrics.map((metric) => (
          <Link className={`metric-card ${metric.accent}`} key={metric.label} href={metric.href}>
            <div className="metric-icon">{metric.icon}</div>
            <strong>{metric.value}</strong>
            <div>
              <p>{metric.label}</p>
              <span>{metric.note}</span>
            </div>
            <Sparkline />
          </Link>
        ))}
      </section>

      <section className="dashboard-grid">
        {activeView === "war-room" && (
          <>
            <SignalTimeline setDetail={setDetail} />
            <BriefingPanel openBriefingDetail={openBriefingDetail} />
            <AgentPanel />
          </>
        )}

        {activeView === "signals" && (
          <>
            <SignalExplorer setDetail={setDetail} />
            <BriefingPanel openBriefingDetail={openBriefingDetail} />
            <AgentPanel />
          </>
        )}

        {activeView === "accounts" && (
          <>
            <AccountExplorer setDetail={setDetail} />
            <BriefingPanel openBriefingDetail={openBriefingDetail} />
            <AgentPanel />
          </>
        )}

        {activeView === "competitors" && (
          <>
            <CompetitorExplorer setDetail={setDetail} />
            <BriefingPanel openBriefingDetail={openBriefingDetail} />
            <AgentPanel />
          </>
        )}

        {activeView === "briefings" && (
          <>
            <BriefingPanel openBriefingDetail={openBriefingDetail} expanded />
            <SignalTimeline setDetail={setDetail} compact />
            <AgentPanel />
          </>
        )}

        {activeView === "system" && (
          <>
            <SystemPanel onRun={openPipelineDetail} />
            <BriefingPanel openBriefingDetail={openBriefingDetail} />
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
  setDetail,
  compact = false
}: {
  setDetail: (detail: Detail) => void;
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
          <button
            className="timeline-row"
            key={item.title}
            onClick={() =>
              setDetail({
                label: item.category,
                title: item.title,
                body: item.copy,
                meta: [
                  ["Detected", item.time],
                  ["Risk", item.risk],
                  ["Evidence", item.evidence],
                  ["Recommended team", item.risk === "HIGH" ? "Sales" : "Product"]
                ]
              })
            }
          >
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

      <Link className="panel-link" href="/signals">
        View all signals →
      </Link>
    </article>
  );
}

function SignalExplorer({ setDetail }: { setDetail: (detail: Detail) => void }) {
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
          <button
            key={signal.title}
            className="record-card"
            onClick={() =>
              setDetail({
                label: signal.category,
                title: signal.title,
                body: signal.copy,
                meta: [
                  ["Detected", signal.time],
                  ["Risk", signal.risk],
                  ["Evidence", signal.evidence],
                  ["Category", signal.category]
                ]
              })
            }
          >
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

function AccountExplorer({ setDetail }: { setDetail: (detail: Detail) => void }) {
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
          <button
            key={account.name}
            className="record-card"
            onClick={() =>
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
              })
            }
          >
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

function CompetitorExplorer({ setDetail }: { setDetail: (detail: Detail) => void }) {
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
            onClick={() =>
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
              })
            }
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
  openBriefingDetail,
  expanded = false
}: {
  openBriefingDetail: () => void;
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
          <button className="action-card" key={team} onClick={openBriefingDetail}>
            <span>◎</span>
            <strong>{team}</strong>
            <p>{copy}</p>
          </button>
        ))}
      </div>

      <button className="panel-link" onClick={openBriefingDetail}>
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
