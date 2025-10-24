// src/features/dashboard/DashboardPage.tsx
import Card from "../../components/ui/Card";
import Stat from "../../components/ui/Stat";
import { PortfolioLine } from "../../components/charts/PortfolioLine";
import WalletSummary from "../../features/wallet/WalletSummary";
import AssetsTable from "../../components/tables/AssetsTable";
import { useTranslation } from "react-i18next";

export default function DashboardPage() {
  const { t } = useTranslation();

  return (
    <div className="mx-auto w-full max-w-[1280px] space-y-6 px-3 sm:px-0">
      {/* KPI row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <Stat label={t("dashboard.kpi.totalValue")} value="$24,580" right="$" />
        <Stat label={t("dashboard.kpi.change24h")} value="+4.2%" right="📈" />
        <Stat label={t("dashboard.kpi.assets")} value="12" right="📦" />
        <Stat label={t("dashboard.kpi.staked")} value="$8,320" right="⛓" />
      </div>

      {/* Chart + Wallet */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <Card className="p-5 xl:col-span-2">
          <div className="flex items-center justify-between mb-3">
            <div className="text-slate-900 dark:text-slate-100 font-medium">
              {t("dashboard.portfolioValue")}
            </div>
            <div className="flex gap-2">
              <button className="px-2 py-1 rounded-lg text-xs text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/60">
                {t("dashboard.range.7d")}
              </button>
              <button className="px-2 py-1 rounded-lg text-xs bg-emerald-50 dark:bg-emerald-400/10 text-emerald-600 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                {t("dashboard.range.30d")}
              </button>
              <button className="px-2 py-1 rounded-lg text-xs text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/60">
                {t("dashboard.range.90d")}
              </button>
            </div>
          </div>
          <PortfolioLine />
        </Card>

        <Card className="p-5 grid place-items-center text-slate-500 dark:text-slate-400">
          <WalletSummary />
        </Card>
      </div>

      {/* Assets table */}
      <AssetsTable />
    </div>
  );
}
