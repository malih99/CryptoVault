import { ReactNode } from "react";

export default function SettingRow({
  label,
  helper,
  children,
  borderTop = true,
}: {
  label: string;
  helper?: string;
  children: ReactNode;
  borderTop?: boolean;
}) {
  return (
    <div
      className={`flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between ${
        borderTop ? "pt-4 border-t border-slate-100 dark:border-slate-800" : ""
      }`}
    >
      <div className="space-y-0.5">
        <div className="text-sm text-slate-900 dark:text-slate-100">
          {label}
        </div>
        {helper && (
          <div className="text-xs text-slate-500 dark:text-slate-400">
            {helper}
          </div>
        )}
      </div>
      <div className="flex items-center gap-3">{children}</div>
    </div>
  );
}
