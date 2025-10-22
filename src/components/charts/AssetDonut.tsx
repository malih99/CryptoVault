import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

export default function AssetDonut({
  data,
}: {
  data: { name: string; value: number; color: string }[];
}) {
  return (
    <div className="h-[260px]">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie data={data} dataKey="value" innerRadius={70} outerRadius={100}>
            {data.map((d, i) => (
              <Cell key={i} fill={d.color} />
            ))}
          </Pie>

          {/* Light tooltip */}
          <Tooltip
            cursor={{ stroke: "rgba(2,6,23,0.08)" }}
            contentStyle={{
              background: "#ffffff",
              border: "1px solid #e5e7eb",
              borderRadius: 12,
              boxShadow:
                "0 10px 20px -10px rgba(2,6,23,0.12), 0 2px 6px rgba(2,6,23,0.06)",
              color: "#0f172a",
            }}
            labelStyle={{ color: "#475569" }}
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
