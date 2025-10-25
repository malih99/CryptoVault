// src/features/dashboard/QuickActions.tsx
import Card from "../../components/ui/Card";
import { Send, Download, RefreshCcw, Plus } from "lucide-react";
import { useTranslation } from "react-i18next";

type Action = {
  key: "send" | "receive" | "swap" | "buy";
  icon: JSX.Element;
  labelKey: string;
  onClick?: () => void;
};

export default function QuickActions() {
  const { t } = useTranslation();

  const actions: Action[] = [
    {
      key: "send",
      icon: <Send size={18} />,
      labelKey: "dashboard.actions.send",
    },
    {
      key: "receive",
      icon: <Download size={18} />,
      labelKey: "dashboard.actions.receive",
    },
    {
      key: "swap",
      icon: <RefreshCcw size={18} />,
      labelKey: "dashboard.actions.swap",
    },
    { key: "buy", icon: <Plus size={18} />, labelKey: "dashboard.actions.buy" },
  ];

  const chipCls: Record<Action["key"], string> = {
    send:
      "text-rose-600 bg-rose-100 ring-rose-200 " +
      "dark:text-rose-300 dark:bg-rose-500/15 dark:ring-rose-500/20",
    receive:
      "text-emerald-600 bg-emerald-100 ring-emerald-200 " +
      "dark:text-emerald-300 dark:bg-emerald-500/15 dark:ring-emerald-500/20",
    swap:
      "text-cyan-600 bg-cyan-100 ring-cyan-200 " +
      "dark:text-cyan-300 dark:bg-cyan-500/15 dark:ring-cyan-500/20",
    buy:
      "text-violet-600 bg-violet-100 ring-violet-200 " +
      "dark:text-violet-300 dark:bg-violet-500/15 dark:ring-violet-500/20",
  };

  return (
    <Card className="p-5">
      <div className="text-slate-900 dark:text-slate-100 font-medium mb-4">
        {t("dashboard.quickActions")}
      </div>

      <div className="grid grid-cols-2 gap-3">
        {actions.map((a) => (
          <button
            key={a.key}
            onClick={a.onClick}
            className={[
              "group h-[84px] rounded-2xl border inline-flex flex-col items-center justify-center gap-2 transition",
              // Light
              "bg-slate-50 border-slate-200 hover:bg-slate-100",
              // Dark
              "dark:bg-slate-800/40 dark:border-slate-700 dark:hover:bg-slate-800/60",
              // Accessibility
              "focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300 dark:focus-visible:ring-emerald-500/40",
            ].join(" ")}
          >
            <span
              className={[
                "grid place-items-center h-8 w-8 rounded-xl ring-1 ring-inset transition",
                chipCls[a.key],
              ].join(" ")}
            >
              {a.icon}
            </span>
            <span className="text-sm text-slate-700 dark:text-slate-200">
              {t(a.labelKey)}
            </span>
          </button>
        ))}
      </div>
    </Card>
  );
}
