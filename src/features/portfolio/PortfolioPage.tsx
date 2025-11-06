import Card from "../../components/ui/Card";
import AssetDonut from "../../components/charts/AssetDonut";
import PerformanceLine from "../../components/charts/PerformanceLine";
import KPIStat from "../portfolio/KPIStat";
import AssetRow from "../portfolio/AssetRow";
import HoldingsTable from "../portfolio/HoldingsTable";
import { mockHoldings } from "../../lib/api/mock";

export default function PortfolioPage() {
  const total = mockHoldings.reduce((s, r) => s + r.value, 0);

  const palette = ["#f59e0b", "#60a5fa", "#22c55e", "#38bdf8", "#a78bfa"];
  const donut = mockHoldings.slice(0, 5).map((r, i) => ({
    name: r.sym,
    value: r.value,
    color: palette[i % palette.length],
  }));

  return (
    <section className="mx-auto w-full max-w-[1280px] space-y-6 px-3 sm:px-0">
      {/* ===== Portfolio Overview ===== */}
      <Card className="p-5 sm:p-6">
        <h2 className="mb-3 text-sm font-medium text-slate-900 dark:text-slate-200">
          Portfolio Overview
        </h2>

        <div
          className="rounded-xl border p-4 sm:p-6"
          style={{
            background:
              "linear-gradient(90deg, rgba(16,185,129,0.15), rgba(16,185,129,0.05))",
            borderColor: "rgba(16,185,129,0.35)",
          }}
        >
          <div className="text-sm text-emerald-900 dark:text-emerald-200">
            Total Portfolio Value
          </div>
          <div className="mt-1 text-2xl font-semibold text-emerald-800 sm:text-3xl dark:text-emerald-50">
            ${total.toLocaleString()}
          </div>
          <div className="mt-1 text-sm text-emerald-700 dark:text-emerald-300">
            + $4,892.20 (24.87%)
          </div>
        </div>
      </Card>

      {/* ===== Timeframe KPI ===== */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <KPIStat label="24 Hours" value="+$342.50" change="+1.42%" />
        <KPIStat label="7 Days" value="+$1,245.80" change="+5.34%" />
        <KPIStat label="30 Days" value="+$3,892.20" change="+18.82%" />
        <KPIStat label="1 Year" value="+$12,450.00" change="+102.45%" />
      </div>

      {/* ===== Performance History ===== */}
      <Card className="p-5 sm:p-6">
        <h3 className="mb-4 font-medium text-slate-900 dark:text-slate-100">
          Performance History
        </h3>
        <PerformanceLine />
      </Card>

      {/* ===== Asset Allocation ===== */}
      <Card className="p-5 sm:p-6">
        <h3 className="mb-4 font-medium text-slate-900 dark:text-slate-100">
          Asset Allocation
        </h3>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="mx-auto w-[220px] sm:w-[280px]">
            <AssetDonut data={donut} />
          </div>
          <div className="space-y-3 lg:col-span-2">
            {mockHoldings.map((r, i) => (
              <AssetRow
                key={r.sym}
                name={r.name}
                sym={r.sym}
                invested={Math.round(r.value * 0.66)}
                current={r.value}
                pnl={Math.round(r.value * 0.34) * (i === 4 ? -1 : 1)} // نمایشی
                color={palette[i % palette.length]}
              />
            ))}
          </div>
        </div>
      </Card>

      {/* ===== Profit/Loss Breakdown Footer Summary ===== */}
      <Card className="p-0 overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-4 bg-white/40 px-5 py-3 dark:bg-white/5">
          <div className="text-xs text-slate-500 dark:text-slate-400">
            Total Invested
          </div>
          <div className="text-sm font-medium text-slate-900 dark:text-white">
            ${Math.round(total * 0.72).toLocaleString()}
          </div>
          <div className="text-xs text-slate-500 dark:text-slate-400">
            Current Value
          </div>
          <div className="text-sm font-medium text-slate-900 dark:text-white">
            ${total.toLocaleString()}
          </div>
          <div className="text-xs text-slate-500 dark:text-slate-400">
            Profit/Loss
          </div>
          <div className="text-sm text-emerald-500 dark:text-emerald-400">
            +$4,792
          </div>
        </div>
      </Card>

      {/* ===== Portfolio Analysis (۳ کارت) ===== */}
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
        <Card className="p-5">
          <div className="text-sm text-slate-500 dark:text-slate-400">
            Total Profit/Loss
          </div>
          <div className="mt-2 text-xl font-semibold text-emerald-500 dark:text-emerald-400">
            +$4,892.20
          </div>
          <div className="mt-1 text-xs text-emerald-700/80 dark:text-emerald-300/80">
            +24.87% since inception
          </div>
        </Card>
        <Card className="p-5">
          <div className="text-sm text-slate-500 dark:text-slate-400">
            Best Performer
          </div>
          <div className="mt-2 text-xl font-semibold text-slate-900 dark:text-white">
            Bitcoin (BTC)
          </div>
          <div className="mt-1 text-xs text-emerald-700/80 dark:text-emerald-300/80">
            +102.45% return
          </div>
        </Card>
        <Card className="p-5">
          <div className="text-sm text-slate-500 dark:text-slate-400">
            Portfolio Diversity
          </div>
          <div className="mt-2 text-xl font-semibold text-slate-900 dark:text-white">
            Well Balanced
          </div>
          <div className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            5 assets
          </div>
        </Card>
      </div>

      {/* ===== Detailed Holdings ===== */}
      <HoldingsTable
        rows={mockHoldings.map((r, i) => ({
          sym: r.sym,
          name: r.name,
          price: r.price,
          qty: r.qty,
          value: r.value,
          change: r.change,
          share: [35, 25, 20, 10, 10][i] ?? 5,
        }))}
      />
    </section>
  );
}
