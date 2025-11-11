import Card from "../../components/ui/Card";
import type { StakingApyRow } from "./types";

export default function StakingAPYComparison({
  rows,
}: {
  rows: StakingApyRow[];
}) {
  return (
    <Card className="p-5">
      <div className="mb-4 font-medium text-slate-900 dark:text-white">
        APY Comparison
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[880px] text-sm">
          <thead>
            <tr className="text-slate-500 dark:text-slate-400">
              <th className="py-2 text-left">Token</th>
              <th className="py-2 text-left">Current APY</th>
              <th className="py-2 text-left">30-Day Avg</th>
              <th className="py-2 text-left">Min Stake</th>
              <th className="py-2 text-left">Lock Period</th>
              <th className="py-2 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr
                key={i}
                className="border-t border-slate-100 dark:border-slate-800"
              >
                <td className="py-3">
                  <div className="flex items-center gap-2">
                    <div
                      className="grid h-6 w-6 place-items-center rounded-full bg-slate-200 text-slate-700
                                 dark:bg-slate-800 dark:text-slate-200"
                    >
                      {r.sym[0]}
                    </div>
                    <div className="text-slate-900 dark:text-slate-100">
                      {r.token}
                    </div>
                    <span className="text-xs text-slate-500 dark:text-slate-400">
                      {r.sym}
                    </span>
                  </div>
                </td>
                <td className="py-3 text-emerald-600 dark:text-emerald-400">
                  {r.cur}
                </td>
                <td className="py-3 text-slate-900 dark:text-slate-100">
                  {r.avg30}
                </td>
                <td className="py-3 text-slate-900 dark:text-slate-100">
                  {r.minStake}
                </td>
                <td className="py-3 text-slate-900 dark:text-slate-100">
                  {r.lock}
                </td>
                <td className="py-3">
                  <span
                    className={
                      "rounded-full px-2 py-0.5 text-xs " +
                      (r.status === "Active"
                        ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300"
                        : "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300")
                    }
                  >
                    {r.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
