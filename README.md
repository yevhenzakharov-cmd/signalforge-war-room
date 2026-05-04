# SignalForge War Room

SignalForge War Room is a CLI-first, API-ready multi-agent business intelligence demo system.

It simulates how a DappRadar-like company could use AI agents to monitor market signals, account activity, competitor movement, support/product risk, and executive decision workflows using only synthetic and public-style data.

## Why This Exists

This repo demonstrates production-style AI-agent engineering patterns:

- typed synthetic data
- Zod schema validation
- deterministic tool functions
- OpenAI Structured Outputs
- agent workflow orchestration
- evidence judging
- local output persistence
- tests and documentation

This is an original public demo project. It does not contain private DappRadar code, private company data, private APIs, confidential workflows, private prompts, or real customer records.

## Core Workflow

```mermaid
flowchart TD
  A[Synthetic Data] --> B[Zod Schemas]
  B --> C[Deterministic Tools]
  C --> D[Executive Briefer Agent]
  D --> E[Structured Briefing]
  E --> F[Sanitizer Guardrail]
  F --> G[Evidence Judge]
  G --> H[Saved Markdown and JSON Outputs]