import Card from "../../components/ui/Card";
import AssetDonut from "../../components/charts/AssetDonut";
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
    <section className="mx-auto w-full max-w-[1280px] space-y-6">
      {/* ==== Portfolio Overview ==== */}
      <Card className="p-5 sm:p-6">
        <h2 className="text-slate-900 text-sm font-medium mb-3">
          Portfolio Overview
        </h2>

        <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-4 sm:p-6">
          <div className="text-emerald-800/80 text-sm">
            Total Portfolio Value
          </div>
          <div className="text-2xl sm:text-3xl font-semibold text-emerald-900 mt-1">
            ${total.toLocaleString()}
          </div>
          <div className="text-emerald-700 text-sm mt-1">
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
            <div className="text-slate-500 text-sm">{item.label}</div>
            <div className="text-slate-900 text-lg sm:text-xl mt-2 font-semibold">
              {item.value}
            </div>
            <div className="text-emerald-700 text-xs sm:text-sm mt-1">
              {item.change}
            </div>
          </Card>
        ))}
      </div>

      {/* ==== Asset Allocation ==== */}
      <Card className="p-5 sm:p-6">
        <h3 className="text-slate-900 font-medium mb-4">Asset Allocation</h3>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="mx-auto w-[220px] sm:w-[280px]">
            <AssetDonut data={donut} />
          </div>

          <div className="lg:col-span-2 space-y-3">
            {mockHoldings.map((r, i) => (
              <div
                key={r.sym}
                className="rounded-xl bg-white border border-slate-200 px-4 py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4 shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <span
                    className="h-3 w-3 rounded-full"
                    style={{ backgroundColor: palette[i % palette.length] }}
                  />
                  <div>
                    <div className="text-slate-900 text-sm font-medium">
                      {r.name}
                    </div>
                    <div className="text-xs text-slate-500">{r.sym}</div>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-6">
                  <div className="text-slate-900 text-sm sm:text-base font-medium">
                    ${r.value.toLocaleString()}
                  </div>
                  <div className="text-slate-500 text-xs sm:text-sm">
                    {((r.value / total) * 100).toFixed(0)}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </section>
  );
}
