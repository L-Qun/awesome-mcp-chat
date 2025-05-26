import { atomWithStorage } from "jotai/utils";
import { PRODUCTS } from "@/constants/model-list";

export const apiKeyAtom = atomWithStorage<Record<string, string>>(
  "api-key",
  PRODUCTS.reduce((acc, product) => {
    acc[product.id] = "";
    return acc;
  }, {} as Record<string, string>)
);
