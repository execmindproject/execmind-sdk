import { apiFetch } from "../utils/fetch";
import { ExecutionPlanSchema } from "../types";
import { Logger } from "../utils/logger";

export async function planCopilot(opts: { apiKey: string; baseUrl: string; timeoutMs?: number; logger: Logger },
  planInput: unknown) {
  // the server is expected to return ExecutionPlan
  const res = await apiFetch(
    { apiKey: opts.apiKey, baseUrl: opts.baseUrl, timeoutMs: opts.timeoutMs, logger: opts.logger },
    "/copilot/plan",
    { method: "POST", body: JSON.stringify(planInput) }
  );

  return ExecutionPlanSchema.parse(res);
}
