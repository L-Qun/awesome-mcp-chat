import { NextResponse } from "next/server";

import { getMessagesByChatId, deleteChat } from "@/lib/database/chat";
import { USER_ID_HEADER } from "@/constants/header";

interface Params {
  params: Promise<{
    id: string;
  }>;
}

export async function GET(request: Request, { params }: Params) {
  try {
    const userId = request.headers.get(USER_ID_HEADER);
    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    const { id: chatId } = await params;
    const messages = await getMessagesByChatId(chatId, userId);
    if (!messages) {
      return NextResponse.json({ error: "Chat not found" }, { status: 404 });
    }

    return NextResponse.json({ messages });
  } catch (error) {
    console.error("Failed to fetch chat:", error);
    return NextResponse.json(
      { error: "Failed to fetch chat" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request, { params }: Params) {
  try {
    const userId = request.headers.get(USER_ID_HEADER);
    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    const { id: chatId } = await params;
    const deleted = await deleteChat(chatId, userId);

    return NextResponse.json({ deleted });
  } catch (error) {
    console.error("Failed to delete chat:", error);
    return NextResponse.json(
      { error: "Failed to delete chat" },
      { status: 500 }
    );
  }
}
