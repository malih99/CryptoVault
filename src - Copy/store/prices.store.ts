import { create } from "zustand";
type Price = { price: number; change24h: number; ts: number };
export const usePrices = create<{
  map: Record<string, Price>;
  set: (k: string, v: Price) => void;
}>((set) => ({
  map: {},
  set: (k, v) => set((s) => ({ map: { ...s.map, [k]: v } })),
}));
