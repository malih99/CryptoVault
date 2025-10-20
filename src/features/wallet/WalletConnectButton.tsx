import { useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import WalletPopover from "./WalletPopover";
import { useWallet } from "./useWallet";

export default function WalletConnectButton() {
  const { connected, info } = useWallet();
  const [open, setOpen] = useState(false);
  const btnRef = useRef<HTMLButtonElement | null>(null);

  const short = (addr: string) =>
    addr.startsWith("0x") && addr.length > 10
      ? `${addr.slice(0, 6)}...${addr.slice(-4)}`
      : addr.length > 10
      ? `${addr.slice(0, 4)}...${addr.slice(-4)}`
      : addr;

  if (!connected) {
    return (
      <>
        <button
          ref={btnRef}
          onClick={() => setOpen((v) => !v)}
          className="h-9 px-3 rounded-xl text-sm border border-emerald-600/60 text-emerald-300 hover:bg-emerald-600/10 active:bg-emerald-600/20 transition-colors"
        >
          Connect Wallet
        </button>

        <WalletPopover
          anchorRef={btnRef}
          open={open}
          onClose={() => setOpen(false)}
        />
      </>
    );
  }

  return (
    <>
      <button
        ref={btnRef}
        onClick={() => setOpen((v) => !v)}
        className="account-chip inline-flex items-center gap-2 h-9 pl-2 pr-2 rounded-xl border border-[color:var(--border)] bg-white/5 text-gray-200 hover:bg-white/10"
      >
        <div className="account-ava h-6 w-6 rounded-full bg-emerald-500/40 ring-1 ring-emerald-400/30" />
        <span className="account-text text-sm">{short(info.address!)}</span>
        <ChevronDown size={14} className="opacity-70" />
      </button>

      <WalletPopover
        anchorRef={btnRef}
        open={open}
        onClose={() => setOpen(false)}
      />
    </>
  );
}
