import { useMemo, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import Card from "../ui/Card";
import { mockLine } from "../../lib/api/mock";

const tabs = ["1M", "3M", "1Y", "All"] as const;
type Tab = (typeof tabs)[number];

function gen(tab: Tab) {
  if (tab === "1M") return mockLine;
  if (tab === "3M") return [...mockLine, ...mockLine].slice(-60);
  if (tab === "1Y")
    return Array.from({ length: 365 }, (_, i) => ({
      day: `Day ${i + 1}`,
      value: 18000 + i * 35 + (i % 7) * 120,
    }));
  // All
  return Array.from({ length: 720 }, (_, i) => ({
    day: `D${i + 1}`,
    value: 15000 + i * 15 + (i % 30) * 40,
  }));
}

export default function PerformanceLine() {
  const [tab, setTab] = useState<Tab>("1M");
  const data = useMemo(() => gen(tab), [tab]);
  const isDark = document.documentElement.classList.contains("dark");

  return (
    <Card className="p-0">
      <div className="px-5 pt-4">
        <div className="mb-3 flex items-center gap-2">
          {tabs.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`rounded-full px-3 py-1 text-xs border transition-colors
                ${
                  t === tab
                    ? "bg-[rgba(34,197,94,0.18)] text-emerald-300 border-emerald-500/30"
                    : "text-slate-500 dark:text-slate-400 border-slate-200 dark:border-white/10 hover:bg-white/5"
                }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="h-64 px-4 pb-5">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 8, left: 8, right: 8 }}>
            <CartesianGrid
              stroke={isDark ? "rgba(255,255,255,0.06)" : "rgba(2,6,23,0.06)"}
              vertical={false}
            />
            <XAxis dataKey="day" hide />
            <YAxis
              tick={{ fill: isDark ? "#9ca3af" : "#6b7280" }}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip
              contentStyle={{
                background: isDark ? "rgb(15 23 42)" : "#ffffff",
                border: `1px solid ${
                  isDark ? "rgba(255,255,255,0.08)" : "#e5e7eb"
                }`,
                borderRadius: 12,
                color: isDark ? "#e5e7eb" : "#0f172a",
              }}
              labelStyle={{ color: isDark ? "#9ca3af" : "#475569" }}
              formatter={(v: number) => `$${v.toLocaleString()}`}
            />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#22c55e"
              dot={false}
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
