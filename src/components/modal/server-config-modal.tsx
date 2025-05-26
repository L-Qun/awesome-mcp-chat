"use client";

import React, { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Trash2,
  Terminal,
  Globe,
  AlertTriangle,
  Loader2,
} from "lucide-react";

import { ServerConfig } from "@/atoms/mcp";
import { useMcpServer } from "@/hooks/use-mcp-server";

interface ServerConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ServerConfigModal({ isOpen, onClose }: ServerConfigModalProps) {
  const [isAddingServer, setIsAddingServer] = useState(false);
  const {
    mcpServers,
    rawConfig,
    addServer,
    deleteServer,
    toggleServer,
    updateRawConfig,
    isAddingServer: isAdding,
  } = useMcpServer();

  const handleAddServer = async () => {
    if (!isAddingServer) {
      setIsAddingServer(true);
    } else {
      await addServer();
      setIsAddingServer(false);
    }
  };

  const getToolsList = (config: ServerConfig) => {
    if (!config.tools || config.tools.length === 0) {
      return <span className="mt-0.5">No tools available</span>;
    }
    return config.tools.map((tool) => (
      <span
        key={tool.name}
        className="inline-block bg-[#f5f5f5] dark:bg-[#3a3a3c] rounded px-2 py-0.5 text-xs mr-2 mb-1"
      >
        {tool.name}
      </span>
    ));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog.Root open={isOpen} onOpenChange={onClose}>
          <Dialog.Portal forceMount>
            <Dialog.Overlay asChild>
              <motion.div
                className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[1000]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              />
            </Dialog.Overlay>

            <Dialog.Content asChild>
              <motion.div
                className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-[#202123] rounded-lg shadow-xl w-full max-w-lg overflow-hidden max-h-[90vh] flex flex-col z-[1000]"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{
                  duration: 0.3,
                  type: "spring",
                  stiffness: 400,
                  damping: 30,
                }}
              >
                <div className="p-6 border-b border-[#e5e5e5] dark:border-[#4d4d4f]">
                  <div className="flex items-center mb-2">
                    <Dialog.Title className="text-xl font-semibold">
                      MCP Server Configuration
                    </Dialog.Title>
                  </div>

                  <p className="text-sm text-[#6e6e80] dark:text-[#8e8ea0]">
                    Connect to Model Context Protocol servers to access
                    additional AI tools.
                  </p>
                </div>

                <div className="flex-1 overflow-y-auto p-6">
                  {!isAddingServer ? (
                    <>
                      <div className="mb-6">
                        <div className="flex justify-between items-center mb-2">
                          <h3 className="text-sm font-medium">
                            Available Servers
                          </h3>
                          <p className="text-xs text-[#6e6e80] dark:text-[#8e8ea0]">
                            Select multiple servers to combine their tools
                          </p>
                        </div>

                        <div className="space-y-4 mb-6">
                          {mcpServers.length === 0 ? (
                            <p className="text-center py-4 text-sm text-[#6e6e80] dark:text-[#8e8ea0]">
                              No servers configured
                            </p>
                          ) : (
                            mcpServers.map((config) => (
                              <div
                                key={config.id}
                                className="border border-[#e5e5e5] dark:border-[#4d4d4f] rounded-lg overflow-hidden"
                              >
                                <div className="flex justify-between items-center p-4">
                                  <div className="flex items-center">
                                    {config.type === "sse" ? (
                                      <Globe className="w-4 h-4 mr-2 text-[#3b82f6]" />
                                    ) : (
                                      <Terminal className="w-4 h-4 mr-2 text-[#3b82f6]" />
                                    )}
                                    <span className="font-medium text-lg">
                                      {config.name}
                                    </span>
                                  </div>
                                  <div className="flex items-center space-x-3">
                                    <span className="text-xs px-2 py-1 bg-[#eff6ff] dark:bg-[#1e3a8a] text-[#3b82f6] dark:text-[#93c5fd] rounded-md uppercase">
                                      {config.type}
                                    </span>
                                    <div className="flex items-center">
                                      <div
                                        className={`w-2 h-2 rounded-full mr-1.5 ${
                                          config.connected
                                            ? "bg-green-500"
                                            : "bg-gray-400"
                                        }`}
                                      ></div>
                                      <Switch
                                        checked={config.connected}
                                        onChange={() => toggleServer(config.id)}
                                      />
                                    </div>
                                    <div className="flex">
                                      <button
                                        onClick={() => deleteServer(config.id)}
                                        className="ml-2 text-[#6e6e80] dark:text-[#8e8ea0] hover:text-red-500"
                                      >
                                        <Trash2 className="w-4 h-4" />
                                      </button>
                                    </div>
                                  </div>
                                </div>
                                <div className="px-4 pb-3 text-sm">
                                  <div className="flex items-center gap-2 text-[#6e6e80] dark:text-[#8e8ea0] mb-2">
                                    {config.type === "sse" ? (
                                      <>
                                        <span className="flex-shrink-0">
                                          Server Link:
                                        </span>
                                        <span className="break-all">
                                          {config.url}
                                        </span>
                                      </>
                                    ) : (
                                      <>
                                        <span className="flex-shrink-0">
                                          Command:
                                        </span>
                                        <span className="break-all inline-block bg-[#f5f5f5] dark:bg-[#3a3a3c] rounded px-2 py-0.5 text-xs mr-2 mb-1">
                                          {config.command} {config.args || ""}
                                        </span>
                                      </>
                                    )}
                                  </div>
                                  <div className="flex items-center gap-2 text-[#6e6e80] dark:text-[#8e8ea0]">
                                    <span className="flex-shrink-0">
                                      Tools:
                                    </span>
                                    <span className="break-all">
                                      {getToolsList(config)}
                                    </span>
                                  </div>
                                  {config.type === "sse" &&
                                    config.connected &&
                                    config.url?.includes("localhost") && (
                                      <div className="mt-2 flex items-center text-red-500">
                                        <AlertTriangle className="w-4 h-4 mr-1" />
                                        <span>
                                          SSE error: TypeError: terminated: Body
                                          Timeout Error
                                        </span>
                                      </div>
                                    )}
                                </div>
                              </div>
                            ))
                          )}
                        </div>

                        <div className="flex justify-end">
                          <button
                            onClick={() => setIsAddingServer(true)}
                            className="flex items-center px-4 py-2 bg-[#3b82f6] hover:bg-[#2563eb] text-white rounded-md text-sm transition-colors"
                          >
                            Add Server
                          </button>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="mb-6">
                        <h3 className="text-lg font-medium mb-4">
                          Add New MCP Servers
                        </h3>

                        <p className="text-sm text-[#6e6e80] dark:text-[#8e8ea0] mb-4">
                          Paste your JSON MCP config below and click
                          &quot;Add&quot; to add new servers. Edit the example
                          or replace it with your own configuration.
                        </p>

                        <textarea
                          className="w-full px-3 py-2 border border-[#e5e5e5] dark:border-[#4d4d4f] rounded-md focus:outline-none focus:ring-2 focus:ring-[#3b82f6] dark:bg-[#343541] dark:text-white font-mono text-sm h-[300px]"
                          value={rawConfig}
                          onChange={(e) => updateRawConfig(e.target.value)}
                        />
                      </div>

                      <div className="flex justify-end space-x-3">
                        <button
                          onClick={() => {
                            setIsAddingServer(false);
                          }}
                          className="px-4 py-2 border border-[#e5e5e5] dark:border-[#4d4d4f] rounded-md text-sm font-medium hover:bg-[#f7f7f8] dark:hover:bg-[#343541] transition-colors"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={() => handleAddServer()}
                          disabled={isAdding}
                          className={`px-4 py-2 bg-[#3b82f6] hover:bg-[#2563eb] text-white rounded-md text-sm font-medium transition-colors flex items-center ${
                            isAdding ? "opacity-70 cursor-not-allowed" : ""
                          }`}
                        >
                          {isAdding ? (
                            <>
                              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                              Adding...
                            </>
                          ) : (
                            "Add Server"
                          )}
                        </button>
                      </div>
                    </>
                  )}
                </div>

                <Dialog.Close className="absolute top-4 right-4 text-[#6e6e80] dark:text-[#8e8ea0] hover:text-gray-900 dark:hover:text-white">
                  <X className="w-5 h-5" />
                  <span className="sr-only">Close</span>
                </Dialog.Close>
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      )}
    </AnimatePresence>
  );
}

function Switch({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <button
      role="switch"
      aria-checked={checked}
      onClick={onChange}
      className={`relative inline-flex h-4 w-8 items-center rounded-full transition-colors focus:outline-none ${
        checked ? "bg-[#3b82f6]" : "bg-gray-200 dark:bg-gray-700"
      }`}
    >
      <span
        className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${
          checked ? "translate-x-4" : "translate-x-1"
        }`}
      />
    </button>
  );
}
