import { useState } from "react";
import Card from "../../components/ui/Card";
import Stat from "../../components/ui/Stat";
import { PortfolioLine } from "../../components/charts/PortfolioLine";
import WalletSummary from "../../features/wallet/WalletSummary";
import AssetsTable from "../../components/tables/AssetsTable";
import { useTranslation } from "react-i18next";
import RecentActivity from "./RecentActivity";
import QuickActions from "./QuickActions";
import MarketOverview from "./MarketOverview";
import NewsAlerts from "./NewsAlerts";
import { formatCurrency, formatNumber, formatPercent } from "../../lib/format";
import { useSettings } from "../../features/settings/useSettings";

type RangeKey = "7d" | "30d" | "90d";

export default function DashboardPage() {
  const { t } = useTranslation();
  const [range, setRange] = useState<RangeKey>("30d");
  const { settings } = useSettings();

  // تبدیل تنظیمات داخلی به کد استاندارد ارز
  const displayCurrency: "USD" | "EUR" =
    settings.currency === "eur" ? "EUR" : "USD";
  const currencySymbol = displayCurrency === "EUR" ? "€" : "$";

  // 🔢 نمونه اعداد (در آینده از API/State بیاد)
  const totalValue = 24580;
  const change24 = 4.2;
  const assetsCount = 12;
  const stakedUsd = 8320;

  const pillBase =
    "px-2 py-1 rounded-lg text-xs transition-colors " +
    "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/60";
  const pillActive =
    "bg-emerald-50 dark:bg-emerald-400/10 text-emerald-700 dark:text-emerald-300 " +
    "border border-emerald-200 dark:border-emerald-800";
  const pillInactive =
    "border border-transparent text-slate-600 dark:text-slate-300";

  return (
    <div className="mx-auto w-full max-w-[1280px] space-y-6 px-3 sm:px-0">
      {/* KPI row */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Stat
          label={t("dashboard.kpi.totalValue")}
          value={formatCurrency(totalValue, displayCurrency)}
          right={currencySymbol}
        />
        <Stat
          label={t("dashboard.kpi.change24h")}
          value={formatPercent(change24)}
          right="📈"
        />
        <Stat
          label={t("dashboard.kpi.assets")}
          value={formatNumber(assetsCount)}
          right="📦"
        />
        <Stat
          label={t("dashboard.kpi.staked")}
          value={formatCurrency(stakedUsd, displayCurrency)}
          right={currencySymbol}
        />
      </div>

      {/* Chart + Wallet */}
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
        <Card className="p-5 xl:col-span-2">
          <div className="mb-3 flex items-center justify-between">
            <div className="font-medium text-slate-900 dark:text-slate-100">
              {t("dashboard.portfolioValue")}
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setRange("7d")}
                className={
                  pillBase + " " + (range === "7d" ? pillActive : pillInactive)
                }
              >
                {t("dashboard.range.7d")}
              </button>
              <button
                type="button"
                onClick={() => setRange("30d")}
                className={
                  pillBase + " " + (range === "30d" ? pillActive : pillInactive)
                }
              >
                {t("dashboard.range.30d")}
              </button>
              <button
                type="button"
                onClick={() => setRange("90d")}
                className={
                  pillBase + " " + (range === "90d" ? pillActive : pillInactive)
                }
              >
                {t("dashboard.range.90d")}
              </button>
            </div>
          </div>
          <PortfolioLine range={range} currency={displayCurrency} />
        </Card>

        <Card className="grid place-items-center p-5 text-slate-500 dark:text-slate-400">
          <WalletSummary />
        </Card>
      </div>

      {/* Row: Recent / Quick Actions / Market */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3">
        <RecentActivity />
        <QuickActions />
        <MarketOverview />
      </div>

      {/* Row: Assets table + News */}
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <AssetsTable />
        </div>
        <NewsAlerts />
      </div>
    </div>
  );
}
