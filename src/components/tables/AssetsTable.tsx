import Card from "../../components/ui/Card";
import { T, THEAD, TBODY, TR, TH, TD } from "../../components/ui/Table";
import { mockHoldings } from "../../lib/api/mock";

export default function AssetsTable() {
  return (
    <Card className="p-5">
      <div className="text-slate-900 font-medium mb-3">Assets</div>

      {/* Mobile (cards) */}
      <ul className="sm:hidden space-y-3">
        {mockHoldings.map((r) => (
          <li
            key={r.sym}
            className="rounded-xl border border-slate-200 bg-white shadow-sm p-3"
          >
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-full bg-emerald-500 grid place-items-center text-xs font-bold text-white">
                {r.sym[0]}
              </div>
              <div className="flex-1">
                <div className="text-slate-900 font-medium">{r.sym}</div>
                <div className="text-xs text-slate-500">{r.name}</div>
              </div>
              <div
                className={
                  "text-xs font-medium " +
                  (r.change >= 0 ? "text-emerald-600" : "text-rose-600")
                }
              >
                {r.change >= 0 ? "↗" : "↘"} {r.change}%
              </div>
            </div>

            <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
              <div className="rounded-lg bg-slate-50 p-2">
                <div className="text-xs text-slate-500">Price</div>
                <div className="text-slate-800">
                  ${r.price.toLocaleString()}
                </div>
              </div>
              <div className="rounded-lg bg-slate-50 p-2">
                <div className="text-xs text-slate-500">Holdings</div>
                <div className="text-slate-800">{r.qty}</div>
              </div>
              <div className="rounded-lg bg-slate-50 p-2 col-span-2">
                <div className="text-xs text-slate-500">Value</div>
                <div className="text-slate-800">
                  ${r.value.toLocaleString()}
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>

      {/* Desktop (table) */}
      <div className="hidden sm:block overflow-x-auto">
        <T className="min-w-[720px]">
          <THEAD>
            <TR>
              <TH className="pl-2">Token</TH>
              <TH>Price</TH>
              <TH>Holdings</TH>
              <TH>Value</TH>
              <TH className="text-right pr-2">24h Change</TH>
            </TR>
          </THEAD>
          <TBODY>
            {mockHoldings.map((r) => (
              <TR key={r.sym}>
                <TD className="pl-2">
                  <div className="flex items-center gap-3">
                    <div className="h-7 w-7 rounded-full bg-emerald-500 grid place-items-center text-xs font-bold text-white">
                      {r.sym[0]}
                    </div>
                    <div>
                      <div className="text-slate-900 font-medium">{r.sym}</div>
                      <div className="text-xs text-slate-500">{r.name}</div>
                    </div>
                  </div>
                </TD>
                <TD>${r.price.toLocaleString()}</TD>
                <TD>{r.qty}</TD>
                <TD>${r.value.toLocaleString()}</TD>
                <TD className="text-right pr-2">
                  <span
                    className={
                      r.change >= 0 ? "text-emerald-600" : "text-rose-600"
                    }
                  >
                    {r.change >= 0 ? "↗" : "↘"} {r.change}%
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
