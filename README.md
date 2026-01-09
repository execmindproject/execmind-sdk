# ExecMind SDK
![ExecMind](assets/background.png)
**ExecMind** is a non-custodial, on-chain execution layer where AI agents analyze, decide, and execute DeFi strategies with transparency and control.

---

## Overview

The ExecMind SDK is a lightweight TypeScript client for interacting with the ExecMind API. It provides:

- A simple programmatic client (`ExecMindClient`) for calling Copilot endpoints (run, plan, stream).
- A small CLI for quick experiments (`execmind-copilot run --prompt "..."`).
- Utilities for policy evaluation and webhook signature verification.

This SDK targets Node.js (>=18) and is written in TypeScript.

---

## Quickstart

1. Install dependencies:

```bash
npm install
```

2. Set your API key (recommended to use environment variables):

```bash
export EXE CMIND_API_KEY="sk_..."
```

3. Run a quick Copilot prompt via the CLI (build first if necessary):

```bash
npm run build
node dist/cli.js run --prompt "Find low slippage route for SOL/USDC"
```

Or run directly in development using ts-node:

```bash
npx ts-node src/cli.ts run --prompt "Find low slippage route for SOL/USDC"
```

4. Use the client programmatically:

```ts
import { ExecMindClient } from "@execmind/copilot-sdk";

const client = new ExecMindClient({ apiKey: process.env.EXECMIND_API_KEY! });
const res = await client.copilot.run({ prompt: "Find low slippage route for SOL/USDC" });
console.log(res.output, res.plan);
```

---

## CLI

The repository exposes a small CLI installed as `execmind-copilot` (defined in `package.json`). Commands:

- `execmind-copilot init` — prints instructions for creating a `.env` file with `EXECMIND_API_KEY` and `EXECMIND_WEBHOOK_SECRET`.
- `execmind-copilot run --prompt "..."` — runs a copilot prompt from the CLI.

Note: the CLI requires `EXECMIND_API_KEY` to be set in your environment.

---

## Key API Highlights

- `ExecMindClient` constructor requires `{ apiKey }` and exposes:
  - `copilot.run({ prompt })` → runs a prompt and returns output and a plan
  - `copilot.stream({ prompt })` → async generator that yields streaming output
  - `policies.evaluate({ plan })` → returns policy evaluation result
  - `webhooks.verifySignature(rawBody, signature, secret?)` → verifies webhook HMAC
  - `health.ping()` → simple health check

---

## Development

- Build: `npm run build`
- Test: `npm test`
- Lint: `npm run lint`

We use TypeScript and Vitest for unit tests. If `npm install` fails due to peer deps, try:

```bash
npm install --legacy-peer-deps
```

---

## Contributing

Contributions are welcome — please open issues or PRs. For local development:

- Add your changes
- Run `npm test` and ensure new tests pass
- Open a PR with a short description of changes

---

## License

MIT

---

## Development status

This SDK is actively developed and maintained by the ExecMind team. We will continue to add features, improve stability, and expand test coverage — contributions and feedback are welcome.

