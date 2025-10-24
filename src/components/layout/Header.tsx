import React from "react";
import { Menu, Sun, Moon } from "lucide-react";
import WalletConnectButton from "../../features/wallet/WalletConnectButton";

import { useUI } from "../../store/ui.store";
import type { ThemeMode, Locale } from "../../store/ui.store";

import { useTranslation } from "react-i18next";

type Props = { onOpenSidebar: () => void };

export default function Header({ onOpenSidebar }: Props) {
  const { t } = useTranslation();
  const { theme, setTheme, locale, setLocale } = useUI();

  const toggleTheme = () => {
    const order: ThemeMode[] = ["system", "light", "dark"];
    const next = order[(order.indexOf(theme) + 1) % order.length];
    setTheme(next);
  };

  const toggleLocale = () => {
    const next: Locale = locale === "en" ? "fa" : "en";
    setLocale(next);
  };

  const isDark =
    theme === "dark" ||
    (theme === "system" &&
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches);

  return (
    <header
      className="
        sticky top-0 z-40 h-16
        flex items-center justify-between
        px-4 sm:px-6 rounded-2xl
        border border-slate-200 dark:border-slate-700/60
        bg-white/70 dark:bg-slate-900/60 backdrop-blur-md backdrop-saturate-150
        shadow-[inset_0_1px_0_rgba(255,255,255,0.4),0_8px_24px_-16px_rgba(0,0,0,0.5)]
      "
    >
      {/* Left */}
      <div className="flex items-center gap-2">
        <button
          onClick={onOpenSidebar}
          aria-label={t("actions.openSidebar")}
          className="
            lg:hidden h-9 w-9 inline-flex items-center justify-center
            rounded-xl border border-slate-200 dark:border-slate-700/60
            hover:bg-black/5 dark:hover:bg-white/10 transition-colors
          "
        >
          <Menu
            className="text-slate-700 dark:text-slate-200"
            size={18}
            strokeWidth={1.75}
          />
        </button>

        <span className="text-[11px] sm:text-xs font-medium tracking-wide text-slate-600 dark:text-slate-300">
          {t("dashboard.title")}
        </span>
      </div>

      {/* Right */}
      <div className="relative flex items-center gap-2 sm:gap-3">
        {/* Locale toggle */}
        <button
          onClick={toggleLocale}
          aria-label="Toggle language"
          className="h-9 px-2 min-w-9 inline-flex items-center justify-center rounded-xl
                     border border-slate-200 dark:border-slate-700/60
                     hover:bg-black/5 dark:hover:bg-white/10 transition-colors text-xs
                     text-slate-700 dark:text-slate-200"
        >
          {locale.toUpperCase()}
        </button>

        {/* Theme toggle */}
        <button
          onClick={toggleTheme}
          aria-label={t("actions.toggleTheme")}
          title={`Theme: ${theme}`}
          className="h-9 w-9 inline-flex items-center justify-center
                     rounded-xl border border-slate-200 dark:border-slate-700/60
                     hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
        >
          {isDark ? (
            <Sun
              className="text-slate-700 dark:text-slate-200"
              size={16}
              strokeWidth={1.75}
            />
          ) : (
            <Moon
              className="text-slate-700 dark:text-slate-200"
              size={16}
              strokeWidth={1.75}
            />
          )}
        </button>

        <WalletConnectButton />
      </div>
    </header>
  );
}
