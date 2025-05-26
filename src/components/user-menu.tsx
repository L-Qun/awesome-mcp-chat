"use client";

import React, { useState } from "react";
import * as Dropdown from "@radix-ui/react-dropdown-menu";
import * as Avatar from "@radix-ui/react-avatar";
import { motion, AnimatePresence } from "framer-motion";
import { UserCircle2, Server, LogOut, KeyRound, X } from "lucide-react";
import { SignIn, SignUp, useUser, useClerk } from "@clerk/nextjs";

import { ServerConfigModal } from "@/components/modal/server-config-modal";
import { ApiKeyConfigModal } from "@/components/modal/api-key-config-modal";

export function UserMenu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServerConfigOpen, setIsServerConfigOpen] = useState(false);
  const [isApiKeyConfigOpen, setIsApiKeyConfigOpen] = useState(false);
  const [authView, setAuthView] = useState<"signIn" | "signUp" | null>(null);
  const { user } = useUser();
  const { signOut } = useClerk();

  if (!user) {
    return (
      <div className="relative flex gap-2">
        {authView === "signIn" && (
          <div
            className="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                setAuthView(null);
              }
            }}
          >
            <div className="relative bg-white dark:bg-[#202123] rounded-lg">
              <button
                onClick={() => setAuthView(null)}
                className="absolute right-4 top-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <X size={24} />
              </button>
              <SignIn afterSignInUrl="/" />
            </div>
          </div>
        )}
        {authView === "signUp" && (
          <div
            className="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                setAuthView(null);
              }
            }}
          >
            <div className="relative bg-white dark:bg-[#202123] rounded-lg">
              <button
                onClick={() => setAuthView(null)}
                className="absolute right-4 top-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <X size={24} />
              </button>
              <SignUp afterSignUpUrl="/" />
            </div>
          </div>
        )}
        <button
          onClick={() => setAuthView("signIn")}
          className="px-4 py-2 text-sm font-medium text-white bg-[#5436DA] rounded-md hover:bg-[#4a2ec7] transition-colors"
        >
          Sign In
        </button>
        <button
          onClick={() => setAuthView("signUp")}
          className="px-4 py-2 text-sm font-medium text-[#5436DA] border border-[#5436DA] rounded-md hover:bg-[#5436DA] hover:text-white transition-colors"
        >
          Sign Up
        </button>
      </div>
    );
  }

  return (
    <div className="relative">
      <Dropdown.Root open={isMenuOpen} onOpenChange={setIsMenuOpen}>
        <Dropdown.Trigger asChild>
          <motion.button
            className="flex items-center justify-center w-8 h-8 rounded-full bg-[#5436DA] text-white hover:opacity-90 transition-opacity"
            aria-label="User menu"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <Avatar.Root className="flex items-center justify-center w-8 h-8 rounded-full overflow-hidden bg-[#5436DA]">
              <Avatar.Image
                className="w-full h-full object-cover"
                src={user.imageUrl}
                alt={user.fullName || "User avatar"}
              />
              <Avatar.Fallback
                className="w-full h-full flex items-center justify-center bg-[#5436DA] text-white"
                delayMs={600}
              >
                {user.fullName?.[0] || "U"}
              </Avatar.Fallback>
            </Avatar.Root>
          </motion.button>
        </Dropdown.Trigger>

        <AnimatePresence>
          {isMenuOpen && (
            <Dropdown.Portal forceMount>
              <Dropdown.Content
                className="min-w-[220px] bg-white dark:bg-[#202123] rounded-md shadow-lg py-1 mt-1 border border-[#e5e5e5] dark:border-[#4d4d4f] z-50"
                sideOffset={5}
                align="end"
                asChild
              >
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                >
                  <Dropdown.Item className="flex items-center px-4 py-2 text-sm hover:bg-[#f7f7f8] dark:hover:bg-[#343541] cursor-pointer">
                    <UserCircle2 size={18} className="mr-2" />
                    <span>{user.fullName}</span>
                  </Dropdown.Item>

                  <Dropdown.Item
                    className="flex items-center px-4 py-2 text-sm hover:bg-[#f7f7f8] dark:hover:bg-[#343541] cursor-pointer"
                    asChild
                  >
                    <a
                      href="https://github.com/L-Qun/awesome-mcp-chat"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center w-full"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mr-2"
                        width="16"
                        height="16"
                      >
                        <path d="M12 2C6.477 2 2 6.484 2 12.021c0 4.428 2.865 8.184 6.839 9.504.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.004.07 1.532 1.032 1.532 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.339-2.221-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.987 1.029-2.687-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.025A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.295 2.748-1.025 2.748-1.025.546 1.378.202 2.397.1 2.65.64.7 1.028 1.594 1.028 2.687 0 3.847-2.337 4.695-4.566 4.944.359.309.678.919.678 1.852 0 1.336-.012 2.417-.012 2.747 0 .267.18.577.688.48C19.138 20.2 22 16.447 22 12.021 22 6.484 17.523 2 12 2z" />
                      </svg>
                      <span>GitHub</span>
                    </a>
                  </Dropdown.Item>

                  <Dropdown.Item
                    className="flex items-center px-4 py-2 text-sm hover:bg-[#f7f7f8] dark:hover:bg-[#343541] cursor-pointer"
                    onSelect={() => {
                      setIsServerConfigOpen(true);
                      setIsMenuOpen(false);
                    }}
                  >
                    <Server size={16} className="mr-2" />
                    <span>Configure MCP Servers</span>
                  </Dropdown.Item>

                  <Dropdown.Item
                    className="flex items-center px-4 py-2 text-sm hover:bg-[#f7f7f8] dark:hover:bg-[#343541] cursor-pointer"
                    onSelect={() => {
                      setIsApiKeyConfigOpen(true);
                      setIsMenuOpen(false);
                    }}
                  >
                    <KeyRound size={16} className="mr-2" />
                    <span>API Key Configuration</span>
                  </Dropdown.Item>

                  <Dropdown.Separator className="h-px bg-[#e5e5e5] dark:bg-[#4d4d4f] my-1" />

                  <Dropdown.Item
                    className="flex items-center px-4 py-2 text-sm hover:bg-[#f7f7f8] dark:hover:bg-[#343541] cursor-pointer"
                    onClick={() => signOut()}
                  >
                    <LogOut size={16} className="mr-2" />
                    <span>Sign Out</span>
                  </Dropdown.Item>
                </motion.div>
              </Dropdown.Content>
            </Dropdown.Portal>
          )}
        </AnimatePresence>
      </Dropdown.Root>

      <ServerConfigModal
        isOpen={isServerConfigOpen}
        onClose={() => setIsServerConfigOpen(false)}
      />

      <ApiKeyConfigModal
        isOpen={isApiKeyConfigOpen}
        onClose={() => setIsApiKeyConfigOpen(false)}
      />
    </div>
  );
}
