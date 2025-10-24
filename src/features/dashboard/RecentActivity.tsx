// src/features/dashboard/RecentActivity.tsx
import Card from "../../components/ui/Card";
import { mockRecentActivity } from "../../lib/api/mock";
import { ArrowDownLeft, ArrowUpRight, RefreshCcw } from "lucide-react";
import { useTranslation } from "react-i18next";

function Icon({ type }: { type: "receive" | "send" | "swap" }) {
  const map = {
    receive: <ArrowDownLeft size={16} />,
    send: <ArrowUpRight size={16} />,
    swap: <RefreshCcw size={16} />,
  } as const;
  return map[type];
}

export default function RecentActivity() {
  const { t, i18n } = useTranslation();

  return (
    <Card className="p-5">
      <div className="text-slate-100 dark:text-slate-100 font-medium mb-4">
        {t("dashboard.recentActivity")}
      </div>
      <ul className="space-y-4">
        {mockRecentActivity.map((row) => (
          <li key={row.id} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div
                className={
                  "h-9 w-9 rounded-xl grid place-items-center " +
                  (row.type === "send"
                    ? "bg-rose-500/15 text-rose-400 border border-rose-500/20"
                    : row.type === "swap"
                    ? "bg-cyan-500/15 text-cyan-300 border border-cyan-500/20"
                    : "bg-emerald-500/15 text-emerald-300 border border-emerald-500/20")
                }
              >
                <Icon type={row.type} />
              </div>
              <div>
                <div className="text-sm text-slate-100">{row.title}</div>
                <div className="text-xs text-slate-400">{row.time}</div>
              </div>
            </div>

            <div
              className={
                "text-sm font-medium " +
                (row.amount >= 0 ? "text-emerald-400" : "text-rose-400")
              }
            >
              {row.amount >= 0 ? "+" : ""}
              {row.amount.toLocaleString(
                i18n.language === "fa" ? "fa-IR" : "en-US"
              )}
            </div>
          </li>
        ))}
      </ul>
    </Card>
  );
}
