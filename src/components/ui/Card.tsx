export default function Card({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-2xl border border-border bg-card shadow-[0_1px_0_0_rgba(255,255,255,0.02)_inset,0_0_0_1px_rgba(0,0,0,0.2)] ${className}`}
    >
      {children}
    </div>
  );
}
