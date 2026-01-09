# Errors

The SDK maps failures to typed errors for clearer handling.

| Error | Condition |
|---|---|
| AuthError | 401 responses or missing/invalid API key |
| RateLimitError | 429 responses |
| ValidationError | 4xx client errors |
| NetworkError | Timeouts or network failures |
| ExecMindError | Generic server error |

## Retry strategy

The SDK retries network requests with exponential backoff (defaults: 3 attempts, base 250ms) for transient network issues. You can opt to handle idempotency on your side for repeated attempts.
