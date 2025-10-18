import Card from "../../components/ui/Card";
import { T, THEAD, TBODY, TR, TH, TD } from "../../components/ui/Table";
import { mockTx } from "../../lib/api/mock";

export default function TxTable() {
  return (
    <Card className="p-4 sm:p-5">
      <div className="text-white mb-3">Transactions</div>

      {/* Mobile & Tablet (xs–md): cards */}
      <div className="grid gap-3 lg:hidden">
        {mockTx.map((r, i) => (
          <div
            key={i}
            className="
              rounded-xl border border-border bg-white/5 px-3 py-3
              grid grid-cols-1 gap-2
            "
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span
                  className={`
                    inline-flex h-7 w-7 items-center justify-center rounded-lg text-sm
                    ${
                      r.type === "in"
                        ? "bg-emerald-900 text-emerald-300"
                        : "bg-red-900 text-red-300"
                    }
                  `}
                >
                  {r.type === "in" ? "↙" : "↗"}
                </span>
                <div className="text-white">{r.token}</div>
              </div>
              <span
                className={`
                  text-sm font-medium
                  ${
                    r.amount.startsWith("-")
                      ? "text-red-400"
                      : "text-emerald-400"
                  }
                `}
              >
                {r.amount}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs text-gray-300">
              <div className="space-y-0.5">
                <div className="text-muted">Value</div>
                <div className="text-white/90">{r.value}</div>
              </div>
              <div className="space-y-0.5">
                <div className="text-muted">Time</div>
                <div className="text-white/90">{r.time}</div>
              </div>
              <div className="col-span-2 space-y-0.5">
                <div className="text-muted">From/To</div>
                <div className="text-white/90 truncate">{r.from}</div>
              </div>
              <div className="col-span-2 space-y-0.5">
                <div className="text-muted">Hash</div>
                <div className="text-white/90 truncate">{r.hash}</div>
              </div>
            </div>

            <div className="flex justify-end">
              <span
                className={`
                  px-2 py-1 rounded-full text-[11px]
                  ${
                    r.status === "confirmed"
                      ? "bg-emerald-900 text-emerald-300"
                      : "bg-yellow-900 text-yellow-300"
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
      <div className="hidden lg:block overflow-x-auto">
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
                    r.type === "in" ? "text-emerald-300" : "text-red-300"
                  }
                >
                  {r.type === "in" ? "↙" : "↗"}
                </TD>
                <TD>{r.token}</TD>
                <TD
                  className={
                    r.amount.startsWith("-")
                      ? "text-red-400"
                      : "text-emerald-400"
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
                    className={`px-2 py-1 rounded-full text-xs ${
                      r.status === "confirmed"
                        ? "bg-emerald-900 text-emerald-300"
                        : "bg-yellow-900 text-yellow-300"
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
