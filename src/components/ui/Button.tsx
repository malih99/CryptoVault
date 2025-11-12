import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost" | "outline" | "danger";
type Size = "xs" | "sm" | "md";

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: Size;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  iconOnly?: boolean;
};

function variantClasses(variant: Variant): string {
  switch (variant) {
    case "primary":
      return [
        "bg-emerald-600 text-white",
        "hover:bg-emerald-700",
        "dark:bg-emerald-500 dark:hover:bg-emerald-600",
      ].join(" ");
    case "secondary":
      return [
        "bg-slate-100 text-slate-900 border border-slate-200",
        "hover:bg-slate-200",
        "dark:bg-slate-800 dark:text-slate-100 dark:border-slate-600 dark:hover:bg-slate-700",
      ].join(" ");
    case "outline":
      return [
        "bg-transparent border border-slate-200 text-slate-700",
        "hover:bg-slate-50",
        "dark:border-slate-600 dark:text-slate-200 dark:hover:bg-slate-800",
      ].join(" ");
    case "danger":
      return [
        "bg-rose-600 text-white",
        "hover:bg-rose-700",
        "dark:bg-rose-500 dark:hover:bg-rose-600",
      ].join(" ");
    case "ghost":
    default:
      return [
        "bg-transparent text-slate-700",
        "hover:bg-slate-100",
        "dark:text-slate-200 dark:hover:bg-slate-800",
      ].join(" ");
  }
}

function sizeClasses(size: Size, iconOnly: boolean): string {
  if (iconOnly) {
    switch (size) {
      case "xs":
        return "h-7 w-7 text-[11px]";
      case "sm":
        return "h-8 w-8 text-sm";
      case "md":
      default:
        return "h-9 w-9 text-sm";
    }
  }

  switch (size) {
    case "xs":
      return "h-7 px-2 text-[11px]";
    case "sm":
      return "h-8 px-3 text-sm";
    case "md":
    default:
      return "h-9 px-3.5 text-sm";
  }
}

export default function Button({
  variant = "primary",
  size = "md",
  startIcon,
  endIcon,
  iconOnly,
  className,
  type,
  children,
  ...rest
}: ButtonProps) {
  const isIconOnly = !!iconOnly || (!children && !!(startIcon || endIcon));

  const base = [
    "inline-flex items-center justify-center gap-1.5",
    "rounded-xl font-medium",
    "transition-colors",
    "focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/60",
    "disabled:opacity-60 disabled:cursor-not-allowed",
    "whitespace-nowrap",
  ].join(" ");

  const classes = [
    base,
    variantClasses(variant),
    sizeClasses(size, isIconOnly),
    isIconOnly ? "" : "",
    className ?? "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button type={type ?? "button"} className={classes} {...rest}>
      {startIcon && (
        <span className="inline-flex items-center justify-center">
          {startIcon}
        </span>
      )}
      {children && !isIconOnly && <span>{children}</span>}
      {endIcon && (
        <span className="inline-flex items-center justify-center">
          {endIcon}
        </span>
      )}
    </button>
  );
}

export type IconButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  /** توضیح متنی برای screen reader */
  srLabel: string;
  size?: Size;
  variant?: Variant;
};

export function IconButton({
  srLabel,
  children,
  size = "sm",
  variant = "ghost",
  className,
  ...rest
}: IconButtonProps) {
  return (
    <Button
      {...rest}
      size={size}
      variant={variant}
      iconOnly
      aria-label={srLabel}
      className={["rounded-full", className ?? ""].join(" ")}
    >
      {children}
    </Button>
  );
}
