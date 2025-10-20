import Card from "../../components/ui/Card";
import AssetDonut from "../../components/charts/AssetDonut";
import { mockHoldings } from "../../lib/api/mock";

export default function PortfolioPage() {
  const total = mockHoldings.reduce((s, r) => s + r.value, 0);
  const donut = mockHoldings.slice(0, 5).map((r, i) => ({
    name: r.sym,
    value: r.value,
    color: ["#f59e0b", "#60a5fa", "#22c55e", "#38bdf8", "#a78bfa"][i % 5],
  }));

  return (
    <div className="space-y-6">
      {/* ==== Portfolio Overview ==== */}
      <Card className="p-5 sm:p-6">
        <div className="text-white text-sm mb-2 sm:mb-3">
          Portfolio Overview
        </div>
        <div className="rounded-xl bg-emerald-800/20 border border-emerald-700/30 p-4 sm:p-6">
          <div className="text-gray-300 text-sm">Total Portfolio Value</div>
          <div className="text-2xl sm:text-3xl font-semibold text-white mt-1">
            ${total.toLocaleString()}
          </div>
          <div className="text-emerald-400 text-sm mt-1">
            + $4,892.20 (24.87%)
          </div>
        </div>
      </Card>

      {/* ==== Timeframe Stats ==== */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "24 Hours", value: "+$342.50", change: "+1.42%" },
          { label: "7 Days", value: "+$1,245.80", change: "+5.34%" },
          { label: "30 Days", value: "+$3,892.20", change: "+18.82%" },
          { label: "1 Year", value: "+$12,450.00", change: "+102.45%" },
        ].map((item) => (
          <Card
            key={item.label}
            className="p-4 sm:p-5 text-center sm:text-left"
          >
            <div className="text-gray-300 text-sm">{item.label}</div>
            <div className="text-white text-lg sm:text-xl mt-2">
              {item.value}
            </div>
            <div className="text-emerald-400 text-xs sm:text-sm mt-1">
              {item.change}
            </div>
          </Card>
        ))}
      </div>

      {/* ==== Asset Allocation ==== */}
      <Card className="p-5 sm:p-6">
        <div className="text-white mb-4">Asset Allocation</div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="mx-auto w-[220px] sm:w-[280px]">
            <AssetDonut data={donut} />
          </div>

          <div className="lg:col-span-2 space-y-3">
            {mockHoldings.map((r) => (
              <div
                key={r.sym}
                className="rounded-xl bg-white/5 border border-border px-4 py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4"
              >
                <div className="flex items-center gap-3">
                  <span className="h-3 w-3 rounded-full bg-white/50" />
                  <div>
                    <div className="text-white text-sm">{r.name}</div>
                    <div className="text-xs text-gray-400">{r.sym}</div>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-4 sm:gap-6">
                  <div className="text-white text-sm sm:text-base">
                    ${r.value.toLocaleString()}
                  </div>
                  <div className="text-gray-400 text-xs sm:text-sm">
                    {((r.value / total) * 100).toFixed(0)}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
}
