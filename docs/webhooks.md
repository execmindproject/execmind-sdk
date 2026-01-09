# Webhooks

ExecMind webhooks use HMAC-SHA256 signing. Use `EXECMIND_WEBHOOK_SECRET` to verify signatures.

## Signature verification

When receiving a webhook:

1. Take the raw request body as a string or buffer.
2. Compare the HMAC-SHA256 hex digest against the `X-ExecMind-Signature` header using constant-time comparison.

Example (Express):

```ts
import express from "express";
import { verifySignature } from "@execmind/copilot-sdk";

const app = express();
app.post("/webhook", express.raw({ type: "*/*" }), (req, res) => {
  const sig = req.headers["x-execmind-signature"] as string | undefined;
  if (!sig || !verifySignature(req.body, sig, process.env.EXECMIND_WEBHOOK_SECRET!)) {
    return res.status(401).send("invalid signature");
  }
  // process webhook payload
  res.sendStatus(200);
});
```

Security notes:
- Keep the webhook secret confidential
- Use TLS for delivery
- Limit processing time for webhook handlers
