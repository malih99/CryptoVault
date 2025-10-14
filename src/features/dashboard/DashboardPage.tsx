import Card from "../../components/ui/Card";
import Stat from "../../components/ui/Stat";
import { PortfolioLine } from "../../components/charts/PortfolioLine";
import WalletSummary from "../../features/wallet/WalletSummary";
import AssetsTable from "../../components/tables/AssetsTable";

export default function DashboardPage() {
  return (
    <div className="mx-auto w-full max-w-[1280px] space-y-6">
      {/* KPI row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <Stat
          label="Total Value"
          value="$24,580"
          right={<div className="kpi-chip">$</div>}
        />
        <Stat
          label="24h Change"
          value="+4.2%"
          right={<div className="kpi-chip">📈</div>}
        />
        <Stat
          label="Assets"
          value="12"
          right={<div className="kpi-chip">📦</div>}
        />
        <Stat
          label="Staked"
          value="$8,320"
          right={<div className="kpi-chip">⛓</div>}
        />
      </div>

      {/* Chart + Wallet */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <Card className="p-5 xl:col-span-2">
          <div className="flex items-center justify-between mb-3">
            <div className="text-white font-medium">
              Portfolio Value (30 days)
            </div>
            <div className="flex gap-2">
              <button className="px-2 py-1 rounded-lg text-xs text-gray-400 hover:bg-white/5">
                7D
              </button>
              <button className="px-2 py-1 rounded-lg bg-emerald-700/30 text-emerald-300 text-xs">
                30D
              </button>
              <button className="px-2 py-1 rounded-lg text-xs text-gray-400 hover:bg-white/5">
                90D
              </button>
            </div>
          </div>
          <PortfolioLine />
        </Card>

        <Card className="p-5 grid place-items-center text-gray-400">
          <WalletSummary />
        </Card>
      </div>

      {/* Assets table */}
      <AssetsTable />
    </div>
  );
}
