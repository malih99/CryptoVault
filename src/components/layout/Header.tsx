import SwitchTheme from "../ui/SwitchTheme";
import WalletConnectButton from "../../features/wallet/WalletConnectButton";

export default function Header() {
  return (
    <header
      className="
        h-16 rounded-2xl border border-border bg-card/80
        backdrop-blur flex items-center justify-between
        px-3 sm:px-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]
      "
    >
      <h1 className="text-xs sm:text-sm text-gray-300 font-medium tracking-wide">
        Crypto Portfolio Dashboard
      </h1>
      <div className="flex items-center gap-2 sm:gap-3">
        <SwitchTheme />
        <WalletConnectButton />
      </div>
    </header>
  );
}
