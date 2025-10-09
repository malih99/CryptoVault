import { create } from "zustand";
export const usePortfolio = create<{
  baseCurrency: "USD" | "EUR";
  setBase: (c: any) => void;
}>((set) => ({
  baseCurrency: "USD",
  setBase: (c) => set({ baseCurrency: c }),
}));
