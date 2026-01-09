import { Logger } from "./logger";
import { retry } from "./retry";
import { ExecMindError, AuthError, RateLimitError, ValidationError, NetworkError } from "../errors";

export interface FetchOptions {
  apiKey: string;
  baseUrl: string;
  timeoutMs?: number;
  logger: Logger;
}

export async function apiFetch<T = any>(
  opts: FetchOptions,
  path: string,
  init: RequestInit = {},
  retryAttempts = 3
): Promise<T> {
  const url = `${opts.baseUrl.replace(/\/$/, "")}${path.startsWith("/") ? path : "/" + path}`;

  return retry(async () => {
    const controller = new AbortController();
    const timeout = opts.timeoutMs ?? 15000;
    const timer = setTimeout(() => controller.abort(), timeout);

    const headers: HeadersInit = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${opts.apiKey}`,
      ...(init.headers ?? {}),
    };

    opts.logger.debug("fetch", url, { method: init.method ?? "GET", timeout });

    let res: Response;
    try {
      res = await fetch(url, { ...init, headers, signal: controller.signal });
    } catch (err: unknown) {
      if ((err as any)?.name === "AbortError") {
        throw new NetworkError("Request timed out");
      }
      throw new NetworkError((err as any)?.message ?? "Network error");
    } finally {
      clearTimeout(timer);
    }

    const text = await res.text();
    opts.logger.debug("response text", text.slice(0, 1024));

    let json: any = undefined;
    try {
      json = text ? JSON.parse(text) : undefined;
    } catch (e) {
      // not JSON — we'll keep raw text
    }

    if (!res.ok) {
      // Map status codes to typed errors
      if (res.status === 401) throw new AuthError(json?.message ?? text ?? "Unauthorized");
      if (res.status === 429) throw new RateLimitError(json?.message ?? text ?? "Rate limited");
      if (res.status >= 400 && res.status < 500) throw new ValidationError(json?.message ?? text ?? "Bad request");
      throw new ExecMindError(json?.message ?? text ?? "Server error", { status: res.status });
    }

    return json as T;
  }, retryAttempts);
}
