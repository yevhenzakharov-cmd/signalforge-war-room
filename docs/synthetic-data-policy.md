# Synthetic Data Policy

SignalForge War Room uses synthetic and public-style data only.

## Allowed Data

This project may use:

- synthetic account records
- synthetic support tickets
- synthetic product metrics
- synthetic competitor profiles
- public-source-inspired market summaries
- mock evidence references

## Disallowed Data

This project must not include:

- private DappRadar code
- private DappRadar data
- private DappRadar APIs
- confidential company workflows
- real customer data
- real support tickets
- real CRM exports
- private prompts
- internal repository content

## Why This Exists

The goal is to demonstrate AI-agent engineering patterns without exposing confidential systems.

This repo is a public reconstruction/demo inspired by prior AI-agent experience, not a release of private company code or private operational workflows.

## Mock Data Design

Mock datasets live in:

- `data/mock/accounts.json`
- `data/mock/competitors.json`
- `data/mock/market_signals.json`
- `data/mock/support_tickets.json`
- `data/mock/product_metrics.json`

The data is designed to feel realistic enough for testing agent workflows while remaining safe for a public GitHub repo.

## Generated Outputs

Generated outputs are saved to:

- `outputs/briefings`
- `outputs/judge-reports`

The `outputs/` folder is ignored by Git because generated local artifacts should not be committed by default.