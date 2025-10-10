export default function Stat({
  label,
  value,
  right,
}: {
  label: string;
  value: string;
  right?: React.ReactNode;
}) {
  return (
    <div className="h-[84px] sm:h-[96px] rounded-2xl border border-border bg-card px-5 py-4 flex items-center justify-between">
      <div>
        <div className="text-[13px] sm:text-sm text-gray-400">{label}</div>
        <div className="text-lg sm:text-xl font-semibold text-white mt-1">
          {value}
        </div>
      </div>
      {right && <div className="text-gray-400 shrink-0">{right}</div>}
    </div>
  );
}
