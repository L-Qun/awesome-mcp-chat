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
