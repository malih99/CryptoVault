// WalletPopover.tsx
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import {
  Wallet,
  Link,
  Shield,
  X,
  Copy,
  LogOut,
  ExternalLink,
} from "lucide-react";
import { useWallet } from "./useWallet";

type Props = {
  anchorRef: React.RefObject<HTMLElement>;
  open: boolean;
  onClose: () => void;
};

export default function WalletPopover({ anchorRef, open, onClose }: Props) {
  const { connected, connect, disconnect, copyAddress, info } = useWallet();
  const panelRef = useRef<HTMLDivElement | null>(null);
  const [style, setStyle] = useState<React.CSSProperties>({});

  // جای‌گذاری کنار دکمه
  useLayoutEffect(() => {
    if (!open) return;
    const anchor = anchorRef.current;
    if (!anchor) return;

    const rect = anchor.getBoundingClientRect();
    const gap = 8;
    const top = rect.bottom + gap;
    // سعی کن پنل از راست با دکمه تراز شود؛ اگر بیرون زد، به داخل بیارش
    const desiredRight = window.innerWidth - rect.right;
    const width = Math.min(520, window.innerWidth - 16); // ریسپانسیو
    let right = Math.max(desiredRight, 8);

    setStyle({
      position: "fixed",
      top,
      right,
      width,
      zIndex: 100,
    });
  }, [open, anchorRef]);

  // بستن با کلیک بیرون
  useEffect(() => {
    if (!open) return;
    function onDocClick(e: MouseEvent) {
      const p = panelRef.current;
      if (!p) return;
      if (
        e.target instanceof Node &&
        !p.contains(e.target) &&
        !anchorRef.current?.contains(e.target as Node)
      ) {
        onClose();
      }
    }
    function onEsc(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onEsc);
    };
  }, [open, onClose, anchorRef]);

  if (!open) return null;

  return createPortal(
    <div ref={panelRef} style={style}>
      <div
        className="
          rounded-2xl border
          bg-[var(--card)]/96 backdrop-blur
          border-[color:var(--border)]
          shadow-[0_12px_24px_-12px_rgba(0,0,0,0.55),inset_0_1px_0_rgba(255,255,255,0.04)]
          overflow-hidden
        "
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-[color:var(--border)]">
          <div className="text-white font-semibold text-sm">
            {connected ? "Wallet" : "Connect a wallet"}
          </div>
          <button
            onClick={onClose}
            className="h-8 w-8 grid place-items-center rounded-xl text-gray-300 border border-[color:var(--border)] hover:bg-white/5"
          >
            <X size={16} />
          </button>
        </div>

        {/* Content */}
        {!connected ? (
          // گزینه‌های اتصال
          <div className="p-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
            <Option
              icon={<Wallet className="h-5 w-5 text-emerald-400" />}
              title="MetaMask"
              subtitle="Ethereum & EVM"
              onClick={async () => {
                await connect("metamask");
                onClose();
              }}
            />
            <Option
              icon={<Link className="h-5 w-5 text-sky-400" />}
              title="WalletConnect"
              subtitle="Mobile & Desktop"
              onClick={async () => {
                await connect("walletconnect");
                onClose();
              }}
            />
            <Option
              icon={<Shield className="h-5 w-5 text-violet-400" />}
              title="Phantom"
              subtitle="Solana"
              onClick={async () => {
                await connect("phantom");
                onClose();
              }}
            />
          </div>
        ) : (
          // منوی حساب وقتی وصل است
          <div className="p-3">
            <div className="rounded-xl border border-[color:var(--border)] bg-white/[0.02] p-3 mb-3 flex items-center gap-3">
              <div className="h-8 w-8 rounded-full bg-emerald-500/30 ring-1 ring-emerald-400/30" />
              <div className="flex-1">
                <div className="text-white text-sm font-medium">
                  {info.address}
                </div>
                <div className="text-xs text-gray-400">
                  {info.network ?? "—"}
                </div>
              </div>
              <button
                className="h-8 px-2 rounded-lg border border-[color:var(--border)] text-gray-300 hover:bg-white/5"
                onClick={copyAddress}
              >
                <Copy size={16} />
              </button>
            </div>

            <div className="flex flex-col gap-1">
              <button
                className="account-menu__item inline-flex items-center gap-2 px-3 h-10 rounded-lg border border-[color:var(--border)] text-gray-200 hover:bg-white/5"
                onClick={() => window.open("#", "_blank")}
              >
                <ExternalLink size={16} />
                <span>View on Explorer</span>
              </button>
              <button
                className="account-menu__item danger inline-flex items-center gap-2 px-3 h-10 rounded-lg border border-[color:var(--border)] text-red-300 hover:bg-white/5"
                onClick={disconnect}
              >
                <LogOut size={16} />
                <span>Disconnect</span>
              </button>
            </div>
          </div>
        )}

        {/* Footer (اختیاری) */}
        {!connected && (
          <div className="px-4 pb-3">
            <button
              onClick={onClose}
              className="w-full h-10 rounded-xl border border-[color:var(--border)] text-gray-300 hover:bg-white/5"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>,
    document.body
  );
}

function Option({
  icon,
  title,
  subtitle,
  onClick,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="
        group rounded-xl border border-[color:var(--border)]
        bg-white/[0.02] hover:bg-white/[0.06]
        px-3 py-3 text-left transition-colors
      "
    >
      <div className="h-9 w-9 rounded-lg grid place-items-center bg-white/5 mb-2">
        {icon}
      </div>
      <div className="text-sm text-white font-medium">{title}</div>
      <div className="text-xs text-gray-400">{subtitle}</div>
    </button>
  );
}
