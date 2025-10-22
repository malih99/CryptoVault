import Card from "../../components/ui/Card";
import { T, THEAD, TBODY, TR, TH, TD } from "../../components/ui/Table";
import { mockHoldings } from "../../lib/api/mock";

export default function AssetsTable() {
  return (
    <Card className="p-5">
      <div className="text-slate-900 font-medium mb-3">Assets</div>
      <div className="overflow-x-auto">
        <T className="min-w-[720px]">
          <THEAD>
            <TR>
              <TH className="pl-2">Token</TH>
              <TH className="hidden sm:table-cell">Price</TH>
              <TH>Holdings</TH>
              <TH>Value</TH>
              <TH className="text-right pr-2 hidden md:table-cell">
                24h Change
              </TH>
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
                <TD className="hidden sm:table-cell">
                  ${r.price.toLocaleString()}
                </TD>
                <TD>{r.qty}</TD>
                <TD>${r.value.toLocaleString()}</TD>
                <TD className="text-right pr-2 hidden md:table-cell">
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
