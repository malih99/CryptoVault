import { useEffect, useRef } from "react";
import React from "react";
type Props = {
  open: boolean;
  onClose: () => void;
  className?: string;
  children: React.ReactNode;
  ariaLabel?: string;
};

export default function Modal({
  open,
  onClose,
  className = "",
  children,
  ariaLabel = "dialog",
}: Props) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    // فوکوس روی پنل
    const id = setTimeout(() => panelRef.current?.focus(), 0);

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
      clearTimeout(id);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 px-3"
      role="dialog"
      aria-modal="true"
      aria-label={ariaLabel}
      onMouseDown={onClose}
    >
      <div
        ref={panelRef}
        tabIndex={-1}
        onMouseDown={(e) => e.stopPropagation()}
        className={
          "w-full max-w-md rounded-2xl border border-slate-200 bg-white p-5 shadow-xl outline-none dark:border-slate-700 dark:bg-slate-900 " +
          className
        }
      >
        {children}
      </div>
    </div>
  );
}
