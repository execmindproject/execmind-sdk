# API Reference

## ExecMindClient

### new ExecMindClient(options)

Options:
- `apiKey: string` (required)
- `baseUrl?: string` (defaults to https://api.execmind.xyz)
- `timeoutMs?: number`
- `logger?: "silent" | "error" | "info" | "debug"`

### client.copilot.run(request)

Request: `CopilotRunRequest` (see types)
Returns: `CopilotRunResponse`

This will run the full copilot flow and produce output and an optional `ExecutionPlan`.

### client.copilot.plan(input)

Generates an `ExecutionPlan` from the provided input.

### client.copilot.stream(request)

Returns an async iterable that yields strings as chunks.

### client.policies.evaluate(request)

Evaluates a plan and returns `PolicyResult`.

### client.webhooks.verifySignature(rawBody, signature, secret?)

Verify a webhook HMAC-SHA256 signature. If `secret` is omitted, `EXECMIND_WEBHOOK_SECRET` is used.

### client.health.ping()

Simple health check. Throws on failure.


## Types
See `src/types` for full runtime-validated schemas using `zod`:

- `CopilotRunRequest`
- `CopilotRunResponse`
- `ExecutionPlan`
- `TxIntent`
- `PolicyResult`
- `RiskProfile`


## Errors
The SDK maps HTTP and network issues to typed errors:
- `AuthError` (401)
- `RateLimitError` (429)
- `ValidationError` (4xx)
- `NetworkError`
- `ExecMindError` (base)
