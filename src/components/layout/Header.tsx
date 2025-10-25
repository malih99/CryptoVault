import { Menu, Sun, Moon } from "lucide-react";
import React from "react";
import WalletConnectButton from "../../features/wallet/WalletConnectButton";
import { useUI } from "../../store/ui.store";
import { useTranslation } from "react-i18next";

type Props = { onOpenSidebar: () => void };

export default function Header({ onOpenSidebar }: Props) {
  const { t } = useTranslation();
  const { theme, setTheme, locale, setLocale } = useUI();

  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");
  const toggleLocale = () => setLocale(locale === "en" ? "fa" : "en");
  const isDark = theme === "dark";

  return (
    <header className="sticky top-0 z-40 h-16 flex items-center justify-between px-4 sm:px-6 rounded-2xl border border-slate-200 dark:border-slate-700/60 bg-white/70 dark:bg-slate-900/60 backdrop-blur-md">
      <div className="flex items-center gap-2">
        <button
          onClick={onOpenSidebar}
          className="lg:hidden h-9 w-9 rounded-xl border border-slate-200 dark:border-slate-700/60 hover:bg-black/5 dark:hover:bg-white/10"
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

      <div className="flex items-center gap-2 sm:gap-3">
        <button
          onClick={toggleLocale}
          className="h-9 px-2 rounded-xl border border-slate-200 dark:border-slate-700/60 text-xs text-slate-700 dark:text-slate-200 hover:bg-black/5 dark:hover:bg-white/10"
        >
          {locale.toUpperCase()}
        </button>
        <button
          onClick={toggleTheme}
          className="h-9 w-9 rounded-xl border border-slate-200 dark:border-slate-700/60 hover:bg-black/5 dark:hover:bg-white/10"
          aria-label={t("actions.toggleTheme")}
        >
          {isDark ? (
            <Sun className="text-slate-700 dark:text-slate-200" size={16} />
          ) : (
            <Moon className="text-slate-700 dark:text-slate-200" size={16} />
          )}
        </button>
        <WalletConnectButton />
      </div>
    </header>
  );
}
