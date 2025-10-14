import SwitchTheme from "../ui/SwitchTheme";
import WalletConnectButton from "../../features/wallet/WalletConnectButton";

export default function Header() {
  return (
    <header className="app-header">
      {" "}
      <div className="app-title"> Crypto Portfolio Dashboard</div>
      <div className="flex items-center gap-2 sm:gap-3">
        <SwitchTheme />
        <WalletConnectButton />
      </div>
    </header>
  );
}
