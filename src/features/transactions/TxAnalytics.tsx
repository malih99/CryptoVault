import Card from "../../components/ui/Card";
import type { TxRecord } from "./types";

type Props = {
  tx: TxRecord[];
  feesByMonth: { month: string; value: number }[];
};

export default function TxAnalytics({ tx, feesByMonth }: Props) {
  // Breakdown by type
  const counts = tx.reduce(
    (acc, t) => {
      if (t.type === "in") acc.received += 1;
      else if (t.type === "out") acc.sent += 1;
      else acc.swapped += 1;
      return acc;
    },
    { received: 0, sent: 0, swapped: 0 }
  );
  const maxCount = Math.max(counts.received, counts.sent, counts.swapped, 1);

  // Top tokens by activity
  const tokenMap = new Map<string, number>();
  tx.forEach((t) => {
    tokenMap.set(t.token, (tokenMap.get(t.token) || 0) + 1);
  });
  const topTokens = Array.from(tokenMap.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 4);

  // Fees
  const totalFees = feesByMonth.reduce((s, r) => s + r.value, 0);
  const avgMonthlyFees = feesByMonth.length
    ? totalFees / feesByMonth.length
    : 0;
  const maxFee = Math.max(...feesByMonth.map((f) => f.value), 1);

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-4">
      {/* Transaction Breakdown */}
      <Card className="p-4 sm:p-5 lg:col-span-2">
        <div className="mb-4 text-sm font-medium text-slate-900 dark:text-slate-50">
          Transaction Breakdown
        </div>

        <div className="space-y-4">
          {[
            {
              label: "Received",
              key: "received" as const,
              color: "bg-emerald-500",
              value: counts.received,
            },
            {
              label: "Sent",
              key: "sent" as const,
              color: "bg-rose-500",
              value: counts.sent,
            },
            {
              label: "Swapped",
              key: "swapped" as const,
              color: "bg-amber-500",
              value: counts.swapped,
            },
          ].map((row) => (
            <div key={row.key} className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-500 dark:text-slate-400">
                  {row.label}
                </span>
                <span className="text-slate-900 dark:text-slate-50">
                  {row.value} txs
                </span>
              </div>
              <div className="h-1.5 rounded-full bg-slate-100 dark:bg-slate-800">
                <div
                  className={`h-full rounded-full ${row.color}`}
                  style={{
                    width: `${(row.value / maxCount) * 100 || 0}%`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Top Tokens by Activity */}
      <Card className="p-4 sm:p-5">
        <div className="mb-4 text-sm font-medium text-slate-900 dark:text-slate-50">
          Top Tokens by Activity
        </div>

        <div className="space-y-2">
          {topTokens.map(([sym, count]) => (
            <div
              key={sym}
              className="flex items-center justify-between rounded-xl bg-slate-50/70 px-3 py-2 text-sm text-slate-900 dark:bg-slate-900 dark:text-slate-50"
            >
              <div className="flex items-center gap-3">
                <div className="grid h-7 w-7 place-items-center rounded-full bg-emerald-500 text-xs font-semibold text-slate-900">
                  {sym[0]}
                </div>
                <span>{sym}</span>
              </div>
              <span className="text-xs text-slate-500 dark:text-slate-400">
                {count} txs
              </span>
            </div>
          ))}
        </div>
      </Card>

      {/* Fee Analysis */}
      <Card className="p-4 sm:p-5">
        <div className="mb-3 text-sm font-medium text-slate-900 dark:text-slate-50">
          Fee Analysis
        </div>

        <div className="mb-4 grid grid-cols-2 gap-3 text-xs">
          <div className="rounded-xl bg-slate-50/80 p-3 dark:bg-slate-900">
            <div className="text-slate-500 dark:text-slate-400">
              Total Fees (4 months)
            </div>
            <div className="mt-1 text-sm font-semibold text-slate-900 dark:text-slate-50">
              ${totalFees.toFixed(2)}
            </div>
          </div>
          <div className="rounded-xl bg-slate-50/80 p-3 dark:bg-slate-900">
            <div className="text-slate-500 dark:text-slate-400">
              Avg Monthly Fees
            </div>
            <div className="mt-1 text-sm font-semibold text-slate-900 dark:text-slate-50">
              ${avgMonthlyFees.toFixed(2)}
            </div>
          </div>
        </div>

        <div className="space-y-2">
          {feesByMonth.map((f) => (
            <div key={f.month} className="space-y-1">
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-slate-500 dark:text-slate-400">
                  {f.month}
                </span>
                <span className="text-slate-900 dark:text-slate-50">
                  ${f.value.toFixed(2)}
                </span>
              </div>
              <div className="h-1.5 rounded-full bg-slate-100 dark:bg-slate-800">
                <div
                  className="h-full rounded-full bg-amber-500"
                  style={{
                    width: `${(f.value / maxFee) * 100 || 0}%`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
