import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { useUI } from "../../store/ui.store";
import { useTranslation } from "react-i18next";

function ThemeEffect() {
  const { theme, locale } = useUI();
  const { i18n } = useTranslation();

  useEffect(() => {
    i18n.changeLanguage(locale);
  }, [locale, i18n]);

  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;

    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    const dark = theme === "dark" || (theme === "system" && prefersDark);

    // ⚠️ پاک‌سازی همهٔ ریشه‌ها
    html.classList.remove("dark", "light");
    body.classList.remove("dark", "light");

    // فقط روی <html> ست کن
    html.classList.add(dark ? "dark" : "light");

    html.setAttribute("lang", locale);
    html.setAttribute("dir", locale === "fa" ? "rtl" : "ltr");
  }, [theme, locale]);

  return null;
}

export default function AppShell() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-bg text-gray-100 lg:grid lg:grid-cols-[240px_1fr]">
      <ThemeEffect />
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
