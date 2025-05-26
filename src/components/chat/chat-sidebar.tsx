"use client";

import React, { useState } from "react";
import * as Collapsible from "@radix-ui/react-collapsible";
import * as ScrollArea from "@radix-ui/react-scroll-area";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useUser } from "@clerk/nextjs";
import {
  Plus,
  MessageSquare,
  ChevronLeft,
  MoreHorizontal,
  Trash2,
} from "lucide-react";

import { Chat } from "@/lib/database/schema";
import { useToast } from "@/components/toast";
import { USER_ID_HEADER } from "@/constants/header";

interface ChatSidebarProps {
  className?: string;
}

export function ChatSidebar({ className = "" }: ChatSidebarProps) {
  const [isOpen, setIsOpen] = useState(true);
  const [hoveredChatId, setHoveredChatId] = useState<string | null>(null);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const pathname = usePathname();
  const { user } = useUser();
  const router = useRouter();
  const queryClient = useQueryClient();
  const toast = useToast();

  const {
    data: chats,
    isLoading,
    isSuccess,
  } = useQuery<Chat[]>({
    queryKey: ["chats", user?.id],
    queryFn: async () => {
      if (!user?.id) return null;

      const response = await fetch("/api/chats", {
        headers: {
          "x-user-id": user.id,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch chats");
      }

      return response.json();
    },
    enabled: !!user?.id,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: true,
  });

  const handleDeleteChat = async (chatId: string) => {
    try {
      const response = await fetch(`/api/chats/${chatId}`, {
        method: "DELETE",
        headers: {
          [USER_ID_HEADER]: user?.id ?? "",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete chat");
      }

      queryClient.invalidateQueries({ queryKey: ["chats", user?.id] });

      if (pathname === `/chat/${chatId}`) {
        router.push("/");
      }

      toast.show("Chat deleted", "success");
    } catch (error) {
      toast.show((error as Error).message, "error");
    }
  };

  return (
    <Collapsible.Root
      open={isOpen}
      onOpenChange={setIsOpen}
      className={`relative overflow-visible bg-[#f7f7f8] dark:bg-[#202123] ${className}`}
    >
      <div
        className={`${
          isOpen ? "w-[260px]" : "w-[72px]"
        } transition-all duration-200 h-full flex flex-col border-r border-[#e5e5e5] dark:border-[#4d4d4f] relative`}
      >
        <div className="p-3">
          <Link
            href="/"
            className="flex items-center justify-center h-10 gap-2 rounded-md border border-[#e5e5e5] dark:border-[#4d4d4f] text-sm font-medium hover:bg-[#ececf1] dark:hover:bg-[#343541] transition-colors"
          >
            {isOpen ? (
              <div className="flex items-center gap-2">
                <Plus size={16} />
                <span>New Chat</span>
              </div>
            ) : (
              <Plus size={16} />
            )}
          </Link>
        </div>

        {isOpen && (
          <ScrollArea.Root className="flex-1 overflow-hidden">
            <ScrollArea.Viewport className="w-full h-full">
              <div className="px-3 py-2">
                {isLoading || !isSuccess ? (
                  <div className="flex flex-col gap-3">
                    {[...Array(5)].map((_, index) => (
                      <div
                        key={index}
                        className="animate-pulse flex items-center gap-2 px-3 py-2 rounded-lg bg-[#ececf1] dark:bg-[#343541]"
                      >
                        <div className="w-4 h-4 rounded-full bg-[#e5e5e5] dark:bg-[#4d4d4f]" />
                        <div className="h-4 flex-1 rounded bg-[#e5e5e5] dark:bg-[#4d4d4f]" />
                      </div>
                    ))}
                  </div>
                ) : chats && chats.length > 0 ? (
                  chats.map((chat: Chat) => (
                    <div
                      key={chat.id}
                      className="mb-4 relative group"
                      onMouseEnter={() => setHoveredChatId(chat.id)}
                      onMouseLeave={() => setHoveredChatId(null)}
                    >
                      <Link
                        href={`/chat/${chat.id}`}
                        className={`block rounded-lg transition-colors ${
                          pathname === `/chat/${chat.id}`
                            ? "bg-[#ececf1] dark:bg-[#343541]"
                            : "hover:bg-[#f1f1f3] dark:hover:bg-[#2a2b32]"
                        }`}
                        onClick={() => setOpenMenuId(null)}
                      >
                        <div className="px-3 py-2">
                          <div className="flex items-center gap-2">
                            <MessageSquare className="w-4 h-4 text-[#6e6e80] dark:text-[#8e8ea0]" />
                            <span className="text-sm text-[#353740] dark:text-[#ececf1] line-clamp-1 mr-6">
                              {chat.title}
                            </span>
                          </div>
                        </div>
                      </Link>

                      {(hoveredChatId === chat.id ||
                        pathname === `/chat/${chat.id}` ||
                        openMenuId === chat.id) && (
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 z-10">
                          <DropdownMenu.Root
                            open={openMenuId === chat.id}
                            onOpenChange={(open) => {
                              if (open) {
                                setOpenMenuId(chat.id);
                              } else {
                                setOpenMenuId(null);
                              }
                            }}
                          >
                            <DropdownMenu.Trigger asChild>
                              <button
                                className="p-1 rounded-md hover:bg-[#e5e5e5] dark:hover:bg-[#444654] transition-colors"
                                onClick={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                }}
                              >
                                <MoreHorizontal
                                  size={16}
                                  className="text-[#6e6e80] dark:text-[#8e8ea0]"
                                />
                              </button>
                            </DropdownMenu.Trigger>

                            <DropdownMenu.Portal>
                              <DropdownMenu.Content
                                className="min-w-[120px] bg-white dark:bg-[#202123] rounded-lg shadow-lg border border-[#e5e5e5] dark:border-[#4d4d4f] z-50 overflow-hidden py-1"
                                sideOffset={5}
                                side="right"
                                align="start"
                                onCloseAutoFocus={(e) => e.preventDefault()}
                              >
                                <div className="p-2">
                                  <DropdownMenu.Item
                                    className="flex items-center gap-2 text-sm text-red-500 hover:bg-[#f5f5f5] dark:hover:bg-[#343541] px-3 py-2 rounded-md cursor-pointer outline-none"
                                    onClick={(e) => {
                                      e.preventDefault();
                                      e.stopPropagation();
                                      handleDeleteChat(chat.id);
                                      setOpenMenuId(null);
                                    }}
                                  >
                                    <Trash2
                                      size={14}
                                      className="text-red-500"
                                    />
                                    <span>Delete</span>
                                  </DropdownMenu.Item>
                                </div>
                              </DropdownMenu.Content>
                            </DropdownMenu.Portal>
                          </DropdownMenu.Root>
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="text-center py-4 text-sm text-[#6e6e80] dark:text-[#8e8ea0]">
                    No chats yet
                  </div>
                )}
              </div>
            </ScrollArea.Viewport>
            <ScrollArea.Scrollbar
              className="flex w-[10px] hover:w-[14px] transition-all py-2 pr-[2px] bg-transparent"
              orientation="vertical"
            >
              <ScrollArea.Thumb className="flex-1 bg-[#c2c2c2] dark:bg-[#565869] rounded-full relative" />
            </ScrollArea.Scrollbar>
          </ScrollArea.Root>
        )}

        <Collapsible.Trigger asChild>
          <button
            className="absolute top-1/2 right-[-14px] transform -translate-y-1/2 flex items-center justify-center w-7 h-7 rounded-full bg-[#e5e5e5] dark:bg-[#4d4d4f] hover:bg-[#d5d5d5] dark:hover:bg-[#5d5d5f] shadow-md z-10"
            aria-label={isOpen ? "Collapse sidebar" : "Expand sidebar"}
          >
            <ChevronLeft
              size={12}
              style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}
              className="transition-transform duration-200"
            />
          </button>
        </Collapsible.Trigger>
      </div>
    </Collapsible.Root>
  );
}
