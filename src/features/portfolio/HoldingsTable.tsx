import Card from "../../components/ui/Card";

export default function HoldingsTable({
  rows,
}: {
  rows: {
    sym: string;
    name: string;
    price: number;
    qty: number;
    value: number;
    change: number;
    share: number;
  }[];
}) {
  return (
    <Card className="p-0 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[720px]">
          <thead className="bg-white/40 dark:bg-white/5">
            <tr className="text-left text-sm text-slate-600 dark:text-slate-300">
              <th className="py-3 px-4">Asset</th>
              <th className="py-3 px-4">Price</th>
              <th className="py-3 px-4">Holdings</th>
              <th className="py-3 px-4">Value</th>
              <th className="py-3 px-4">24h Change</th>
              <th className="py-3 px-4">Profit/Loss</th>
              <th className="py-3 px-4">Allocation</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => {
              // نمایشی: یک PnL تقریبی از روی قیمت فعلی و change
              const prevPrice = r.price / (1 + r.change / 100);
              const prevValue = prevPrice * r.qty;
              const pnlAbs = r.value - prevValue;
              const pos = pnlAbs >= 0;

              return (
                <tr
                  key={r.sym}
                  className="border-t border-slate-200 dark:border-white/10 hover:bg-white/50 dark:hover:bg-white/5"
                >
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <div className="grid h-7 w-7 place-items-center rounded-full bg-emerald-500/90 text-black font-bold">
                        {r.sym[0]}
                      </div>
                      <div>
                        <div className="text-slate-900 dark:text-white">
                          {r.name}
                        </div>
                        <div className="text-xs text-slate-500 dark:text-slate-400">
                          {r.sym}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4">${r.price.toLocaleString()}</td>
                  <td className="py-3 px-4">{r.qty.toFixed(4)}</td>
                  <td className="py-3 px-4">${r.value.toLocaleString()}</td>
                  <td
                    className={`py-3 px-4 ${
                      r.change >= 0 ? "text-emerald-400" : "text-red-400"
                    }`}
                  >
                    {r.change >= 0 ? "↗" : "↘"} {Math.abs(r.change).toFixed(2)}%
                  </td>
                  <td
                    className={`py-3 px-4 ${
                      pos ? "text-emerald-400" : "text-red-400"
                    }`}
                  >
                    {pos ? "+" : "-"}${Math.abs(pnlAbs).toFixed(0)}
                  </td>
                  <td className="py-3 px-4">
                    <div className="h-1.5 w-24 rounded-full bg-white/30 dark:bg-white/10">
                      <div
                        className="h-1.5 rounded-full bg-emerald-400"
                        style={{ width: `${r.share}%` }}
                      />
                    </div>
                    <div className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                      {r.share}%
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
