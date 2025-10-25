import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { useUI } from "../../store/ui.store";
import { useTranslation } from "react-i18next";

function ThemeEffect() {
  const { theme, locale } = useUI();
  const { i18n } = useTranslation();

  // sync i18n
  useEffect(() => {
    i18n.changeLanguage(locale);
  }, [locale, i18n]);

  // apply theme classes on <html>
  useEffect(() => {
    const html = document.documentElement;
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    const dark = theme === "dark" || (theme === "system" && prefersDark);
    html.classList.toggle("dark", dark);
    html.classList.toggle("light", !dark);
    html.setAttribute("lang", locale);
    html.setAttribute("dir", locale === "fa" ? "rtl" : "ltr");
  }, [theme, locale]);

  return null;
}

export default function AppShell() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div
      className="
        min-h-screen
        bg-white dark:bg-slate-950
        text-slate-900 dark:text-slate-100
        lg:grid lg:grid-cols-[240px_1fr]
        [color-scheme:light] dark:[color-scheme:dark]  /* برای اسکرول‌بار/کامپوننت‌های بومی */
      "
    >
      <ThemeEffect /> {/* ✅ تم و زبان اینجا اعمال می‌شود */}
      <Sidebar open={mobileOpen} setOpen={setMobileOpen} />
      <div className="flex min-h-screen flex-col">
        <Header onOpenSidebar={() => setMobileOpen(true)} />
        <main className="mt-6 px-4 sm:px-6 pb-16">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
