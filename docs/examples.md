# Examples (5 real examples)

1) Simple analysis and plan
```ts
const client = new ExecMindClient({ apiKey: process.env.EXECMIND_API_KEY! });
const res = await client.copilot.run({ prompt: "Find low slippage route for SOL/USDC" });
console.log(res.output, res.plan);
```

2) Policy evaluation
```ts
const policy = await client.policies.evaluate({ plan: res.plan });
if (!policy.allowed) console.warn("Policy violations:", policy.violations);
```

3) Streaming output
```ts
for await (const chunk of client.copilot.stream({ prompt: "Stream order book analysis" })) {
  process.stdout.write(chunk);
}
```

4) Non-custodial flow
```ts
// SDk returns intents. Sign externally using your oracle wallet:
const plan = res.plan;
for (const intent of plan.intents) {
  // send intent to signer
}
```

5) Error handling
```ts
try {
  await client.copilot.run({ prompt: "Invalid request" });
} catch (err) {
  if (err instanceof ValidationError) console.error("Bad input", err.message);
  else throw err;
}
```
