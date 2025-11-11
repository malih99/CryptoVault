import { useMemo, useState } from "react";
import Card from "../../components/ui/Card";
import type { StakingApyRow } from "./types";

type SortKey = "token" | "cur" | "avg30" | "minStake" | "lock" | "status";

function parsePercentStr(v: string): number {
  return Number(v.replace(/[^0-9.]/g, "")) || 0;
}

function parseMinStake(v: string): number {
  const [num] = v.split(" ");
  return Number(num.replace(/[^0-9.]/g, "")) || 0;
}

function parseLockDays(lock: string): number {
  const n = Number(lock.replace(/[^0-9.]/g, ""));
  return Number.isFinite(n) && n > 0 ? n : 0;
}

function getSortValue(row: StakingApyRow, key: SortKey): string | number {
  switch (key) {
    case "token":
      return row.token.toLowerCase();
    case "cur":
      return parsePercentStr(row.cur);
    case "avg30":
      return parsePercentStr(row.avg30);
    case "minStake":
      return parseMinStake(row.minStake);
    case "lock":
      return parseLockDays(row.lock);
    case "status":
      return row.status;
    default:
      return 0;
  }
}

export default function StakingAPYComparison({
  rows,
}: {
  rows: StakingApyRow[];
}) {
  const [statusFilter, setStatusFilter] = useState<
    "all" | "Active" | "Available"
  >("all");
  const [minApy, setMinApy] = useState(0);
  const [sortBy, setSortBy] = useState<SortKey>("cur");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");

  const filteredRows = useMemo(() => {
    let result = rows;

    if (statusFilter !== "all") {
      result = result.filter((r) => r.status === statusFilter);
    }

    if (minApy > 0) {
      result = result.filter((r) => parsePercentStr(r.cur) >= minApy);
    }

    const sorted = [...result].sort((a, b) => {
      const av = getSortValue(a, sortBy);
      const bv = getSortValue(b, sortBy);

      if (av < bv) return sortDir === "asc" ? -1 : 1;
      if (av > bv) return sortDir === "asc" ? 1 : -1;
      return 0;
    });

    return sorted;
  }, [rows, statusFilter, minApy, sortBy, sortDir]);

  const handleSort = (key: SortKey) => {
    if (sortBy === key) {
      setSortDir((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortBy(key);
      setSortDir(
        key === "token" || key === "minStake" || key === "lock" ? "asc" : "desc"
      );
    }
  };

  return (
    <Card className="p-5">
      <div className="mb-2 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="font-medium text-slate-900 dark:text-white">
          APY Comparison
        </div>

        {/* فیلترها */}
        <div className="flex flex-wrap items-center gap-2 text-[11px] sm:text-xs">
          <div className="inline-flex items-center gap-1 rounded-full bg-slate-50 px-1.5 py-1 text-slate-600 dark:bg-slate-900 dark:text-slate-300">
            <span className="hidden sm:inline">Status:</span>
            {(["all", "Active", "Available"] as const).map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setStatusFilter(s)}
                className={
                  "rounded-full px-2 py-0.5 capitalize " +
                  (statusFilter === s
                    ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/60 dark:text-emerald-300"
                    : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800")
                }
              >
                {s === "all" ? "All" : s}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-1">
            <span className="hidden text-[11px] text-slate-500 dark:text-slate-400 sm:inline">
              Min APY:
            </span>
            <input
              type="number"
              min={0}
              max={50}
              value={minApy || ""}
              onChange={(e) => setMinApy(Number(e.target.value) || 0)}
              className="h-7 w-16 rounded-lg border border-slate-200 bg-white px-2 text-[11px] text-slate-700 outline-none focus:ring-1 focus:ring-emerald-500/70 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
              placeholder="0"
            />
            <span className="text-[11px] text-slate-500 dark:text-slate-400">
              %
            </span>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto pt-2">
        <table className="w-full min-w-[880px] text-sm">
          <thead>
            <tr className="text-xs text-slate-500 dark:text-slate-400">
              <SortableTh
                label="Token"
                active={sortBy === "token"}
                dir={sortDir}
                onClick={() => handleSort("token")}
              />
              <SortableTh
                label="Current APY"
                active={sortBy === "cur"}
                dir={sortDir}
                onClick={() => handleSort("cur")}
              />
              <SortableTh
                label="30-Day Avg"
                active={sortBy === "avg30"}
                dir={sortDir}
                onClick={() => handleSort("avg30")}
              />
              <SortableTh
                label="Min Stake"
                active={sortBy === "minStake"}
                dir={sortDir}
                onClick={() => handleSort("minStake")}
              />
              <SortableTh
                label="Lock Period"
                active={sortBy === "lock"}
                dir={sortDir}
                onClick={() => handleSort("lock")}
              />
              <SortableTh
                label="Status"
                active={sortBy === "status"}
                dir={sortDir}
                onClick={() => handleSort("status")}
              />
            </tr>
          </thead>
          <tbody>
            {filteredRows.map((r, i) => {
              const curApy = parsePercentStr(r.cur);
              const isHot = curApy >= 14;
              const isBoosted = !isHot && curApy >= 10;

              return (
                <tr
                  key={i}
                  className="border-t border-slate-100 hover:bg-slate-50/60 dark:border-slate-800 dark:hover:bg-slate-900/60"
                >
                  <td className="py-3">
                    <div className="flex items-center gap-2">
                      <div
                        className="grid h-6 w-6 place-items-center rounded-full bg-slate-200 text-slate-700
                                   dark:bg-slate-800 dark:text-slate-200"
                      >
                        {r.sym[0]}
                      </div>
                      <div className="text-slate-900 dark:text-slate-100">
                        {r.token}
                      </div>
                      <span className="text-xs text-slate-500 dark:text-slate-400">
                        {r.sym}
                      </span>
                    </div>
                  </td>
                  <td className="py-3">
                    <div className="flex items-center gap-1.5">
                      <span className="text-emerald-600 dark:text-emerald-400">
                        {r.cur}
                      </span>
                      {isHot && (
                        <span className="rounded-full bg-amber-50 px-2 py-0.5 text-[11px] font-medium text-amber-700 dark:bg-amber-900/40 dark:text-amber-300">
                          Hot
                        </span>
                      )}
                      {!isHot && isBoosted && (
                        <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-medium text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300">
                          Boosted
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="py-3 text-slate-900 dark:text-slate-100">
                    {r.avg30}
                  </td>
                  <td className="py-3 text-slate-900 dark:text-slate-100">
                    {r.minStake}
                  </td>
                  <td className="py-3 text-slate-900 dark:text-slate-100">
                    {r.lock}
                  </td>
                  <td className="py-3">
                    <span
                      className={
                        "rounded-full px-2 py-0.5 text-xs " +
                        (r.status === "Active"
                          ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300"
                          : "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300")
                      }
                    >
                      {r.status}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Card>
  );
}

/* سرستون قابل سورت */

function SortableTh({
  label,
  active,
  dir,
  onClick,
}: {
  label: string;
  active: boolean;
  dir: "asc" | "desc";
  onClick: () => void;
}) {
  return (
    <th className="py-2 text-left">
      <button
        type="button"
        onClick={onClick}
        className="inline-flex items-center gap-1 text-xs font-normal text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
      >
        <span>{label}</span>
        <SortIcon active={active} dir={dir} />
      </button>
    </th>
  );
}

function SortIcon({ active, dir }: { active: boolean; dir: "asc" | "desc" }) {
  return (
    <span className="ml-0.5 inline-flex flex-col text-[8px] leading-none">
      <span
        className={
          "block " +
          (active && dir === "asc"
            ? "text-slate-900 dark:text-slate-50"
            : "text-slate-400")
        }
      >
        ▲
      </span>
      <span
        className={
          "block -mt-1 " +
          (active && dir === "desc"
            ? "text-slate-900 dark:text-slate-50"
            : "text-slate-400")
        }
      >
        ▼
      </span>
    </span>
  );
}
