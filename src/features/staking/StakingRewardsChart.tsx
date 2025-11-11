import { useEffect, useState } from "react";
import Card from "../../components/ui/Card";
import {
  BarChart,
  Bar,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  YAxis,
  CartesianGrid,
} from "recharts";
import type { RewardsHistoryPoint } from "./types";

function useDark() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const el = document.documentElement;
    const apply = () => setIsDark(el.classList.contains("dark"));
    apply();
    const obs = new MutationObserver(apply);
    obs.observe(el, { attributes: true, attributeFilter: ["class"] });
    return () => obs.disconnect();
  }, []);

  return isDark;
}

export default function StakingRewardsChart({
  data,
}: {
  data: RewardsHistoryPoint[];
}) {
  const isDark = useDark();

  const tooltipBg = isDark ? "rgb(15 23 42)" : "#ffffff";
  const tooltipBorder = isDark ? "rgba(148,163,184,0.5)" : "#e5e7eb";
  const tooltipText = isDark ? "#e5e7eb" : "#0f172a";

  return (
    <Card className="p-5">
      <div className="mb-3 font-medium text-slate-900 dark:text-white">
        Rewards History
      </div>
      <div className="h-48 sm:h-56">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ left: 8, right: 8 }}>
            <CartesianGrid
              vertical={false}
              stroke={
                isDark ? "rgba(148,163,184,0.25)" : "rgba(148,163,184,0.35)"
              }
              strokeDasharray="3 3"
            />
            <XAxis
              dataKey="d"
              tick={{ fontSize: 12, fill: isDark ? "#9ca3af" : "#6b7280" }}
              axisLine={false}
              tickLine={false}
              tickMargin={8}
            />
            <YAxis hide />
            <Tooltip
              cursor={{
                stroke: isDark
                  ? "rgba(148,163,184,0.4)"
                  : "rgba(148,163,184,0.3)",
              }}
              contentStyle={{
                background: tooltipBg,
                color: tooltipText,
                borderRadius: 10,
                border: `1px solid ${tooltipBorder}`,
                boxShadow: isDark
                  ? "0 10px 25px rgba(0,0,0,0.6)"
                  : "0 10px 25px rgba(15,23,42,0.18)",
                padding: "8px 10px",
              }}
              formatter={(v: number) => [`$${v.toFixed(2)}`, "Reward"]}
            />
            <Bar
              dataKey="v"
              radius={[6, 6, 0, 0]}
              fill={isDark ? "#34d399" : "#10b981"}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
