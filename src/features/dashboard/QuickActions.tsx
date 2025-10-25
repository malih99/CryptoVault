import Card from "../../components/ui/Card";
import { Send, Download, RefreshCcw, Plus } from "lucide-react";
import { useTranslation } from "react-i18next";

type Action = {
  icon: JSX.Element;
  labelKey: string;
  className: string;
  onClick: () => void;
};

export default function QuickActions() {
  const { t } = useTranslation();

  const actions: Action[] = [
    {
      icon: <Send size={18} />,
      labelKey: "dashboard.actions.send",
      className:
        "bg-rose-500/10 text-rose-700 border-rose-200 dark:bg-rose-500/15 dark:text-rose-300 dark:border-rose-500/20",
      onClick: () => {},
    },
    {
      icon: <Download size={18} />,
      labelKey: "dashboard.actions.receive",
      className:
        "bg-emerald-500/10 text-emerald-700 border-emerald-200 dark:bg-emerald-500/15 dark:text-emerald-300 dark:border-emerald-500/20",
      onClick: () => {},
    },
    {
      icon: <RefreshCcw size={18} />,
      labelKey: "dashboard.actions.swap",
      className:
        "bg-cyan-500/10 text-cyan-700 border-cyan-200 dark:bg-cyan-500/15 dark:text-cyan-300 dark:border-cyan-500/20",
      onClick: () => {},
    },
    {
      icon: <Plus size={18} />,
      labelKey: "dashboard.actions.buy",
      className:
        "bg-violet-500/10 text-violet-700 border-violet-200 dark:bg-violet-500/15 dark:text-violet-300 dark:border-violet-500/20",
      onClick: () => {},
    },
  ];

  return (
    <Card className="p-5">
      <div className="text-slate-900 dark:text-slate-100 font-medium mb-4">
        {t("dashboard.quickActions")}
      </div>

      <div className="grid grid-cols-2 gap-3">
        {actions.map((a, i) => (
          <button
            key={i}
            onClick={a.onClick}
            className={`h-[84px] rounded-2xl border ${a.className} inline-flex flex-col items-center justify-center gap-1 hover:opacity-90 transition`}
          >
            {a.icon}
            <span className="text-sm text-slate-800 dark:text-slate-100">
              {t(a.labelKey)}
            </span>
          </button>
        ))}
      </div>
    </Card>
  );
}
