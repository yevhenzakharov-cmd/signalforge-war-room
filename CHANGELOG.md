# Changelog

All notable changes to SignalForge War Room will be documented in this file.

## [v0.1.0] - 2026-05-04

### Added

- CLI-first TypeScript project scaffold
- Synthetic business intelligence datasets
- Zod schemas for data, tools, briefings, and judge results
- Mock data loader with schema validation
- Deterministic intelligence tools
  - account intelligence snapshot
  - competitor watch snapshot
  - war room signal digest
  - support risk scoring
- Executive Briefer AI workflow using OpenAI Structured Outputs
- Evidence Judge for deterministic briefing validation
- Sanitizer guardrail for public-demo-safe wording
- Offline Evidence Judge test coverage
- Markdown and JSON output persistence
- Example briefing and judge output files
- Architecture documentation
- Agent workflow documentation
- Synthetic data policy
- Security policy
- Contribution guidelines
- MIT license
- GitHub Actions CI workflow
- Dependabot configuration
- README with CI badge and project overview

### Data Policy

This release uses only synthetic and public-style data.

It does not include:

- private DappRadar code
- private company data
- private APIs
- confidential workflows
- private prompts
- real customer records
- real CRM exports

### Notes

This is the first public MVP snapshot of SignalForge War Room.

The project is CLI-first and UI-optional. It is designed to demonstrate production-style AI-agent engineering patterns without exposing private systems.
