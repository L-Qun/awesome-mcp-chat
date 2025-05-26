"use client";

import { PropsWithChildren } from "react";
import { ClerkProvider } from "@clerk/nextjs";
import { TanstackQueryProvider } from "./tanstack-query.provider";
import { JotaiStoreProvider } from "./jotai.providers";
import { Toast } from "@/components/toast";

export function WebAppProvider({ children }: PropsWithChildren) {
  return (
    <ClerkProvider>
      <TanstackQueryProvider>
        <JotaiStoreProvider>
          {children}
          <Toast />
        </JotaiStoreProvider>
      </TanstackQueryProvider>
    </ClerkProvider>
  );
}
