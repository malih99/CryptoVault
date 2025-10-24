import { ReactNode } from "react";

export default function Card({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={
        "rounded-2xl border border-slate-200 dark:border-slate-800 " +
        "bg-white dark:bg-slate-900 shadow-sm " +
        className
      }
    >
      {children}
    </div>
  );
}
