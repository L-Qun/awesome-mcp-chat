import {
  appendResponseMessages,
  streamText,
  experimental_createMCPClient as createMCPClient,
} from "ai";
import { Experimental_StdioMCPTransport as StdioMCPTransport } from "ai/mcp-stdio";
import { NextResponse } from "next/server";

import { createChat, createMessage } from "@/lib/database/chat";
import { getModel, NON_REASONING_MODELS } from "@/lib/llm/models";
import { API_KEY_HEADER, USER_ID_HEADER } from "@/constants/header";

export async function POST(req: Request) {
  const apiKey = req.headers.get(API_KEY_HEADER);
  if (!apiKey) {
    return NextResponse.json({ error: "API key is required" }, { status: 400 });
  }

  const userId = req.headers.get(USER_ID_HEADER);
  if (!userId) {
    return NextResponse.json({ error: "User ID is required" }, { status: 400 });
  }

  const { chatId, messages, modelId, mcpServers } = await req.json();

  const mcpTools = (
    await Promise.all(
      mcpServers.map(async (server: any) => {
        const { command, args, env, url } = server;
        const client = await createMCPClient({
          transport: url
            ? {
                type: "sse",
                url,
              }
            : new StdioMCPTransport({
                command,
                args,
                env,
              }),
        });
        const mcpTools = await client.tools();
        return mcpTools;
      })
    )
  ).reduce((prev, curr) => {
    return {
      ...prev,
      ...curr,
    };
  }, {});

  const modelSupportsReasoning = !NON_REASONING_MODELS.includes(modelId);

  const model = getModel(modelId, apiKey).languageModel(modelId);

  const result = streamText({
    model,
    system: `As your advanced assistant, I have a suite of powerful tools at my disposal to address your queries effectively.

I will select the most appropriate tool(s) for each task. If a suitable tool isn't currently available for your request, I'll let you know. You can always expand my capabilities by adding new tools via the server icon in the sidebar's bottom left corner.

I can employ multiple tools sequentially or in combination to construct a comprehensive answer. Expect my response after I've processed the information from the tools.

## Response Guidelines:
- Your answers will be in Markdown.
- My responses will be directly informed by the output of the tools I use.
- If the tools cannot provide a definitive answer, I will state that.
`,
    messages,
    tools: mcpTools,
    maxSteps: 20,
    providerOptions: modelSupportsReasoning
      ? {
          anthropic: {
            thinking: { type: "enabled", budgetTokens: 12000 },
          },
          google: {
            thinkingConfig: {
              thinkingBudget: 2048,
            },
          },
        }
      : undefined,
    onFinish: async ({ response }) => {
      const allMessages = appendResponseMessages({
        messages,
        responseMessages: response.messages,
      });
      await createChat(userId, allMessages, chatId, model);
      const newMessages = allMessages
        .slice(allMessages.length - 2)
        .map((message) => ({
          content: message.content,
          role: message.role,
          chatId,
          createdAt: new Date(),
          parts: message.parts,
          id: message.id,
        }));
      await createMessage(newMessages);
    },
  });

  return result.toDataStreamResponse({
    sendReasoning: modelSupportsReasoning,
    getErrorMessage: (error) => {
      console.error(error);
      return "An error occurred.";
    },
  });
}
