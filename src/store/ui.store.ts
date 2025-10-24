import { create } from "zustand";
import { safeLocal } from "../lib/utils/storage";

export type ThemeMode = "light" | "dark" | "system";
export type Locale = "en" | "fa";

type UIState = {
  sidebarOpen: boolean;
  theme: ThemeMode;
  locale: Locale;
  setSidebar: (v: boolean) => void;
  setTheme: (t: ThemeMode) => void;
  setLocale: (l: Locale) => void;
};

const initialTheme: ThemeMode = safeLocal.get<ThemeMode>("ui.theme", "system");
const initialLocale: Locale = safeLocal.get<Locale>("ui.locale", "en");

export const useUI = create<UIState>((set) => ({
  sidebarOpen: true,
  theme: initialTheme,
  locale: initialLocale,
  setSidebar: (v) => set({ sidebarOpen: v }),
  setTheme: (t) => {
    safeLocal.set("ui.theme", t);
    set({ theme: t });
  },
  setLocale: (l) => {
    safeLocal.set("ui.locale", l);
    set({ locale: l });
  },
}));
