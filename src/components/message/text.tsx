"use client";

import MarkdownPreview from "@uiw/react-markdown-preview";
import { Message } from "ai";
import remarkGfm from "remark-gfm";

interface TextProps {
  text: string;
  role: Message["role"];
}

export function Text({ text, role }: TextProps) {
  return (
    <MarkdownPreview
      source={text}
      style={{
        padding: 16,
        backgroundColor: role === "user" ? "#f5f5f5" : "transparent",
        borderRadius: "0.5rem",
        margin: 0,
      }}
      remarkPlugins={[remarkGfm]}
    />
  );
}
