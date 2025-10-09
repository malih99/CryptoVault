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
    <div className="rounded-2xl border border-border bg-[#0F1726] px-5 py-4 flex items-center justify-between">
      <div>
        <div className="text-sm text-gray-400">{label}</div>
        <div className="text-xl font-semibold text-white mt-1">{value}</div>
      </div>
      {right && <div className="text-gray-400">{right}</div>}
    </div>
  );
}
