export async function retry<T>(fn: () => Promise<T>, attempts = 3, baseMs = 250): Promise<T> {
  let lastError: unknown;
  for (let i = 0; i < attempts; i++) {
    try {
      return await fn();
    } catch (err) {
      lastError = err;
      if (i === attempts - 1) break;
      const backoff = jitter(baseMs * Math.pow(2, i));
      await wait(backoff);
    }
  }
  throw lastError;
}

function jitter(ms: number) {
  return ms + Math.floor(Math.random() * ms * 0.2);
}

function wait(ms: number) {
  return new Promise((res) => setTimeout(res, ms));
}
