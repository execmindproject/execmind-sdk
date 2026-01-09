import { apiFetch } from "../utils/fetch";
import { Logger } from "../utils/logger";

export async function* streamCopilot(opts: { apiKey: string; baseUrl: string; timeoutMs?: number; logger: Logger },
  request: { prompt: string; context?: Record<string, any> }) {
  const url = `${opts.baseUrl.replace(/\/$/, "")}/copilot/stream`;

  const controller = new AbortController();
  const timeout = opts.timeoutMs ?? 15000;
  const timer = setTimeout(() => controller.abort(), timeout);

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${opts.apiKey}`,
      },
      body: JSON.stringify(request),
      signal: controller.signal,
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(`Stream request failed: ${res.status} ${text}`);
    }

    const decoder = new TextDecoder();
    for await (const chunk of res.body as any) {
      yield decoder.decode(chunk, { stream: true });
    }
  } finally {
    clearTimeout(timer);
  }
}
