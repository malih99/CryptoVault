import Card from "../../components/ui/Card";

type MonthSummary = {
  id: string;
  monthLabel: string;
  sent: number;
  received: number;
  swapped: number;
  totalVolume: string;
};

export default function TxMonthlySummary({
  months,
}: {
  months: MonthSummary[];
}) {
  return (
    <Card className="p-4 sm:p-5">
      <div className="mb-4 text-sm font-medium text-slate-900 dark:text-slate-50">
        Monthly Summary
      </div>

      <div className="space-y-3">
        {months.map((m) => (
          <div
            key={m.id}
            className="rounded-xl border border-slate-200 bg-slate-50/70 p-3 text-xs text-slate-900 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-50 sm:p-4"
          >
            <div className="mb-2 text-sm font-semibold">{m.monthLabel}</div>

            <div className="flex flex-wrap items-center gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-1.5">
                  <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-emerald-100 text-[10px] text-emerald-700 dark:bg-emerald-900/70 dark:text-emerald-300">
                    ↗
                  </span>
                  <span>Sent</span>
                  <span className="text-slate-500 dark:text-slate-400">
                    {m.sent} txs
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-emerald-100 text-[10px] text-emerald-700 dark:bg-emerald-900/70 dark:text-emerald-300">
                    ↙
                  </span>
                  <span>Received</span>
                  <span className="text-slate-500 dark:text-slate-400">
                    {m.received} txs
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-amber-100 text-[10px] text-amber-700 dark:bg-amber-900/70 dark:text-amber-300">
                    ⇄
                  </span>
                  <span>Swapped</span>
                  <span className="text-slate-500 dark:text-slate-400">
                    {m.swapped} txs
                  </span>
                </div>
              </div>

              <div className="ml-auto text-right">
                <div className="text-slate-500 dark:text-slate-400">
                  Total Volume
                </div>
                <div className="text-sm font-semibold">{m.totalVolume}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
