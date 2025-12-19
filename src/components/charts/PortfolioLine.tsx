import { useEffect, useMemo, useState } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

type RangeKey = "7d" | "30d" | "90d";

type Point = {
  day: string;
  value: number;
};

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

type Props = {
  range: RangeKey;
  data: Point[];
};

export function PortfolioLine({ range, data }: Props) {
  const isDark = useDark();

  const filtered = useMemo(() => {
    const total = data.length;
    if (!total) return [];

    if (range === "7d") {
      return data.slice(Math.max(0, total - 7));
    }
    if (range === "30d") {
      return data.slice(Math.max(0, total - 30));
    }

    // 90d و دیگر مقادیر → فعلاً کل دیتا
    return data;
  }, [data, range]);

  // اگر دیتایی نداریم، اسکلت ساده
  if (!filtered.length) {
    return (
      <div className="flex h-56 items-center justify-center text-xs text-slate-400 sm:h-64 xl:h-[280px]">
        No data for the selected range.
      </div>
    );
  }

  return (
    <div className="h-56 sm:h-64 xl:h-[280px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={filtered}
          margin={{ top: 12, right: 12, bottom: 8, left: 0 }}
        >
          <CartesianGrid
            stroke={
              isDark ? "rgba(148,163,184,0.22)" : "rgba(148,163,184,0.18)"
            }
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
