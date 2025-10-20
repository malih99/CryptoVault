import { Menu, Sun, Moon, ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function Header({
  onOpenSidebar,
}: {
  onOpenSidebar: () => void;
}) {
  const [dark, setDark] = useState(true);
  const [walletOpen, setWalletOpen] = useState(false);
  const btnRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const html = document.documentElement;
    html.classList.toggle("dark", dark);
    html.classList.toggle("light", !dark);
  }, [dark]);

  return (
    <header
      className="
        sticky top-0 z-30 h-16
        flex items-center justify-between
        px-4 sm:px-6 rounded-2xl
        border border-slate-700/60
        bg-slate-900/60 backdrop-blur-md backdrop-saturate-150
        shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_8px_24px_-16px_rgba(0,0,0,0.5)]
      "
    >
      {/* Left */}
      <div className="flex items-center gap-2">
        <button
          onClick={onOpenSidebar}
          aria-label="Open sidebar"
          className="h-9 w-9 flex items-center justify-center bg-red-500 text-white"
        >
          <Menu size={24} color="white" />
        </button>

        <span className="text-xs sm:text-sm font-medium tracking-wide text-slate-300">
          Crypto Portfolio Dashboard
        </span>
      </div>

      {/* Right */}
      <div className="flex items-center gap-2 sm:gap-3">
        <button
          aria-label="Toggle theme"
          onClick={() => setDark((d) => !d)}
          className="
            h-9 w-9 flex items-center justify-center
            rounded-xl border border-slate-700/60
            text-slate-200 hover:bg-white/10 active:bg-white/20 transition-colors
          "
        >
          {dark ? (
            <Sun size={16} className="opacity-90" />
          ) : (
            <Moon size={16} className="opacity-90" />
          )}
        </button>

        <button
          ref={btnRef}
          onClick={() => setWalletOpen((v) => !v)}
          className="
            h-9 px-3 inline-flex items-center justify-center gap-2
            rounded-xl border border-emerald-500/60
            text-sm font-medium leading-none text-emerald-300
            hover:bg-emerald-600/10 active:bg-emerald-600/20 transition-colors
          "
        >
          Connect Wallet
          <ChevronDown size={14} className="opacity-70" />
        </button>
      </div>
    </header>
  );
}
