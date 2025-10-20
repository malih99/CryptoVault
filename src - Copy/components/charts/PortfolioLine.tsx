import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { mockLine } from "../../lib/api/mock";

export function PortfolioLine() {
  return (
    <div className="h-56 sm:h-64 xl:h-[280px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={mockLine}
          margin={{ top: 12, right: 12, bottom: 8, left: 0 }}
        >
          {/* خطوط ریز پس‌زمینه */}
          <CartesianGrid
            stroke="rgba(255,255,255,0.06)"
            strokeDasharray="3 3"
            vertical
            horizontal
          />

          {/* محور افقی مینیمال مثل تصویر */}
          <XAxis
            dataKey="day"
            tick={{ fill: "#9CA3AF", fontSize: 10 }}
            axisLine={false}
            tickLine={false}
            interval="preserveStartEnd"
          />

          {/* محور عمودی مینیمال */}
          <YAxis
            width={40}
            tick={{ fill: "#9CA3AF", fontSize: 10 }}
            tickFormatter={(v: number) =>
              v >= 1000 ? `$${Math.round(v / 1000)}k` : `$${v}`
            }
            axisLine={false}
            tickLine={false}
            domain={["dataMin - 500", "dataMax + 500"]}
          />

          {/* Tooltip تیره و مینیمال */}
          <Tooltip
            cursor={{ stroke: "rgba(255,255,255,0.08)" }}
            contentStyle={{
              background: "#0F1726",
              border: "1px solid #1D2939",
              borderRadius: 12,
              color: "#E5E7EB",
              padding: "8px 10px",
            }}
            labelStyle={{ color: "#9CA3AF" }}
            formatter={(v: number) => [`$${v.toLocaleString()}`, "Value"]}
          />

          {/* گرادیان خیلی نرم زیر خط، مثل طرح */}
          <defs>
            <linearGradient id="pv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#22C55E" stopOpacity={0.18} />
              <stop offset="100%" stopColor="#22C55E" stopOpacity={0.02} />
            </linearGradient>
          </defs>

          <Line
            type="monotone"
            dataKey="value"
            stroke="#22C55E"
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 4 }}
            fill="url(#pv)"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
