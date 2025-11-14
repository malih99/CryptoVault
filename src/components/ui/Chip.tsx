import { ReactNode } from "react";
import { cn } from "../../lib/cn";

type Tone = "success" | "warning" | "neutral";

export function Chip({
  tone = "neutral",
  children,
}: {
  tone?: Tone;
  children: ReactNode;
}) {
  const map: Record<Tone, string> = {
    success:
      "bg-emerald-50 text-emerald-700 dark:bg-emerald-900/70 dark:text-emerald-300",
    warning:
      "bg-amber-50 text-amber-700 dark:bg-amber-900/70 dark:text-amber-300",
    neutral:
      "bg-slate-100 text-slate-700 dark:bg-slate-800/70 dark:text-slate-300",
  };
  return (
    <span className={cn("rounded-full px-2 py-0.5 text-xs", map[tone])}>
      {children}
    </span>
  );
}
