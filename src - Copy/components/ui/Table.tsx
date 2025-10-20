import { ReactNode } from "react";

type BaseProps = {
  children: ReactNode;
  className?: string;
};

export function T({ children, className = "" }: BaseProps) {
  return <table className={`w-full ${className}`}>{children}</table>;
}

export function THEAD({ children, className = "" }: BaseProps) {
  return <thead className={`bg-white/5 ${className}`}>{children}</thead>;
}

export function TBODY({ children, className = "" }: BaseProps) {
  return <tbody className={className}>{children}</tbody>;
}

export function TR({ children, className = "" }: BaseProps) {
  return (
    <tr className={`border-t border-border hover:bg-white/5 ${className}`}>
      {children}
    </tr>
  );
}

export function TH({ children, className = "" }: BaseProps) {
  return (
    <th className={`text-left font-medium text-gray-300 py-3 ${className}`}>
      {children}
    </th>
  );
}

export function TD({ children, className = "" }: BaseProps) {
  return (
    <td className={`py-4 text-sm text-gray-200 ${className}`}>{children}</td>
  );
}
