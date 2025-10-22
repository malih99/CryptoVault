import { ReactNode } from "react";

export default function Stat({
  label,
  value,
  right,
}: {
  label: string;
  value: string | number;
  right?: ReactNode;
}) {
  return (
    <div className="h-[88px] sm:h-[96px] rounded-2xl border border-slate-200 bg-white shadow-sm px-5 py-4 flex items-center justify-between">
      <div>
        <div className="text-[13px] sm:text-sm text-slate-500">{label}</div>
        <div className="text-xl font-semibold text-slate-900 mt-1">{value}</div>
      </div>

      {right && (
        <div className="shrink-0">
          {typeof right === "string" ? (
            <span className="inline-flex items-center rounded-lg text-sm px-2 py-1 border border-slate-200 bg-slate-50 text-slate-600">
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
