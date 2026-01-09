# Copilot Engine

The Copilot engine analyzes prompts and context to produce:

- A human-readable analysis and output string
- A policy-evaluated ExecutionPlan object consisting of `TxIntent[]`

Key principles:

- Non-custodial: the SDK NEVER signs or broadcasts transactions — it only returns `ExecutionPlan` objects that describe intended actions.
- Policy-first: the engine evaluates the plan against policies and returns `PolicyResult` with `RiskProfile`.
- Streaming: when requested, copilot streaming yields partial results as they are produced.

ExecutionPlan lifecycle:

1. User requests a plan via `client.copilot.plan` or `client.copilot.run`.
2. The service produces intents and performs policy checks.
3. The SDK returns the plan and policy report. Signing and broadcasting are performed externally.

Always review `plan.intents` and `policy` results before acting.
