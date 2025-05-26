export interface Model {
  id: string;
  name: string;
  description: string;
}

export interface Product {
  id: string;
  name: string;
  models: Model[];
}

export const enum ModelId {
  GPT_4_1 = "gpt-4.1",
  O3 = "o3",
  O3_MINI = "o3-mini",
  O4_MINI = "o4-mini",
  CLAUDE_3_7_SONNET = "claude-3-7-sonnet",
  CLAUDE_3_5_SONNET = "claude-3-5-sonnet",
  GEMINI_2_5_PRO = "gemini-2.5-pro",
  GEMINI_2_0_FLASH = "gemini-2.0-flash",
  DEEPSEEK_CHAT = "deepseek-chat",
  DEEPSEEK_REASONER = "deepseek-reasoner",
}

export const PRODUCTS: Product[] = [
  {
    id: "openai",
    name: "OpenAI",
    models: [
      {
        id: ModelId.GPT_4_1,
        name: "GPT-4.1",
        description: "Flagship GPT model for complex tasks",
      },
      {
        id: ModelId.O3,
        name: "o3",
        description: "Our most powerful reasoning model",
      },
      {
        id: ModelId.O3_MINI,
        name: "o3-mini",
        description: "A small model alternative to o3",
      },
      {
        id: ModelId.O4_MINI,
        name: "o4-mini",
        description: "Faster, more affordable reasoning model",
      },
    ],
  },
  {
    id: "anthropic",
    name: "Anthropic",
    models: [
      {
        id: ModelId.CLAUDE_3_7_SONNET,
        name: "Claude 3.7 Sonnet",
        description:
          "Most intelligent model, with visible step-by-step reasoning",
      },
      {
        id: ModelId.CLAUDE_3_5_SONNET,
        name: "Claude 3.5 Sonnet",
        description: "Fastest, most cost-effective model",
      },
    ],
  },
  {
    id: "google",
    name: "Google",
    models: [
      {
        id: ModelId.GEMINI_2_5_PRO,
        name: "Gemini 2.5 Pro",
        description: "Reasoning, maths and code",
      },
      {
        id: ModelId.GEMINI_2_0_FLASH,
        name: "Gemini 2.0 Flash",
        description: "Fast all-round help",
      },
    ],
  },
  // {
  //   id: "deepseek",
  //   name: "DeepSeek",
  //   models: [
  //     {
  //       id: ModelId.DEEPSEEK_REASONER,
  //       name: "DeepSeek-R1",
  //       description: "DeepSeek-R1",
  //     },
  //     {
  //       id: ModelId.DEEPSEEK_CHAT,
  //       name: "DeepSeek-V3",
  //       description: "DeepSeek-V3",
  //     },
  //   ],
  // },
];
