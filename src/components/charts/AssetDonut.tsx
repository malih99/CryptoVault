import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

export default function AssetDonut({
  data,
}: {
  data: { name: string; value: number; color: string }[];
}) {
  const isDark = document.documentElement.classList.contains("dark");
  const tipBg = isDark ? "rgb(15 23 42)" : "#ffffff"; // slate-900 در دارک
  const tipBorder = isDark ? "rgba(255,255,255,0.08)" : "#e5e7eb";
  const tipText = isDark ? "#e5e7eb" : "#0f172a";
  const tipLabel = isDark ? "#9ca3af" : "#475569";

  return (
    <div className="h-[260px]">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie data={data} dataKey="value" innerRadius={70} outerRadius={100}>
            {data.map((d, i) => (
              <Cell key={i} fill={d.color} />
            ))}
          </Pie>
          <Tooltip
            cursor={{ stroke: "rgba(255,255,255,0.06)" }}
            contentStyle={{
              background: tipBg,
              border: `1px solid ${tipBorder}`,
              borderRadius: 12,
              boxShadow:
                "0 10px 20px -10px rgba(0,0,0,0.4), 0 2px 6px rgba(0,0,0,0.25)",
              color: tipText,
            }}
            labelStyle={{ color: tipLabel }}
            formatter={(v: number, n: string) => [
              `$${Number(v).toLocaleString()}`,
              n,
            ]}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
