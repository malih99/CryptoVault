import { useEffect, useState } from "react";

export type ThemePreference = "dark" | "light" | "system";

export type SettingsState = {
  theme: ThemePreference;
  language: "en" | "fa";
  currency: "usd" | "eur";

  // Notifications
  emailNotifications: boolean;
  pushNotifications: boolean;
  txAlerts: boolean;
  priceAlerts: boolean;
  stakingRewards: boolean;

  // Security
  twoFactor: boolean;
  biometric: boolean;
  sessionTimeoutMinutes: 15 | 30 | 60;

  // Network
  defaultNetwork: "sol-mainnet" | "eth-mainnet";
  customRpc: string;

  // API
  enableApiAccess: boolean;

  // Privacy
  hideBalance: boolean;
  anonymousAnalytics: boolean;
  showTxHistory: boolean;
};

const STORAGE_KEY = "dashboard_settings_v1";

const defaultSettings: SettingsState = {
  theme: "dark",
  language: "en",
  currency: "usd",

  emailNotifications: true,
  pushNotifications: true,
  txAlerts: true,
  priceAlerts: false,
  stakingRewards: true,

  twoFactor: false,
  biometric: true,
  sessionTimeoutMinutes: 30,

  defaultNetwork: "sol-mainnet",
  customRpc: "",

  enableApiAccess: false,

  hideBalance: false,
  anonymousAnalytics: true,
  showTxHistory: true,
};

function applyTheme(theme: ThemePreference) {
  if (typeof document === "undefined") return;
  const root = document.documentElement;

  const setDark = (isDark: boolean) => {
    if (isDark) {
      root.classList.add("dark");
      root.dataset.theme = "dark";
    } else {
      root.classList.remove("dark");
      root.dataset.theme = "light";
    }
  };

  if (theme === "dark") {
    setDark(true);
  } else if (theme === "light") {
    setDark(false);
  } else {
    const prefersDark = window.matchMedia?.(
      "(prefers-color-scheme: dark)"
    ).matches;
    setDark(prefersDark);
  }
}

export function useSettings() {
  const [settings, setSettings] = useState<SettingsState>(() => {
    if (typeof window === "undefined") {
      return defaultSettings;
    }
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) return defaultSettings;
      const parsed = JSON.parse(raw) as Partial<SettingsState>;
      return { ...defaultSettings, ...parsed };
    } catch {
      return defaultSettings;
    }
  });

  // ذخیره در localStorage
  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    } catch {
      // ignore
    }
  }, [settings]);

  // اعمال theme روی document
  useEffect(() => {
    applyTheme(settings.theme);
  }, [settings.theme]);

  const update = <K extends keyof SettingsState>(
    key: K,
    value: SettingsState[K]
  ) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const resetToDefaults = () => {
    setSettings(defaultSettings);
  };

  return {
    settings,
    update,
    resetToDefaults,
  };
}
