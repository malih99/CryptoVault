import { ButtonHTMLAttributes, forwardRef, ReactNode } from "react";
import { cn } from "../../lib/cn";

type Variant =
  | "primary"
  | "secondary"
  | "outline"
  | "ghost"
  | "danger"
  | "subtle";
type Size = "xs" | "sm" | "md";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: Size;
  fullWidth?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  loading?: boolean;
};

const base =
  "inline-flex items-center justify-center gap-1.5 rounded-xl font-medium transition " +
  "disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/60";

const sizes: Record<Size, string> = {
  xs: "px-2 py-1 text-[11px]",
  sm: "px-2.5 py-1.5 text-xs",
  md: "px-3.5 py-2 text-sm",
};

const variants: Record<Variant, string> = {
  primary: "bg-emerald-600 text-white hover:bg-emerald-700",
  secondary:
    "bg-slate-900 text-white hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100",
  outline:
    "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800",
  ghost:
    "text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800",
  danger: "bg-rose-600 text-white hover:bg-rose-700",
  subtle:
    "border border-slate-200 bg-white/70 text-slate-700 hover:bg-white dark:border-slate-700 dark:bg-slate-900/60 dark:text-slate-200 dark:hover:bg-slate-800",
};

export const Button = forwardRef<HTMLButtonElement, Props>(function Button(
  {
    className,
    variant = "outline",
    size = "sm",
    fullWidth,
    leftIcon,
    rightIcon,
    loading,
    children,
    ...rest
  },
  ref
) {
  return (
    <button
      ref={ref}
      className={cn(
        base,
        sizes[size],
        variants[variant],
        fullWidth && "w-full",
        className
      )}
      {...rest}
    >
      {leftIcon && (
        <span className={cn(size === "xs" ? "h-3.5 w-3.5" : "h-4 w-4")}>
          {leftIcon}
        </span>
      )}
      {loading ? <span className="animate-pulse">Loading…</span> : children}
      {rightIcon && (
        <span className={cn(size === "xs" ? "h-3.5 w-3.5" : "h-4 w-4")}>
          {rightIcon}
        </span>
      )}
    </button>
  );
});
