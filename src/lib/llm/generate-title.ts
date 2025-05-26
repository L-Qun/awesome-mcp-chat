import { generateObject, LanguageModelV1 } from "ai";
import { z } from "zod";

export async function generateTitle(
  inputMessages: any[],
  model: LanguageModelV1
) {
  const { object } = await generateObject({
    model,
    schema: z.object({
      title: z.string().min(1).max(100),
    }),
    system: `You specialize in crafting concise and descriptive titles for conversations.
Your goal is to summarize the chat's essence in 30 characters or less.
Ensure each title is distinct and captures the core topic, avoiding generic phrases.`,
    messages: [
      ...inputMessages,
      {
        role: "user",
        content: "Generate a title for the conversation.",
      },
    ],
  });

  return object.title;
}
