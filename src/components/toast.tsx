"use client";

import { useCallback } from "react";
import * as ToastPrimitives from "@radix-ui/react-toast";
import { X, AlertCircle } from "lucide-react";
import { atom, useAtom } from "jotai";

type ToastType = "error" | "success" | "warning" | "info";

interface ToastState {
  open: boolean;
  message: string;
  type: ToastType;
}

export const toastAtom = atom<ToastState>({
  open: false,
  message: "",
  type: "error",
});

export const useToast = () => {
  const [toast, setToast] = useAtom(toastAtom);

  const hideToast = useCallback(() => {
    setToast((prev) => ({ ...prev, open: false }));
  }, [setToast]);

  const showToast = useCallback(
    (message: string, type: ToastType = "error", duration: number = 3000) => {
      setToast({ open: true, message, type });

      if (duration > 0) {
        setTimeout(hideToast, duration);
      }
    },
    [setToast, hideToast]
  );

  return {
    ...toast,
    show: showToast,
    hide: hideToast,
  };
};

export function Toast() {
  const toast = useToast();

  return (
    <ToastPrimitives.Provider>
      <ToastPrimitives.Root
        className={`fixed bottom-4 right-4 z-50 flex items-center gap-2 rounded-lg px-4 py-3 shadow-lg transition-all duration-200 data-[state=closed]:animate-hide data-[state=open]:animate-slideIn ${
          toast.type === "error"
            ? "bg-red-500 text-white"
            : toast.type === "success"
            ? "bg-green-500 text-white"
            : toast.type === "warning"
            ? "bg-yellow-500 text-white"
            : "bg-blue-500 text-white"
        }`}
        open={toast.open}
        onOpenChange={(open) => {
          if (!open) toast.hide();
        }}
      >
        {toast.type === "error" && <AlertCircle className="h-5 w-5" />}
        <ToastPrimitives.Description className="text-sm">
          {toast.message}
        </ToastPrimitives.Description>
        <ToastPrimitives.Close
          className="ml-2 rounded-full p-1 hover:bg-black/10 focus:outline-none focus:ring-2 focus:ring-white"
          aria-label="Close"
        >
          <X className="h-4 w-4" />
        </ToastPrimitives.Close>
      </ToastPrimitives.Root>
      <ToastPrimitives.Viewport />
    </ToastPrimitives.Provider>
  );
}
