import Card from "../../components/ui/Card";

export default function AssetRow({
  name,
  sym,
  invested,
  current,
  pnl,
  color,
}: {
  name: string;
  sym: string;
  invested: number;
  current: number;
  pnl: number;
  color: string;
}) {
  const pos = pnl >= 0;

  return (
    <Card className="px-4 py-3">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <span
            className="h-3 w-3 rounded-full"
            style={{ backgroundColor: color }}
          />
          <div>
            <div className="text-sm font-medium text-slate-900 dark:text-slate-100">
              {name}
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400">
              {sym}
            </div>
          </div>
        </div>

        <div className="flex flex-1 items-center justify-between gap-6 sm:justify-end">
          <div className="text-xs text-slate-500 dark:text-slate-400">
            Invested
          </div>
          <div className="text-sm font-medium text-slate-900 dark:text-white">
            ${invested.toLocaleString()}
          </div>
          <div className="text-xs text-slate-500 dark:text-slate-400">
            Current Value
          </div>
          <div className="text-sm font-medium text-slate-900 dark:text-white">
            ${current.toLocaleString()}
          </div>
          <div
            className={`text-sm ${pos ? "text-emerald-400" : "text-red-400"}`}
          >
            {pos ? "+" : "-"}${Math.abs(pnl).toLocaleString()}
          </div>
        </div>
      </div>
    </Card>
  );
}
