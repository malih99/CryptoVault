import SwitchTheme from "../ui/SwitchTheme";
import WalletConnectButton from "../../features/wallet/WalletConnectButton";
import { Menu } from "lucide-react";

export default function Header({
  onOpenSidebar,
}: {
  onOpenSidebar: () => void;
}) {
  return (
    <header
      className="
        sticky top-0 z-30
        flex h-16 items-center justify-between
        border-b border-border
        bg-[rgba(15,23,38,0.65)]  /* شیشه‌ای با base رنگ کارت */
        backdrop-blur-md backdrop-saturate-150
        shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_8px_24px_-16px_rgba(0,0,0,0.5)]
        px-4 sm:px-6
      "
    >
      <div className="flex items-center gap-2">
        <button
          onClick={onOpenSidebar}
          className="lg:hidden h-9 w-9 grid place-items-center rounded-xl border border-border text-gray-300 hover:bg-white/10"
          aria-label="Open sidebar"
        >
          <Menu size={18} />
        </button>
        <div className="text-sm font-medium">Crypto Portfolio Dashboard</div>
      </div>

      <div className="flex items-center gap-2 sm:gap-3">
        <SwitchTheme />
        <WalletConnectButton />
      </div>
    </header>
  );
}
