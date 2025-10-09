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
      className={`rounded-2xl border border-border bg-[#0F1726] ${className}`}
    >
      {children}
    </div>
  );
}
