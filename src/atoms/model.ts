import { atomWithStorage } from "jotai/utils";
import { PRODUCTS } from "@/constants/model-list";

export interface ModelSelection {
  productId: string;
  productName: string;
  modelId: string;
  modelName: string;
}

export const modelSelectionAtom = atomWithStorage<ModelSelection>(
  "model-selection",
  {
    productId: PRODUCTS[0].id,
    productName: PRODUCTS[0].name,
    modelId: PRODUCTS[0].models[0].id,
    modelName: PRODUCTS[0].models[0].name,
  }
);
