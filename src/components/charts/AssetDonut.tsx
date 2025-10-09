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
          <Tooltip
            contentStyle={{
              background: "#0F1726",
              border: "1px solid #1D2939",
              borderRadius: 12,
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
