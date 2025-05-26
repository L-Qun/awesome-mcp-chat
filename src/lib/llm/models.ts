import { customProvider } from "ai";
import { createAnthropic } from "@ai-sdk/anthropic";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { createOpenAI } from "@ai-sdk/openai";
import { createDeepSeek } from "@ai-sdk/deepseek";

import { ModelId } from "@/constants/model-list";

export const NON_REASONING_MODELS = [
  ModelId.GPT_4_1,
  ModelId.GEMINI_2_0_FLASH,
  ModelId.CLAUDE_3_5_SONNET,
  ModelId.DEEPSEEK_CHAT,
];

// Provider-specific model identifiers for clarity and maintainability
const ANTHROPIC_CLAUDE_3_7_SONNET_ID = "claude-3-7-sonnet-20250219";
const ANTHROPIC_CLAUDE_3_5_SONNET_LATEST_ID = "claude-3-5-sonnet-latest";
const GOOGLE_GEMINI_2_5_PRO_PREVIEW_ID = "gemini-2.5-pro-preview-05-06";

const modelProviders = {
  [ModelId.GPT_4_1]: (apiKey: string) =>
    createOpenAI({ apiKey })(ModelId.GPT_4_1),
  [ModelId.O3]: (apiKey: string) =>
    createOpenAI({ apiKey })(ModelId.O3, { structuredOutputs: false }),
  [ModelId.O3_MINI]: (apiKey: string) =>
    createOpenAI({ apiKey })(ModelId.O3_MINI, { structuredOutputs: false }),
  [ModelId.O4_MINI]: (apiKey: string) =>
    createOpenAI({ apiKey })(ModelId.O4_MINI, { structuredOutputs: false }),
  [ModelId.CLAUDE_3_7_SONNET]: (apiKey: string) =>
    createAnthropic({ apiKey })(ANTHROPIC_CLAUDE_3_7_SONNET_ID),
  [ModelId.CLAUDE_3_5_SONNET]: (apiKey: string) =>
    createAnthropic({ apiKey })(ANTHROPIC_CLAUDE_3_5_SONNET_LATEST_ID),
  [ModelId.GEMINI_2_5_PRO]: (apiKey: string) =>
    createGoogleGenerativeAI({ apiKey })(GOOGLE_GEMINI_2_5_PRO_PREVIEW_ID),
  [ModelId.GEMINI_2_0_FLASH]: (apiKey: string) =>
    createGoogleGenerativeAI({ apiKey })(ModelId.GEMINI_2_0_FLASH),
  [ModelId.DEEPSEEK_CHAT]: (apiKey: string) =>
    createDeepSeek({ apiKey })(ModelId.DEEPSEEK_CHAT),
  [ModelId.DEEPSEEK_REASONER]: (apiKey: string) =>
    createDeepSeek({ apiKey })(ModelId.DEEPSEEK_REASONER),
};

export const getModel = (modelId: string, apiKey: string) => {
  const modelCreator = modelProviders[modelId as keyof typeof modelProviders];

  if (!modelCreator) {
    throw new Error(`Unsupported model: ${modelId}`);
  }

  const model = modelCreator(apiKey);

  return customProvider({
    languageModels: {
      [modelId]: model,
    },
  });
};
