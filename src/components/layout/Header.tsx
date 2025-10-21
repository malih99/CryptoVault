import { Menu, Sun, Moon, ChevronDown, Wallet, LogOut } from "lucide-react";
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
          className="
            lg:hidden h-9 w-9 flex items-center justify-center
            rounded-xl border border-slate-700/60
            text-slate-200 hover:bg-white/10 transition-colors
          "
        >
          <Menu size={18} />
        </button>
        <span className="text-xs sm:text-sm font-medium tracking-wide text-slate-300">
          Crypto Portfolio Dashboard
        </span>
      </div>

      {/* Right */}
      <div className="flex items-center gap-2 sm:gap-3 relative">
        {/* Theme Switch */}
        <button
          onClick={() => setDark((d) => !d)}
          aria-label="Toggle theme"
          className="
            h-9 w-9 flex items-center justify-center
            rounded-xl border border-slate-700/60
            text-slate-200 hover:bg-white/10 active:bg-white/20 transition-colors
          "
        >
          {dark ? <Sun size={16} /> : <Moon size={16} />}
        </button>

        {/* Wallet Button */}
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

        {/* Wallet Popover */}
        {walletOpen && (
          <div
            className="
              absolute right-0 top-12 w-56
              bg-slate-800 border border-slate-700 rounded-xl
              shadow-lg overflow-hidden z-40
            "
          >
            <div className="p-3 text-sm text-gray-200 border-b border-slate-700">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-emerald-500/30 flex items-center justify-center">
                  <Wallet size={16} className="text-emerald-400" />
                </div>
                <div>
                  <div className="text-xs text-slate-400">Connected as</div>
                  <div className="font-medium text-emerald-300">
                    0xA3c4...7B9f
                  </div>
                </div>
              </div>
            </div>
            <button
              onClick={() => {
                setWalletOpen(false);
                alert("Disconnected!");
              }}
              className="
                flex items-center gap-2 w-full text-left px-4 py-3 text-sm
                hover:bg-slate-700/50 transition-colors
              "
            >
              <LogOut size={16} />
              <span>Disconnect</span>
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
