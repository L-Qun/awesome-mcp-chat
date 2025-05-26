import { desc, eq, asc } from "drizzle-orm";
import { db } from ".";
import { chats, DBMessage, messages } from "./schema";
import { generateTitle } from "@/lib/llm/generate-title";
import { LanguageModelV1 } from "ai";

export const getChats = async (userId: string) => {
  return await db.query.chats.findMany({
    where: eq(chats.userId, userId),
    orderBy: [desc(chats.updatedAt)],
  });
};

export const getMessagesByChatId = async (chatId: string, userId: string) => {
  const chat = await db.query.chats.findFirst({
    where: eq(chats.id, chatId),
  });

  if (!chat || chat.userId !== userId) {
    return null;
  }

  return await db.query.messages.findMany({
    where: eq(messages.chatId, chatId),
    orderBy: [asc(messages.createdAt)],
  });
};

export const deleteChat = async (chatId: string, userId: string) => {
  const chat = await db.query.chats.findFirst({
    where: eq(chats.id, chatId) && eq(chats.userId, userId),
  });

  if (!chat) {
    return { success: false, message: "Chat not found or unauthorized" };
  }

  await Promise.all([
    db.delete(messages).where(eq(messages.chatId, chatId)),
    db.delete(chats).where(eq(chats.id, chatId)),
  ]);

  return { success: true };
};

export const createChat = async (
  userId: string,
  messages: any[],
  id: string,
  model: LanguageModelV1
) => {
  const existingChat = await db.query.chats.findFirst({
    where: eq(chats.id, id),
  });

  if (existingChat) {
    return;
  }

  const title = await generateTitle(messages, model);

  await db.insert(chats).values({
    id,
    userId,
    title,
    createdAt: new Date(),
    updatedAt: new Date(),
  });
};

export const createMessage = async (newMessages: DBMessage[]) => {
  if (newMessages.length === 0) {
    return;
  }

  await db.insert(messages).values(newMessages);
};
