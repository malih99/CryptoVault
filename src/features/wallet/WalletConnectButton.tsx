// src/features/wallet/WalletConnectButton.tsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ChevronDown, Copy, ExternalLink, LogOut, Wallet } from "lucide-react";

// اگر هوک خودت را داری، اینجا ایمپورت کن و stateهای شبیه‌ساز را حذف کن
// import { useWallet } from "./useWallet";

function useOutsideClose(
  open: boolean,
  onClose: () => void,
  refs: React.RefObject<HTMLElement>[]
) {
  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      const t = e.target as Node;
      if (refs.every((r) => r.current && !r.current.contains(t))) onClose();
    };
    const onEsc = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onEsc);
    };
  }, [open, onClose, refs]);
}

export default function WalletConnectButton() {
  // ---------- شبیه‌ساز (در صورت داشتن useWallet واقعی، این چهار خط را بردار) ----------
  const [connected, setConnected] = useState(false);
  const [address] = useState("0xA3c4...7B9f");
  // const { connected, info, connect, disconnect } = useWallet();
  // const address = useMemo(() => short(info.address), [info.address]);
  // -------------------------------------------------------------------

  const btnRef = useRef<HTMLButtonElement | null>(null);
  const popRef = useRef<HTMLDivElement | null>(null);
  const [open, setOpen] = useState(false);

  useOutsideClose(open, () => setOpen(false), [btnRef, popRef]);

  // موقعیت‌دهی Popover کنار دکمه
  const style = useMemo((): React.CSSProperties => {
    const rect = btnRef.current?.getBoundingClientRect();
    if (!rect) return { display: "none" };
    const margin = 8;
    return {
      position: "fixed",
      top: rect.bottom + margin,
      left: Math.max(12, rect.right - 288), // 288 ~ w-72
      zIndex: 60,
    };
  }, [open]); // هر بار باز شدن دوباره محاسبه می‌کنیم

  const short = (addr: string) =>
    addr.startsWith("0x") && addr.length > 10
      ? `${addr.slice(0, 6)}...${addr.slice(-4)}`
      : addr.length > 10
      ? `${addr.slice(0, 4)}...${addr.slice(-4)}`
      : addr;

  return (
    <>
      {/* دکمه */}
      <button
        ref={btnRef}
        onClick={() => setOpen((v) => !v)}
        className="
          h-9 pl-3 pr-2 inline-flex items-center gap-2
          rounded-xl border border-emerald-500/60
          text-sm font-medium leading-none
          text-emerald-300 hover:bg-emerald-600/10 active:bg-emerald-600/20
          transition-colors
        "
      >
        {connected ? (
          <>
            <span className="hidden sm:inline">{short(address)}</span>
            <span className="sm:hidden">Wallet</span>
            <ChevronDown size={14} className="opacity-80" />
          </>
        ) : (
          <>
            <span>Connect Wallet</span>
            <ChevronDown size={14} className="opacity-80" />
          </>
        )}
      </button>

      {/* پاپاور با پورتال */}
      {open &&
        createPortal(
          <div
            ref={popRef}
            style={style}
            className="
              w-72 origin-top-right
              rounded-xl border border-slate-700 bg-slate-800/95
              shadow-xl backdrop-blur-md overflow-hidden
              animate-[pop_.12s_ease]
            "
          >
            {/* Header */}
            <div className="px-4 py-3 border-b border-slate-700 flex items-center gap-2">
              <div className="h-9 w-9 rounded-lg bg-emerald-500/15 grid place-items-center ring-1 ring-emerald-500/30">
                <Wallet className="text-emerald-400" size={18} />
              </div>
              <div className="text-sm">
                <div className="text-slate-300 font-medium">
                  {connected ? "Wallet connected" : "Connect your wallet"}
                </div>
                <div className="text-xs text-slate-400">
                  {connected ? "Manage your session" : "Choose a provider"}
                </div>
              </div>
            </div>

            {/* Body */}
            {!connected ? (
              <div className="p-2">
                {/* Provider 1 */}
                <button
                  onClick={() => {
                    // TODO: connect('metamask')
                    setOpen(false);
                    setTimeout(() => setConnected(true), 120);
                  }}
                  className="w-full text-left px-3 py-3 rounded-lg hover:bg-white/5 flex items-center gap-3"
                >
                  <div className="h-8 w-8 rounded-full bg-orange-500/20 grid place-items-center">
                    <span className="text-orange-400 text-sm">🦊</span>
                  </div>
                  <div className="text-sm">
                    <div className="text-slate-200">MetaMask</div>
                    <div className="text-slate-400 text-xs">Ethereum & EVM</div>
                  </div>
                </button>

                {/* Provider 2 */}
                <button
                  onClick={() => {
                    // TODO: connect('phantom')
                    setOpen(false);
                    setTimeout(() => setConnected(true), 120);
                  }}
                  className="mt-1 w-full text-left px-3 py-3 rounded-lg hover:bg-white/5 flex items-center gap-3"
                >
                  <div className="h-8 w-8 rounded-full bg-indigo-500/20 grid place-items-center">
                    <span className="text-indigo-300 text-sm">👻</span>
                  </div>
                  <div className="text-sm">
                    <div className="text-slate-200">Phantom</div>
                    <div className="text-slate-400 text-xs">Solana</div>
                  </div>
                </button>
              </div>
            ) : (
              <div className="p-2">
                <div className="px-3 py-3 rounded-lg bg-white/5 flex items-center justify-between">
                  <div className="text-xs text-slate-400">Address</div>
                  <div className="text-xs text-emerald-300 font-mono">
                    {short(address)}
                  </div>
                </div>
                <div className="mt-2 grid grid-cols-2 gap-2">
                  <button
                    onClick={() => navigator.clipboard.writeText(address)}
                    className="px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center gap-2 text-sm"
                  >
                    <Copy size={14} />
                    Copy
                  </button>
                  <a
                    href="#"
                    className="px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center gap-2 text-sm"
                  >
                    <ExternalLink size={14} />
                    Explorer
                  </a>
                </div>
                <button
                  onClick={() => {
                    // TODO: disconnect()
                    setOpen(false);
                    setTimeout(() => setConnected(false), 100);
                  }}
                  className="mt-3 w-full px-3 py-2 rounded-lg bg-red-500/15 text-red-300 hover:bg-red-500/25 flex items-center justify-center gap-2 text-sm"
                >
                  <LogOut size={14} />
                  Disconnect
                </button>
              </div>
            )}
          </div>,
          document.body
        )}
    </>
  );
}
