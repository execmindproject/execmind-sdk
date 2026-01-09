import { Logger } from "./utils/logger";
import { runCopilot, planCopilot, streamCopilot } from "./copilot";
import { evaluatePolicy } from "./policies";
import { verifySignature } from "./webhooks";
import { PolicyResult, CopilotRunRequest, CopilotRunResponse } from "./types";

export type LogLevel = "silent" | "error" | "info" | "debug";

export interface ExecMindClientOptions {
  apiKey: string;
  baseUrl?: string;
  timeoutMs?: number;
  logger?: LogLevel;
}

export class ExecMindClient {
  public apiKey: string;
  public baseUrl: string;
  public timeoutMs: number;
  public logger: Logger;

  public copilot: {
    run: (req: CopilotRunRequest) => Promise<CopilotRunResponse>;
    plan: (input: unknown) => Promise<any>;
    stream: (req: { prompt: string; context?: Record<string, any> }) => AsyncGenerator<string, void, unknown>;
  };

  public policies: {
    evaluate: (req: unknown) => Promise<PolicyResult>;
  };

  public webhooks: {
    verifySignature: (rawBody: string | Buffer, signature: string, secret?: string) => boolean;
  };

  public health: {
    ping: () => Promise<{ ok: true }>;
  };

  constructor(opts: ExecMindClientOptions) {
    if (!opts?.apiKey) throw new Error("ExecMindClient: apiKey is required");
    this.apiKey = opts.apiKey;
    this.baseUrl = opts.baseUrl ?? process.env.EXECMIND_BASE_URL ?? "https://api.execmind.xyz";
    this.timeoutMs = opts.timeoutMs ?? Number(process.env.EXECMIND_TIMEOUT_MS ?? 15000);
    this.logger = new Logger(opts.logger ?? (process.env.EXECMIND_LOGGER as any) ?? "info");

    // Bind modules
    this.copilot = {
      run: (req) => runCopilot({ apiKey: this.apiKey, baseUrl: this.baseUrl, timeoutMs: this.timeoutMs, logger: this.logger }, req),
      plan: (input) => planCopilot({ apiKey: this.apiKey, baseUrl: this.baseUrl, timeoutMs: this.timeoutMs, logger: this.logger }, input),
      stream: (req) => streamCopilot({ apiKey: this.apiKey, baseUrl: this.baseUrl, timeoutMs: this.timeoutMs, logger: this.logger }, req),
    };

    this.policies = {
      evaluate: (req) => evaluatePolicy({ apiKey: this.apiKey, baseUrl: this.baseUrl, timeoutMs: this.timeoutMs, logger: this.logger }, req),
    };

    this.webhooks = {
      verifySignature: (rawBody: string | Buffer, signature: string, secret?: string) => {
        const s = secret ?? process.env.EXECMIND_WEBHOOK_SECRET ?? "";
        return verifySignature(rawBody, signature, s);
      },
    };

    this.health = {
      ping: async () => {
        // simple ping implementation
        const res = await fetch(`${this.baseUrl.replace(/\/$/, "")}/health/ping`, { headers: { Authorization: `Bearer ${this.apiKey}` } });
        if (!res.ok) throw new Error("Health ping failed");
        return { ok: true } as const;
      },
    };
  }
}
