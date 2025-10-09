import Card from "../../components/ui/Card";
import AssetDonut from "../..//components/charts/AssetDonut";
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
      <Card className="p-5">
        <div className="text-white text-sm mb-2">Portfolio Overview</div>
        <div className="rounded-xl bg-emerald-800/20 border border-emerald-700/30 p-5">
          <div className="text-gray-300 text-sm">Total Portfolio Value</div>
          <div className="text-2xl font-semibold text-white mt-1">
            ${total.toLocaleString()}
          </div>
          <div className="text-emerald-400 text-sm mt-1">
            + $4,892.20 (24.87%)
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-4 gap-4">
        <Card className="p-5">
          <div className="text-gray-300 text-sm">24 Hours</div>
          <div className="text-white text-xl mt-2">+$342.50</div>
          <div className="text-emerald-400 text-sm mt-1">+1.42%</div>
        </Card>
        <Card className="p-5">
          <div className="text-gray-300 text-sm">7 Days</div>
          <div className="text-white text-xl mt-2">+$1,245.80</div>
          <div className="text-emerald-400 text-sm mt-1">+5.34%</div>
        </Card>
        <Card className="p-5">
          <div className="text-gray-300 text-sm">30 Days</div>
          <div className="text-white text-xl mt-2">+$3,892.20</div>
          <div className="text-emerald-400 text-sm mt-1">+18.82%</div>
        </Card>
        <Card className="p-5">
          <div className="text-gray-300 text-sm">1 Year</div>
          <div className="text-white text-xl mt-2">+$12,450.00</div>
          <div className="text-emerald-400 text-sm mt-1">+102.45%</div>
        </Card>
      </div>

      <Card className="p-5">
        <div className="text-white mb-4">Asset Allocation</div>
        <div className="grid grid-cols-3 gap-6">
          <AssetDonut data={donut} />
          <div className="col-span-2 space-y-3">
            {mockHoldings.map((r) => (
              <div
                key={r.sym}
                className="rounded-xl bg-white/5 border border-border px-4 py-3 flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <span className="h-3 w-3 rounded-full bg-white/50" />
                  <div>
                    <div className="text-white">{r.name}</div>
                    <div className="text-xs text-gray-400">{r.sym}</div>
                  </div>
                </div>
                <div className="text-white">${r.value.toLocaleString()}</div>
                <div className="text-gray-400 text-sm">
                  {" "}
                  {((r.value / total) * 100).toFixed(0)}%{" "}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
}
