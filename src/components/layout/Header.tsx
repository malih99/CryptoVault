import SwitchTheme from "../ui/SwitchTheme";
import WalletConnectButton from "../../features/wallet/WalletConnectButton";

export default function Header() {
  return (
    <header className="app-header">
      {" "}
      {/* استایل کارت‌مانند + بوردر + بلور */}
      <div className="app-title">
        {" "}
        {/* تیتر کوچک و رنگ خنثی */}
        Crypto Portfolio Dashboard
      </div>
      <div className="flex items-center gap-2 sm:gap-3">
        <SwitchTheme />
        <WalletConnectButton />
      </div>
    </header>
  );
}
