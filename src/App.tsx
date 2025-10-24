import React, { useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import AppProviders from "./providers/AppProviders";
import { router } from "./routes/index";
import { useUI } from "./store/ui.store";
import "./i18n";
import { useTranslation } from "react-i18next";

export default function App() {
  const { theme, locale } = useUI();
  const { i18n } = useTranslation();

  // sync i18n language
  useEffect(() => {
    i18n.changeLanguage(locale);
  }, [locale, i18n]);

  useEffect(() => {
    const html = document.documentElement;
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    const resolvedDark = theme === "system" ? prefersDark : theme === "dark";

    html.classList.toggle("dark", resolvedDark);
    html.classList.toggle("light", !resolvedDark);
    html.setAttribute("lang", locale);
    html.setAttribute("dir", locale === "fa" ? "rtl" : "ltr");
  }, [theme, locale]);

  return (
    <AppProviders>
      <RouterProvider router={router} />
    </AppProviders>
  );
}
