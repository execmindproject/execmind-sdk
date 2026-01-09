import { apiFetch } from "../utils/fetch";
import { CopilotRunRequestSchema, CopilotRunResponseSchema, CopilotRunRequest } from "../types";
import { Logger } from "../utils/logger";

export async function runCopilot(opts: { apiKey: string; baseUrl: string; timeoutMs?: number; logger: Logger },
  request: CopilotRunRequest) {
  const parsed = CopilotRunRequestSchema.parse(request);

  const res = await apiFetch(
    { apiKey: opts.apiKey, baseUrl: opts.baseUrl, timeoutMs: opts.timeoutMs, logger: opts.logger },
    "/copilot/run",
    { method: "POST", body: JSON.stringify(parsed) }
  );

  return CopilotRunResponseSchema.parse(res as any);

}
