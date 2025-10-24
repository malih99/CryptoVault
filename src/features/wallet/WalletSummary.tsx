import { useWallet } from "./useWallet";
import { useTranslation } from "react-i18next";

export default function WalletSummary() {
  const { t } = useTranslation();
  const { connected, info } = useWallet();

  if (!connected) {
    return (
      <div className="w-full text-center text-slate-500 dark:text-slate-400">
        <div className="text-4xl sm:text-5xl mb-3">💳</div>
        <div className="max-w-[240px] mx-auto">
          {t("dashboard.connectWalletTitle")}
        </div>
      </div>
    );
  }

  return (
    <div className="text-center">
      <div className="text-sm text-slate-500 dark:text-slate-400 mb-1">
        {t("dashboard.connectedWallet")}
      </div>
      <div className="text-lg font-semibold text-slate-900 dark:text-slate-100 break-all">
        {info.address}
      </div>
      <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
        {t("dashboard.network")}: {info.network}
      </div>
    </div>
  );
}
