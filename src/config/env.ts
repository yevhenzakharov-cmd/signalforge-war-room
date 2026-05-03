import "dotenv/config";
import { z } from "zod";

const envSchema = z.object({
  OPENAI_API_KEY: z.string().optional(),
  SIGNALFORGE_ENV: z
    .enum(["development", "test", "production"])
    .default("development"),
  LANGFUSE_SECRET_KEY: z.string().optional(),
  LANGFUSE_PUBLIC_KEY: z.string().optional(),
  LANGFUSE_BASE_URL: z.string().optional()
});

export type SignalForgeEnv = z.infer<typeof envSchema>;

export const env: SignalForgeEnv = envSchema.parse(process.env);

export function hasOpenAIKey(): boolean {
  return Boolean(env.OPENAI_API_KEY && env.OPENAI_API_KEY.trim().length > 0);
}
