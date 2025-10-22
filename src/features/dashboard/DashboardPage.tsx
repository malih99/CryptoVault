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
        <Stat label="Total Value" value="$24,580" right="$" />
        <Stat label="24h Change" value="+4.2%" right="📈" />
        <Stat label="Assets" value="12" right="📦" />
        <Stat label="Staked" value="$8,320" right="⛓" />
      </div>

      {/* Chart + Wallet */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <Card className="p-5 xl:col-span-2">
          <div className="flex items-center justify-between mb-3">
            <div className="text-slate-900 font-medium">
              Portfolio Value (30 days)
            </div>
            <div className="flex gap-2">
              <button className="px-2 py-1 rounded-lg text-xs text-slate-600 hover:bg-slate-100">
                7D
              </button>
              <button className="px-2 py-1 rounded-lg text-xs bg-emerald-50 text-emerald-600 border border-emerald-200">
                30D
              </button>
              <button className="px-2 py-1 rounded-lg text-xs text-slate-600 hover:bg-slate-100">
                90D
              </button>
            </div>
          </div>
          <PortfolioLine />
        </Card>

        <Card className="p-5 grid place-items-center text-slate-500">
          <WalletSummary />
        </Card>
      </div>

      {/* Assets table */}
      <AssetsTable />
    </div>
  );
}
