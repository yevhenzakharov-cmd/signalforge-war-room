# Security Policy

## Supported Versions

This is a public demo repository. The current supported version is:

- `v0.1.0`

## Reporting a Vulnerability

If you find a security issue, please do not open a public issue with exploit details.

Instead, contact the repository owner privately through GitHub.

## Data and Secrets Policy

This project must not include:

- API keys
- private company data
- real customer records
- private prompts
- private repository content
- confidential workflows
- real CRM/support exports

Local secrets should be stored only in `.env`.

The `.env` file is ignored by Git and must not be committed.

## Demo Scope

SignalForge War Room uses synthetic and public-style data only.

The project is intended to demonstrate AI-agent engineering patterns, not to expose or reproduce private production systems.
