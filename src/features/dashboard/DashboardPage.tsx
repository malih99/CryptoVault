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
import { useDashboardQuery } from "../../features/dashboard/api";

type RangeKey = "7d" | "30d" | "90d";

export default function DashboardPage() {
  const { t } = useTranslation();
  const [range, setRange] = useState<RangeKey>("30d");

  const { data, isLoading, isError, error, refetch, isFetching } =
    useDashboardQuery();

  const kpis = data?.kpis;
  const lineData = data?.line ?? [];
  const holdings = data?.holdings ?? [];
  const marketItems = data?.market ?? [];
  const newsItems = data?.news ?? [];
  const activityItems = data?.recentActivity ?? [];

  const totalValue = kpis?.totalValue ?? 0;
  const change24 = kpis?.change24h ?? 0;
  const assetsCount = kpis?.assetsCount ?? 0;
  const stakedUsd = kpis?.stakedValue ?? 0;

  const pillBase =
    "rounded-lg px-2 py-1 text-xs transition-colors " +
    "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/60";
  const pillActive =
    "border border-emerald-200 bg-emerald-50 text-emerald-700 " +
    "dark:border-emerald-800 dark:bg-emerald-400/10 dark:text-emerald-300";
  const pillInactive = "border border-transparent";

  return (
    <div className="mx-auto w-full max-w-[1280px] space-y-6 px-3 sm:px-0">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold text-slate-900 dark:text-slate-50">
            {t("dashboard.title", "Dashboard")}
            {isFetching && (
              <span className="ml-2 text-xs text-slate-400">(refreshing…)</span>
            )}
          </h1>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            {t(
              "dashboard.subtitle",
              "Overview of your portfolio, markets and activity."
            )}
          </p>
        </div>
        {isError && (
          <button
            type="button"
            onClick={() => refetch()}
            className="rounded-lg border border-amber-300 bg-amber-50 px-3 py-1.5 text-xs text-amber-700 dark:border-amber-500/50 dark:bg-amber-950/40 dark:text-amber-300"
          >
            {t("common.retry", "Retry")}
          </button>
        )}
      </div>

      {/* KPI row */}
      {isLoading ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <Stat.Skeleton />
          <Stat.Skeleton />
          <Stat.Skeleton />
          <Stat.Skeleton />
        </div>
      ) : isError ? (
        <Card className="p-4 sm:p-5">
          <div className="text-sm font-medium text-rose-600 dark:text-rose-400">
            {t("dashboard.errorTitle", "Failed to load dashboard data")}
          </div>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            {(error as Error)?.message ||
              t("dashboard.errorUnknown", "Unknown error")}
          </p>
        </Card>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <Stat
            label={t("dashboard.kpi.totalValue")}
            value={formatCurrency(totalValue, "USD")}
            right="$"
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
            value={formatCurrency(stakedUsd, "USD")}
            right="⛓"
          />
        </div>
      )}

      {/* Chart + Wallet */}
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
        <Card className="xl:col-span-2 p-5">
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
          <PortfolioLine range={range} data={lineData} />
        </Card>

        <Card className="grid place-items-center p-5 text-slate-500 dark:text-slate-400">
          <WalletSummary />
        </Card>
      </div>

      {/* Row: Recent / Quick Actions / Market */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3">
        <RecentActivity items={activityItems} />
        <QuickActions />
        <MarketOverview items={marketItems} />
      </div>

      {/* Row: Assets table + News */}
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <AssetsTable rows={holdings} />
        </div>
        <NewsAlerts items={newsItems} />
      </div>
    </div>
  );
}
