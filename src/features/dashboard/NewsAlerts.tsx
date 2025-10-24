// src/features/dashboard/NewsAlerts.tsx
import Card from "../../components/ui/Card";
import { mockNews } from "../../lib/api/mock";
import { TrendingUp, Info, AlertTriangle } from "lucide-react";
import { useTranslation } from "react-i18next";

function Badge({ kind }: { kind: "trend" | "info" | "alert" }) {
  const map = {
    trend: {
      Icon: TrendingUp,
      cls: "bg-emerald-500/15 text-emerald-300 border-emerald-500/20",
    },
    info: {
      Icon: Info,
      cls: "bg-cyan-500/15 text-cyan-300 border-cyan-500/20",
    },
    alert: {
      Icon: AlertTriangle,
      cls: "bg-amber-500/15 text-amber-300 border-amber-500/20",
    },
  } as const;
  const { Icon, cls } = map[kind];
  return (
    <div className={`h-8 w-8 rounded-xl grid place-items-center border ${cls}`}>
      <Icon size={16} />
    </div>
  );
}

export default function NewsAlerts() {
  const { t } = useTranslation();

  return (
    <Card className="p-5">
      <div className="flex items-center justify-between mb-4">
        <div className="text-slate-100 dark:text-slate-100 font-medium">
          {t("dashboard.newsAlerts")}
        </div>
        <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/20">
          3 {t("dashboard.new")}
        </span>
      </div>

      <ul className="space-y-4">
        {mockNews.map((n) => (
          <li key={n.id} className="flex items-start gap-3">
            <Badge kind={n.kind as any} />
            <div>
              <div className="text-slate-100">{n.title}</div>
              <div className="text-xs text-slate-400">{n.desc}</div>
              <div className="text-xs text-slate-500 mt-1">{n.time}</div>
            </div>
          </li>
        ))}
      </ul>
    </Card>
  );
}
