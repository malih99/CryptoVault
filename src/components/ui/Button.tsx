import { ButtonHTMLAttributes } from "react";
type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "outline";
};
export default function Button({
  variant = "outline",
  className = "",
  ...props
}: Props) {
  const styles =
    variant === "primary"
      ? "bg-emerald-600 text-white hover:bg-emerald-500"
      : "border border-border text-gray-200 hover:bg-white/5";
  return (
    <button
      {...props}
      className={`px-3 py-2 rounded-xl ${styles} ${className}`}
    />
  );
}
