import { ButtonHTMLAttributes, forwardRef, ReactNode } from "react";
import { cn } from "../../lib/cn";

type Variant = "subtle" | "outline" | "ghost" | "danger";
type Size = "xs" | "sm";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: Size;
  children: ReactNode; // آیکون
};

const base =
  "inline-flex items-center justify-center rounded-lg transition " +
  "focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/60 disabled:opacity-50";

const sizes: Record<Size, string> = {
  xs: "h-7 w-7",
  sm: "h-8 w-8",
};

const variants: Record<Variant, string> = {
  subtle:
    "border border-slate-200 bg-white hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:hover:bg-slate-800",
  outline:
    "border border-slate-200 hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800",
  ghost: "hover:bg-slate-100 dark:hover:bg-slate-800",
  danger:
    "text-rose-600 hover:bg-rose-50 dark:text-rose-300 dark:hover:bg-rose-900/40",
};

export const IconButton = forwardRef<HTMLButtonElement, Props>(
  function IconButton(
    { className, variant = "subtle", size = "sm", children, ...rest },
    ref
  ) {
    return (
      <button
        ref={ref}
        className={cn(base, sizes[size], variants[variant], className)}
        {...rest}
      >
        {children}
      </button>
    );
  }
);
