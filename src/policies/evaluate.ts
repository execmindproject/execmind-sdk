import { apiFetch } from "../utils/fetch";
import { PolicyEvaluateRequestSchema, PolicyResultSchema } from "../types";
import { Logger } from "../utils/logger";

export async function evaluatePolicy(
  opts: { apiKey: string; baseUrl: string; timeoutMs?: number; logger: Logger },
  request: unknown
) {
  const parsed = PolicyEvaluateRequestSchema.parse(request);

  const res = await apiFetch(
    { apiKey: opts.apiKey, baseUrl: opts.baseUrl, timeoutMs: opts.timeoutMs, logger: opts.logger },
    "/policies/evaluate",
    { method: "POST", body: JSON.stringify(parsed) }
  );

  return PolicyResultSchema.parse(res);
}
