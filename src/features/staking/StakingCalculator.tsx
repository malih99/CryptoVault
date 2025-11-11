import { useEffect, useMemo, useState } from "react";
import Card from "../../components/ui/Card";

export default function StakingCalculator({
  initialApy,
}: {
  initialApy?: number;
}) {
  const [amount, setAmount] = useState(1000);
  const [duration, setDuration] = useState(12);
  const [apy, setApy] = useState(initialApy ?? 10);

  useEffect(() => {
    if (typeof initialApy === "number" && !Number.isNaN(initialApy)) {
      setApy(initialApy);
    }
  }, [initialApy]);

  const { estReward, totalValue } = useMemo(() => {
    const r = amount * (apy / 100) * (duration / 12);
    return { estReward: r, totalValue: amount + r };
  }, [amount, duration, apy]);

  return (
    <Card className="p-5">
      <div className="mb-3 font-medium text-slate-900 dark:text-white">
        Staking Calculator
      </div>

      <div className="space-y-3">
        <label className="grid gap-1">
          <span className="text-xs text-slate-500 dark:text-slate-400">
            Stake Amount ($)
          </span>
          <input
            type="number"
            value={amount}
            min={0}
            onChange={(e) => setAmount(Number(e.target.value || 0))}
            className="h-10 rounded-xl border px-3 bg-white text-slate-900 border-slate-200
                       dark:bg-slate-900 dark:text-slate-100 dark:border-slate-700
                       focus:outline-none focus:ring-1 focus:ring-emerald-500/70"
          />
        </label>

        <label className="grid gap-1">
          <span className="text-xs text-slate-500 dark:text-slate-400">
            Staking Duration
          </span>
          <select
            value={duration}
            onChange={(e) => setDuration(Number(e.target.value))}
            className="h-10 rounded-xl border px-3 bg-white text-slate-900 border-slate-200
                       dark:bg-slate-900 dark:text-slate-100 dark:border-slate-700
                       focus:outline-none focus:ring-1 focus:ring-emerald-500/70"
          >
            <option value={3}>3 months</option>
            <option value={6}>6 months</option>
            <option value={12}>1 year</option>
            <option value={24}>2 years</option>
          </select>
        </label>

        <label className="grid gap-1">
          <span className="text-xs text-slate-500 dark:text-slate-400">
            Expected APY (%)
          </span>
          <input
            type="number"
            value={apy}
            min={0}
            onChange={(e) => setApy(Number(e.target.value || 0))}
            className="h-10 rounded-xl border px-3 bg-white text-slate-900 border-slate-200
                       dark:bg-slate-900 dark:text-slate-100 dark:border-slate-700
                       focus:outline-none focus:ring-1 focus:ring-emerald-500/70"
          />
        </label>

        <div className="mt-2 grid grid-cols-2 gap-3 text-sm">
          <div
            className="rounded-xl border p-3 text-slate-700 border-slate-200
                       dark:text-slate-200 dark:border-slate-700"
          >
            <div className="text-xs text-slate-500 dark:text-slate-400">
              Initial Stake
            </div>
            <div className="mt-0.5">${amount.toLocaleString()}</div>
          </div>
          <div
            className="rounded-xl border p-3 text-emerald-700 border-emerald-200
                       dark:text-emerald-300 dark:border-emerald-800/50"
          >
            <div className="text-xs opacity-90">Estimated Rewards</div>
            <div className="mt-0.5">+${estReward.toFixed(2)}</div>
          </div>
          <div
            className="col-span-2 rounded-xl border p-3 text-slate-900 border-slate-200
                       dark:text-slate-100 dark:border-slate-700"
          >
            <div className="text-xs text-slate-500 dark:text-slate-400">
              Total Value
            </div>
            <div className="mt-0.5">${totalValue.toFixed(2)}</div>
          </div>
        </div>
      </div>
    </Card>
  );
}
