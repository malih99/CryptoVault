export default function Stat({
  label,
  value,
  right,
}: {
  label: string;
  value: string | number;
  right?: React.ReactNode;
}) {
  return (
    <div className="stat">
      <div>
        <div className="stat__label">{label}</div>
        <div className="stat__value">{value}</div>
      </div>

      {right && (
        <div className="stat__right">
          {typeof right === "string" ? (
            <div className="kpi-chip">{right}</div>
          ) : (
            right
          )}
        </div>
      )}
    </div>
  );
}
