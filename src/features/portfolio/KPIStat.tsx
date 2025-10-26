import Card from "../../components/ui/Card";
export default function KPIStat({
  label,
  value,
  change,
}: {
  label: string;
  value: string;
  change: string;
}) {
  const neg = change.trim().startsWith("-");
  return (
    <Card className="p-4 sm:p-5 text-center sm:text-left">
      <div className="text-sm text-slate-500 dark:text-slate-400">{label}</div>
      <div className="mt-2 text-lg sm:text-xl font-semibold text-slate-900 dark:text-white">
        {value}
      </div>
      <div
        className={`mt-1 text-xs sm:text-sm ${
          neg ? "text-red-400" : "text-emerald-400"
        }`}
      >
        {change}
      </div>
    </Card>
  );
}
