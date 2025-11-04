import Card from "../../components/ui/Card";
import { T, THEAD, TBODY, TR, TH, TD } from "../../components/ui/Table";
import { mockTx } from "../../lib/api/mock";

export default function TxTable() {
  return (
    <Card className="p-4 sm:p-5">
      <div className="mb-3 text-sm font-medium text-slate-900 dark:text-slate-50">
        Transactions
      </div>

      {/* Mobile & Tablet (xs–md): cards */}
      <div className="grid gap-3 lg:hidden">
        {mockTx.map((r, i) => (
          <div
            key={i}
            className="
              grid grid-cols-1 gap-2 rounded-xl border
              border-slate-200 bg-slate-50/80 px-3 py-3
              dark:border-slate-800 dark:bg-slate-900
            "
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span
                  className={`
                    inline-flex h-7 w-7 items-center justify-center rounded-lg text-sm
                    ${
                      r.type === "in"
                        ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300"
                        : r.type === "swap"
                        ? "bg-amber-50 text-amber-700 dark:bg-amber-900 dark:text-amber-300"
                        : "bg-rose-50 text-rose-700 dark:bg-rose-900 dark:text-rose-300"
                    }
                  `}
                >
                  {r.type === "in" ? "↙" : r.type === "swap" ? "⇄" : "↗"}
                </span>
                <div className="text-sm text-slate-900 dark:text-slate-50">
                  {r.token}
                </div>
              </div>
              <span
                className={`
                  text-sm font-medium
                  ${
                    r.amount.startsWith("-")
                      ? "text-rose-600 dark:text-rose-300"
                      : "text-emerald-600 dark:text-emerald-300"
                  }
                `}
              >
                {r.amount}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="space-y-0.5">
                <div className="text-slate-500 dark:text-slate-400">Value</div>
                <div className="text-slate-900 dark:text-slate-50">
                  {r.value}
                </div>
              </div>
              <div className="space-y-0.5">
                <div className="text-slate-500 dark:text-slate-400">Time</div>
                <div className="text-slate-900 dark:text-slate-50">
                  {r.time}
                </div>
              </div>
              <div className="col-span-2 space-y-0.5">
                <div className="text-slate-500 dark:text-slate-400">
                  From/To
                </div>
                <div className="truncate text-slate-900 dark:text-slate-50">
                  {r.from}
                </div>
              </div>
              <div className="col-span-2 space-y-0.5">
                <div className="text-slate-500 dark:text-slate-400">Hash</div>
                <div className="truncate text-slate-900 dark:text-slate-50">
                  {r.hash}
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <span
                className={`
                  rounded-full px-2 py-1 text-[11px]
                  ${
                    r.status === "confirmed"
                      ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-900/70 dark:text-emerald-300"
                      : "bg-amber-50 text-amber-700 dark:bg-amber-900/70 dark:text-amber-300"
                  }
                `}
              >
                {r.status}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop (lg+): full table */}
      <div className="hidden overflow-x-auto lg:block">
        <T>
          <THEAD>
            <TR>
              <TH>Type</TH>
              <TH>Token</TH>
              <TH>Amount</TH>
              <TH>Value</TH>
              <TH>From/To</TH>
              <TH>Hash</TH>
              <TH>Time</TH>
              <TH>Status</TH>
            </TR>
          </THEAD>
          <TBODY>
            {mockTx.map((r, i) => (
              <TR key={i}>
                <TD
                  className={
                    r.type === "in"
                      ? "font-medium text-emerald-600 dark:text-emerald-300"
                      : r.type === "swap"
                      ? "font-medium text-amber-600 dark:text-amber-300"
                      : "font-medium text-rose-600 dark:text-rose-300"
                  }
                >
                  {r.type === "in" ? "↙" : r.type === "swap" ? "⇄" : "↗"}
                </TD>
                <TD>{r.token}</TD>
                <TD
                  className={
                    r.amount.startsWith("-")
                      ? "text-rose-600 dark:text-rose-300"
                      : "text-emerald-600 dark:text-emerald-300"
                  }
                >
                  {r.amount}
                </TD>
                <TD>{r.value}</TD>
                <TD className="max-w-[280px] truncate">{r.from}</TD>
                <TD className="max-w-[220px] truncate">{r.hash}</TD>
                <TD>{r.time}</TD>
                <TD>
                  <span
                    className={`rounded-full px-2 py-1 text-xs ${
                      r.status === "confirmed"
                        ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-900/70 dark:text-emerald-300"
                        : "bg-amber-50 text-amber-700 dark:bg-amber-900/70 dark:text-amber-300"
                    }`}
                  >
                    {r.status}
                  </span>
                </TD>
              </TR>
            ))}
          </TBODY>
        </T>
      </div>
    </Card>
  );
}
