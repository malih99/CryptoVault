import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import { Send, Download, RefreshCcw, Plus } from "lucide-react";
import { useTranslation } from "react-i18next";
import type { ReactNode } from "react";

type ActionKey = "send" | "receive" | "swap" | "buy";

type Action = {
  key: ActionKey;
  icon: ReactNode;
  labelKey: string;
  onClick?: () => void;
};

export default function QuickActions() {
  const { t } = useTranslation();

  const actions: Action[] = [
    {
      key: "send",
      icon: <Send size={16} />,
      labelKey: "dashboard.actions.send",
    },
    {
      key: "receive",
      icon: <Download size={16} />,
      labelKey: "dashboard.actions.receive",
    },
    {
      key: "swap",
      icon: <RefreshCcw size={16} />,
      labelKey: "dashboard.actions.swap",
    },
    {
      key: "buy",
      icon: <Plus size={16} />,
      labelKey: "dashboard.actions.buy",
    },
  ];

  const chipCls: Record<ActionKey, string> = {
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
      <div className="mb-4 font-medium text-slate-900 dark:text-slate-100">
        {t("dashboard.quickActions")}
      </div>

      {/* دکمه‌های کامپکت، دو ستون */}
      <div className="grid grid-cols-2 gap-2">
        {actions.map((a) => (
          <Button
            key={a.key}
            variant="secondary"
            size="sm"
            onClick={a.onClick}
            className="flex w-full items-center justify-start gap-2"
            startIcon={
              <span
                className={[
                  "grid h-7 w-7 place-items-center rounded-lg ring-1 ring-inset text-[13px]",
                  chipCls[a.key],
                ].join(" ")}
              >
                {a.icon}
              </span>
            }
          >
            <span className="text-xs sm:text-[13px] text-slate-700 dark:text-slate-200">
              {t(a.labelKey)}
            </span>
          </Button>
        ))}
      </div>
    </Card>
  );
}
