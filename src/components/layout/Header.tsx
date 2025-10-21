import { Menu, Sun, Moon } from "lucide-react";
import React, { useEffect, useState } from "react";
import WalletConnectButton from "../../features/wallet/WalletConnectButton";

type Props = { onOpenSidebar: () => void };

export default function Header({ onOpenSidebar }: Props) {
  const [dark, setDark] = useState(true);

  useEffect(() => {
    const html = document.documentElement;
    html.classList.toggle("dark", dark);
    html.classList.toggle("light", !dark);
  }, [dark]);

  return (
    <header
      className="
        sticky top-0 z-40 h-16
        flex items-center justify-between
        px-4 sm:px-6 rounded-2xl
        border border-slate-700/60
        bg-slate-900/60 backdrop-blur-md backdrop-saturate-150
        shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_8px_24px_-16px_rgba(0,0,0,0.5)]
      "
    >
      {/* Left */}
      <div className="flex items-center gap-2">
        {/* فقط موبایل */}
        <button
          onClick={onOpenSidebar}
          aria-label="Open sidebar"
          className="
            lg:hidden h-9 w-9 inline-flex items-center justify-center
            rounded-xl border border-slate-700/60
            hover:bg-white/10 transition-colors
          "
        >
          {/* رنگ و ضخامت واضح تا همیشه نمایش داده شود */}
          <Menu className="text-slate-200" size={18} strokeWidth={1.75} />
        </button>

        {/* عنوان خیلی کوچک‌تر طبق طرح */}
        <span className="text-[11px] sm:text-xs font-medium tracking-wide text-slate-300">
          Crypto Portfolio Dashboard
        </span>
      </div>

      {/* Right */}
      <div className="relative flex items-center gap-2 sm:gap-3">
        <button
          onClick={() => setDark((d) => !d)}
          aria-label="Toggle theme"
          className="
            h-9 w-9 inline-flex items-center justify-center
            rounded-xl border border-slate-700/60
            hover:bg-white/10 active:bg-white/20 transition-colors
          "
        >
          {dark ? (
            <Sun className="text-slate-200" size={16} strokeWidth={1.75} />
          ) : (
            <Moon className="text-slate-200" size={16} strokeWidth={1.75} />
          )}
        </button>

        {/* از کامپوننت خودت استفاده می‌کنیم */}
        <WalletConnectButton />
      </div>
    </header>
  );
}
