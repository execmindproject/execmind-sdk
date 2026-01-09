import { z } from "zod";

export const CopilotRunRequestSchema = z.object({
  prompt: z.string().min(1),
  context: z.record(z.any()).optional(),
  policy: z
    .object({ maxSlippageBps: z.number().int().nonnegative().optional(), allowPerps: z.boolean().optional() })
    .optional(),
  stream: z.boolean().optional(),
});

export type CopilotRunRequest = z.infer<typeof CopilotRunRequestSchema>;

export const TxIntentSchema = z.object({
  id: z.string(),
  to: z.string(),
  data: z.string().optional(),
  value: z.string().optional(),
  chain: z.string().optional(),
  description: z.string().optional(),
});

export type TxIntent = z.infer<typeof TxIntentSchema>;

export const ExecutionPlanSchema = z.object({
  id: z.string(),
  intents: z.array(TxIntentSchema),
  metadata: z.record(z.any()).optional(),
});

export type ExecutionPlan = z.infer<typeof ExecutionPlanSchema>;

export const CopilotRunResponseSchema = z.object({
  id: z.string(),
  output: z.string(),
  analysis: z.record(z.any()).optional(),
  plan: ExecutionPlanSchema.optional(),
});

export type CopilotRunResponse = z.infer<typeof CopilotRunResponseSchema>;

export const RiskProfileSchema = z.object({ score: z.number().min(0), factors: z.array(z.string()) });
export type RiskProfile = z.infer<typeof RiskProfileSchema>;

export const PolicyResultSchema = z.object({
  allowed: z.boolean(),
  violations: z.array(z.string()).optional(),
  riskProfile: RiskProfileSchema.optional(),
});
export type PolicyResult = z.infer<typeof PolicyResultSchema>;

export const PolicyEvaluateRequestSchema = z.object({
  plan: ExecutionPlanSchema,
  context: z.record(z.any()).optional(),
});
export type PolicyEvaluateRequest = z.infer<typeof PolicyEvaluateRequestSchema>;
