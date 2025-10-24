import { ReactNode } from "react";
import { useTranslation } from "react-i18next";

export default function Stat({
  label,
  value,
  right,
}: {
  label: string;
  value: string | number;
  right?: ReactNode;
}) {
  const { i18n } = useTranslation();

  return (
    <div className="h-[88px] sm:h-[96px] rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm px-5 py-4 flex items-center justify-between">
      <div>
        <div className="text-[13px] sm:text-sm text-slate-500 dark:text-slate-400">
          {label}
        </div>
        <div className="text-xl font-semibold text-slate-900 dark:text-slate-100 mt-1">
          {typeof value === "number" && i18n.language === "fa"
            ? new Intl.NumberFormat("fa-IR").format(value)
            : value}
        </div>
      </div>

      {right && (
        <div className="shrink-0">
          {typeof right === "string" ? (
            <span className="inline-flex items-center rounded-lg text-sm px-2 py-1 border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 text-slate-600 dark:text-slate-300">
              {right}
            </span>
          ) : (
            right
          )}
        </div>
      )}
    </div>
  );
}
