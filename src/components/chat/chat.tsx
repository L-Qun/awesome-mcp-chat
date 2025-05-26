"use client";

import { useRouter, useParams } from "next/navigation";
import { useEffect, useRef, useCallback, useState, useMemo } from "react";
import { motion } from "framer-motion";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { useChat } from "@ai-sdk/react";
import { nanoid } from "nanoid";
import { useUser } from "@clerk/nextjs";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Box, ChevronDown, Send, Loader2 } from "lucide-react";
import { useAtom, useAtomValue, useSetAtom } from "jotai";

import { toastAtom } from "@/components/toast";
import { mcpServerConfigAtom } from "@/atoms/mcp";
import { PRODUCTS, Product, Model } from "@/constants/model-list";
import { modelSelectionAtom } from "@/atoms/model";
import { apiKeyAtom } from "@/atoms/api-key";
import { Messages } from "../message";
import { ChatLayout } from "./chat-layout";
import { API_KEY_HEADER, USER_ID_HEADER } from "@/constants/header";

export function Chat() {
  const params = useParams();
  const chatId = useRef<string>((params?.id as string) ?? nanoid());
  const router = useRouter();
  const [modelSelection, setModelSelection] = useAtom(modelSelectionAtom);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { user } = useUser();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const { mcpServers } = useAtomValue(mcpServerConfigAtom);

  const queryClient = useQueryClient();
  const setToast = useSetAtom(toastAtom);

  const apiKeys = useAtomValue(apiKeyAtom);

  const { data } = useQuery({
    queryKey: ["chats", chatId.current],
    queryFn: async ({ queryKey }) => {
      const [, chatId] = queryKey;
      const response = await fetch(`/api/chats/${chatId}`, {
        headers: {
          [USER_ID_HEADER]: user?.id ?? "",
        },
      });
      return response.json();
    },
    enabled: Boolean(params.id && user?.id),
  });

  const connectedMcpServers = useMemo(() => {
    return mcpServers.filter((server) => server.connected);
  }, [mcpServers]);

  const { messages, input, handleInputChange, handleSubmit, status } = useChat({
    id: chatId.current,
    initialMessages: data?.messages,
    headers: {
      [API_KEY_HEADER]: apiKeys[modelSelection.productId],
      [USER_ID_HEADER]: user?.id ?? "",
    },
    body: {
      modelId: modelSelection.modelId,
      chatId: chatId.current,
      mcpServers: connectedMcpServers,
    },
    onFinish: () => {
      queryClient.invalidateQueries({ queryKey: ["chats", user?.id] });
    },
    onError: (error) => {
      setToast({ open: true, message: error.message, type: "error" });
    },
  });

  useEffect(() => {
    if (messages.length > 0) {
      const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      };

      requestAnimationFrame(() => {
        scrollToBottom();
      });
    }
  }, [messages]);

  const handleSelectProduct = (product: Product) => {
    setModelSelection((prev) => ({
      ...prev,
      productId: product.id,
      productName: product.name,
    }));
  };

  const handleSelectModel = (model: Model) => {
    setModelSelection((prev) => ({
      ...prev,
      modelId: model.id,
      modelName: model.name,
    }));

    setIsDropdownOpen(false);
  };

  const handleFormSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (!params?.id) {
        router.push(`/chat/${chatId.current}`);
      }

      handleSubmit(e);
    },
    [chatId, handleSubmit, router, params]
  );

  return (
    <ChatLayout>
      <div className="flex flex-col h-full">
        <div className="border-b border-[#e5e5e5] dark:border-[#4d4d4f] px-4 py-2 flex justify-between items-center shrink-0">
          <DropdownMenu.Root
            open={isDropdownOpen}
            onOpenChange={setIsDropdownOpen}
          >
            <DropdownMenu.Trigger asChild>
              <motion.button
                className="flex items-center gap-2 text-sm px-3 py-1.5 rounded-md hover:bg-[#f7f7f8] dark:hover:bg-[#343541] transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Box size={16} className="text-[#5436DA] dark:text-[#8e8ea0]" />
                <div className="flex flex-col items-start text-left">
                  <span className="text-xs text-[#6e6e80] dark:text-[#8e8ea0]">
                    {modelSelection.productName}
                  </span>
                  <span className="font-medium text-sm">
                    {modelSelection.modelName}
                  </span>
                </div>
                <ChevronDown
                  size={12}
                  className="ml-1 text-[#6e6e80] dark:text-[#8e8ea0]"
                />
              </motion.button>
            </DropdownMenu.Trigger>

            <DropdownMenu.Portal>
              <DropdownMenu.Content
                className="w-[350px] bg-white dark:bg-[#202123] rounded-md shadow-lg border border-[#e5e5e5] dark:border-[#4d4d4f] z-50 overflow-hidden"
                sideOffset={5}
                align="start"
              >
                <div className="p-2">
                  <div className="mb-1.5 text-xs font-medium text-[#6e6e80] dark:text-[#8e8ea0] px-2 py-1">
                    Product
                  </div>
                  <div className="flex gap-1 flex-wrap mb-3">
                    {PRODUCTS.map((product) => (
                      <motion.button
                        key={product.id}
                        className={`px-2.5 py-1 rounded-md text-sm ${
                          modelSelection.productId === product.id
                            ? "bg-[#f0f0f5] dark:bg-[#343541] text-[#5436DA] dark:text-white font-medium"
                            : "text-[#4b5563] dark:text-[#c5c5d2] hover:bg-[#f7f7f8] dark:hover:bg-[#343541]"
                        }`}
                        onClick={() => handleSelectProduct(product)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {product.name}
                      </motion.button>
                    ))}
                  </div>

                  <div className="mb-1.5 text-xs font-medium text-[#6e6e80] dark:text-[#8e8ea0] px-2 py-1">
                    Model
                  </div>
                  <div className="space-y-1">
                    {PRODUCTS.find(
                      (product) => product.id === modelSelection.productId
                    )?.models.map((model) => (
                      <motion.button
                        key={model.id}
                        className={`w-full flex flex-col items-start p-2 text-sm rounded-md ${
                          modelSelection.modelId === model.id
                            ? "bg-[#f0f0f5] dark:bg-[#343541] text-[#5436DA] dark:text-white"
                            : "text-[#4b5563] dark:text-[#c5c5d2] hover:bg-[#f7f7f8] dark:hover:bg-[#343541]"
                        }`}
                        onClick={() => handleSelectModel(model)}
                        whileHover={{ x: 2 }}
                      >
                        <span className="font-medium">{model.name}</span>
                        <span className="text-xs text-[#6e6e80] dark:text-[#8e8ea0]">
                          {model.description}
                        </span>
                      </motion.button>
                    ))}
                  </div>
                </div>
              </DropdownMenu.Content>
            </DropdownMenu.Portal>
          </DropdownMenu.Root>
        </div>

        <div className="flex-1 overflow-hidden relative">
          <div className="absolute inset-0 overflow-y-auto">
            <Messages messages={messages} />
            <div ref={messagesEndRef} />
          </div>
        </div>

        <div className="border-t border-[#e5e5e5] dark:border-[#4d4d4f] p-4 shrink-0">
          <div className="max-w-3xl mx-auto relative">
            <form
              onSubmit={handleFormSubmit}
              className="mt-4 w-full mx-auto relative"
            >
              <div className="relative">
                <textarea
                  placeholder="Enter message..."
                  className={`w-full border border-[#e5e5e5] dark:border-[#4d4d4f] rounded-lg py-3 px-4 pr-16 resize-none h-[56px] focus:outline-none focus:ring-2 focus:ring-[#adadad] dark:focus:ring-[#7d7d7d] dark:bg-[#343541] dark:text-white ${
                    status === "submitted" || status === "streaming"
                      ? "opacity-70 cursor-not-allowed"
                      : ""
                  }`}
                  rows={1}
                  value={input}
                  onChange={handleInputChange}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      e.currentTarget.form?.requestSubmit();
                    }
                  }}
                  disabled={status === "submitted" || status === "streaming"}
                />

                <motion.button
                  className={`absolute right-2 top-[8px] text-[#6e6e80] hover:text-[#353740] dark:text-[#8e8ea0] dark:hover:text-[#ececf1] transition-colors bg-white dark:bg-[#343541] rounded-lg p-2 ${
                    status === "submitted" || status === "streaming"
                      ? "opacity-50 cursor-not-allowed"
                      : ""
                  }`}
                  type="submit"
                  disabled={status === "submitted" || status === "streaming"}
                  whileHover={
                    status !== "submitted" && status !== "streaming"
                      ? { scale: 1.1 }
                      : {}
                  }
                  whileTap={
                    status !== "submitted" && status !== "streaming"
                      ? { scale: 0.9 }
                      : {}
                  }
                >
                  {status === "submitted" || status === "streaming" ? (
                    <Loader2 size={16} className="animate-spin" />
                  ) : (
                    <Send size={24} className="transform rotate-45" />
                  )}
                </motion.button>
              </div>

              <p className="text-xs text-center mt-2 text-[#6e6e80] dark:text-[#8e8ea0]">
                AI assistant will try its best to provide accurate information,
                but cannot guarantee complete accuracy.
              </p>
            </form>
          </div>
        </div>
      </div>
    </ChatLayout>
  );
}
