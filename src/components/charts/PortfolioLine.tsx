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
    <div className="h-[280px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={mockLine}>
          <XAxis dataKey="day" hide />
          <YAxis hide />
          <Tooltip
            contentStyle={{
              background: "#0F1726",
              border: "1px solid #1D2939",
              borderRadius: 12,
            }}
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
