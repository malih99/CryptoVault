import SwitchTheme from "../components/ui/SwitchTheme";
import WalletConnectButton from "../features/wallet/WalletConnectButton";

export default function Header() {
  return (
    <header className="h-16 rounded-2xl border border-border bg-bg/60 backdrop-blur flex items-center justify-between px-4">
      <h1 className="text-white font-semibold">Crypto Portfolio Dashboard</h1>
      <div className="flex items-center gap-3">
        <SwitchTheme />
        <WalletConnectButton />
      </div>
    </header>
  );
}
