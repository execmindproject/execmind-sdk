# Authentication

The SDK expects an API key to authenticate requests to ExecMind services.

Environment variable: `EXECMIND_API_KEY` (required)

Pass the API key into the client:

```ts
const client = new ExecMindClient({ apiKey: process.env.EXECMIND_API_KEY! });
```

The SDK sets the `Authorization: Bearer <API_KEY>` header on requests automatically.
