import type { ReactNode } from "react";

type BaseProps = { children: ReactNode; className?: string };

export function T({ children, className = "" }: BaseProps) {
  return <table className={"w-full " + className}>{children}</table>;
}

export function THEAD({ children, className = "" }: BaseProps) {
  return (
    <thead className={"bg-slate-50 dark:bg-slate-800/60 " + className}>
      {children}
    </thead>
  );
}

export function TBODY({ children, className = "" }: BaseProps) {
  return <tbody className={className}>{children}</tbody>;
}

export function TR({ children, className = "" }: BaseProps) {
  return (
    <tr
      className={
        "border-t border-slate-200 dark:border-slate-800 " +
        "hover:bg-slate-50 dark:hover:bg-slate-800/40 " +
        className
      }
    >
      {children}
    </tr>
  );
}

export function TH({ children, className = "" }: BaseProps) {
  return (
    <th
      className={
        "text-left font-medium text-slate-600 dark:text-slate-300 py-3 " +
        className
      }
    >
      {children}
    </th>
  );
}

export function TD({ children, className = "" }: BaseProps) {
  return (
    <td
      className={"py-4 text-sm text-slate-700 dark:text-slate-200 " + className}
    >
      {children}
    </td>
  );
}
