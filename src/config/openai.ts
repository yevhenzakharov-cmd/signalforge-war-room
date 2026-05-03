import OpenAI from "openai";
import { env } from "./env.js";

export function createOpenAIClient(): OpenAI {
  if (!env.OPENAI_API_KEY) {
    throw new Error(
      "OPENAI_API_KEY is missing. Add it to .env before running AI workflows."
    );
  }

  return new OpenAI({
    apiKey: env.OPENAI_API_KEY
  });
}
