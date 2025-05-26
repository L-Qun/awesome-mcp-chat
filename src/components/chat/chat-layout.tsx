"use client";

import React from "react";

import { ChatSidebar } from "./chat-sidebar";
import { UserMenu } from "../user-menu";

interface ChatLayoutProps {
  children: React.ReactNode;
}

export function ChatLayout({ children }: ChatLayoutProps) {
  return (
    <div className="flex h-screen">
      <ChatSidebar className="h-full" />
      <main className="flex-1 overflow-hidden relative">
        <div className="absolute top-4 right-4 z-10">
          <UserMenu />
        </div>

        {children}
      </main>
    </div>
  );
}
