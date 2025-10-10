import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { mockLine } from "../../lib/api/mock";

export function PortfolioLine() {
  return (
    <div className="h-56 sm:h-64 xl:h-[280px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={mockLine}
          margin={{ top: 8, right: 8, left: 0, bottom: 0 }}
        >
          <XAxis dataKey="day" hide />
          <YAxis hide />
          <Tooltip
            cursor={{ stroke: "rgba(255,255,255,0.05)" }}
            contentStyle={{
              background: "#0F1726",
              border: "1px solid #1D2939",
              borderRadius: 12,
              color: "#E5E7EB",
            }}
            labelStyle={{ color: "#9CA3AF" }}
          />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#22C55E"
            dot={false}
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
