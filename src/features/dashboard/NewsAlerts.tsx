import Card from "../../components/ui/Card";
import { TrendingUp, Info, AlertTriangle } from "lucide-react";
import { useTranslation } from "react-i18next";
import type { NewsRow } from "../../features/dashboard/api";

function Badge({ kind }: { kind: "trend" | "info" | "alert" }) {
  const map = {
    trend: {
      Icon: TrendingUp,
      cls: "bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-500/15 dark:text-emerald-300 dark:border-emerald-500/20",
    },
    info: {
      Icon: Info,
      cls: "bg-cyan-100 text-cyan-700 border-cyan-200 dark:bg-cyan-500/15 dark:text-cyan-300 dark:border-cyan-500/20",
    },
    alert: {
      Icon: AlertTriangle,
      cls: "bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-500/15 dark:text-amber-300 dark:border-amber-500/20",
    },
  } as const;
  const { Icon, cls } = map[kind];
  return (
    <div className={`grid h-8 w-8 place-items-center rounded-xl border ${cls}`}>
      <Icon size={16} />
    </div>
  );
}

type Props = {
  items: NewsRow[];
};

export default function NewsAlerts({ items }: Props) {
  const { t } = useTranslation();

  return (
    <Card className="p-5">
      <div className="mb-4 flex items-center justify-between">
        <div className="font-medium text-slate-900 dark:text-slate-100">
          {t("dashboard.newsAlerts")}
        </div>
        <span
          className="rounded-full border border-emerald-200 bg-emerald-100 px-2 py-0.5 text-xs
                     text-emerald-700 dark:border-emerald-500/20 dark:bg-emerald-500/15 dark:text-emerald-300"
        >
          {items.length} {t("dashboard.new")}
        </span>
      </div>

      <ul className="space-y-4">
        {items.map((n) => (
          <li key={n.id} className="flex items-start gap-3">
            <Badge kind={n.kind as "trend" | "info" | "alert"} />
            <div>
              <div className="text-slate-800 dark:text-slate-100">
                {n.title}
              </div>
              <div className="text-xs text-slate-600 dark:text-slate-400">
                {n.desc}
              </div>
              <div className="mt-1 text-xs text-slate-500">{n.time}</div>
            </div>
          </li>
        ))}
      </ul>
    </Card>
  );
}
