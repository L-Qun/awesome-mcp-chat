"use client";

import React, { useState, useEffect } from "react";
import { useAtom } from "jotai";
import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";

import { apiKeyAtom } from "@/atoms/api-key";
import { PRODUCTS } from "@/constants/model-list";

interface ApiKeyConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ApiKeyConfigModal({ isOpen, onClose }: ApiKeyConfigModalProps) {
  const [apiKeysFromAtom, setApiKeysToAtom] = useAtom(apiKeyAtom);
  const [localApiKeys, setLocalApiKeys] = useState<Record<string, string>>({});

  useEffect(() => {
    if (isOpen) {
      setLocalApiKeys(apiKeysFromAtom);
    }
  }, [isOpen, apiKeysFromAtom]);

  const handleInputChange = (modelId: string, value: string) => {
    setLocalApiKeys((prevKeys) => ({
      ...prevKeys,
      [modelId]: value,
    }));
  };

  const handleSave = () => {
    setApiKeysToAtom(localApiKeys);
    onClose();
  };

  const handleCancel = () => {
    onClose();
  };

  if (!isOpen) return null;

  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 z-[1000]" />
        <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-[#202123] rounded-lg shadow-xl p-6 w-full max-w-md z-[1000]">
          <div className="flex justify-between items-center mb-4">
            <Dialog.Title className="text-xl font-semibold text-gray-800 dark:text-white">
              Configure API Keys
            </Dialog.Title>
            <Dialog.Close className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
              <X className="w-4 h-4" />
            </Dialog.Close>
          </div>

          <div className="space-y-4">
            {PRODUCTS.map((product) => (
              <div key={product.id}>
                <label
                  htmlFor={`apiKey-${product.id}`}
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  {product.name} API Key
                </label>
                <input
                  type="password"
                  id={`apiKey-${product.id}`}
                  value={localApiKeys[product.id] || ""}
                  onChange={(e) =>
                    handleInputChange(product.id, e.target.value)
                  }
                  placeholder={`Enter your ${product.name} API Key`}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
            ))}
          </div>

          <div className="mt-6 flex justify-end space-x-3">
            <button
              type="button"
              onClick={handleCancel}
              className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-600 border border-gray-300 dark:border-gray-500 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="px-4 py-2 text-sm font-medium text-white bg-[#5436DA] rounded-md hover:bg-[#4a2ec7] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#5436DA]"
            >
              Save
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
