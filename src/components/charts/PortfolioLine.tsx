import { useEffect, useState } from "react";
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

function useDark() {
  const [isDark, set] = useState(false);
  useEffect(() => {
    const el = document.documentElement;
    const apply = () => set(el.classList.contains("dark"));
    apply();
    const obs = new MutationObserver(apply);
    obs.observe(el, { attributes: true, attributeFilter: ["class"] });
    return () => obs.disconnect();
  }, []);
  return isDark;
}

export function PortfolioLine() {
  const isDark = useDark(); // ✅ فقط داخل کامپوننت

  return (
    <div className="h-56 sm:h-64 xl:h-[280px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={mockLine}
          margin={{ top: 12, right: 12, bottom: 8, left: 0 }}
        >
          <CartesianGrid
            stroke="rgba(15,23,42,0.08)"
            strokeDasharray="3 3"
            vertical
            horizontal
          />
          <XAxis
            dataKey="day"
            tick={{ fill: "#64748B", fontSize: 11 }}
            axisLine={false}
            tickLine={false}
            interval="preserveStartEnd"
          />
          <YAxis
            width={44}
            tick={{ fill: "#64748B", fontSize: 11 }}
            tickFormatter={(v: number) =>
              v >= 1000 ? `$${Math.round(v / 1000)}k` : `$${v}`
            }
            axisLine={false}
            tickLine={false}
            domain={["dataMin - 500", "dataMax + 500"]}
          />
          <Tooltip
            cursor={{ stroke: "rgba(15,23,42,0.08)" }}
            contentStyle={{
              background: isDark ? "#0B1220" : "#ffffff",
              border: `1px solid ${isDark ? "#1f2937" : "#E2E8F0"}`,
              borderRadius: 12,
              color: isDark ? "#F8FAFC" : "#0F172A",
              padding: "8px 10px",
              boxShadow: isDark
                ? "0 8px 24px rgba(0,0,0,0.2)"
                : "0 8px 24px rgba(15,23,42,0.08)",
            }}
          />
          <defs>
            <linearGradient id="pv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#10B981" stopOpacity={0.2} />
              <stop offset="100%" stopColor="#10B981" stopOpacity={0.03} />
            </linearGradient>
          </defs>
          <Line
            type="monotone"
            dataKey="value"
            stroke="#10B981"
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
