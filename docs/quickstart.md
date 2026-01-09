# Quickstart ✅

## Install

```bash
npm install @execmind/copilot-sdk
```

## Setup env

Create a `.env` with the variables in `.env.example`:

```
EXECMIND_API_KEY=sk_...
EXECMIND_BASE_URL=https://api.execmind.xyz
EXECMIND_WEBHOOK_SECRET=...
```

## First Copilot run

```ts
import { ExecMindClient } from "@execmind/copilot-sdk";

const client = new ExecMindClient({ apiKey: process.env.EXECMIND_API_KEY! });

const res = await client.copilot.run({
  prompt: "Analyze SOL/USDC liquidity and produce a safe execution plan",
  context: { chain: "solana", market: "SOL/USDC" },
  policy: { maxSlippageBps: 50, allowPerps: false },
});

console.log(res.output);
console.log(res.plan);
```

Streaming

```ts
for await (const chunk of client.copilot.stream({ prompt: "Please stream result" })) {
  console.log(chunk);
}
```

## CLI

After installing globally or via `npx`, you can run:

```bash
execmind-copilot run --prompt "Analyze SOL liquidity"
```
