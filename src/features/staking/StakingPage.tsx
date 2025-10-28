import { useMemo, useState } from "react";
import Card from "../../components/ui/Card";
import StakePositionCard from "./StakePositionCard";
import {
  BarChart,
  Bar,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  YAxis,
  CartesianGrid,
} from "recharts";

// --- Mock data (می‌تونی بعداً از API جایگزین کنی)
const rewardsHistory = [
  { d: "Oct 1", v: 1.8 },
  { d: "Oct 3", v: 2.1 },
  { d: "Oct 5", v: 2.6 },
  { d: "Oct 7", v: 2.3 },
  { d: "Oct 9", v: 2.9 },
  { d: "Oct 11", v: 2.7 },
  { d: "Oct 13", v: 3.2 },
  { d: "Oct 15", v: 3.0 },
  { d: "Oct 17", v: 2.6 },
  { d: "Oct 19", v: 3.4 },
  { d: "Oct 21", v: 3.7 },
  { d: "Oct 22", v: 2.8 },
];

const positions = [
  {
    sym: "SOL",
    staked: "4.5 SOL",
    value: "$892.5",
    rewards: "+$12.45",
    apy: "7.2%",
    lock: "Flexible",
  },
  {
    sym: "ETH",
    staked: "1.2 ETH",
    value: "$2,940",
    rewards: "+$45.20",
    apy: "5.8%",
    lock: "Flexible",
  },
  {
    sym: "MATIC",
    staked: "1200 MATIC",
    value: "$1,020",
    rewards: "+$7.10",
    apy: "12.5%",
    lock: "30 days",
  },
  {
    sym: "ATOM",
    staked: "120 ATOM",
    value: "$1,080",
    rewards: "+$22.15",
    apy: "18.3%",
    lock: "21 days",
  },
];

const opportunities = [
  { sym: "DOT", name: "Polkadot", min: "1 DOT", lock: "28 days", apy: "14.2%" },
  {
    sym: "AVAX",
    name: "Avalanche",
    min: "0.5 AVAX",
    lock: "14 days",
    apy: "9.5%",
  },
  { sym: "ADA", name: "Cardano", min: "10 ADA", lock: "Flexible", apy: "5.5%" },
];

const apyRows = [
  {
    token: "Cosmos",
    sym: "ATOM",
    cur: "18.3%",
    avg30: "17.8%",
    minStake: "0.5 ATOM",
    lock: "21 days",
    status: "Active",
  },
  {
    token: "Polygon",
    sym: "MATIC",
    cur: "12.5%",
    avg30: "13.2%",
    minStake: "1 MATIC",
    lock: "30 days",
    status: "Active",
  },
  {
    token: "Polkadot",
    sym: "DOT",
    cur: "14.2%",
    avg30: "14.5%",
    minStake: "1 DOT",
    lock: "28 days",
    status: "Available",
  },
  {
    token: "Avalanche",
    sym: "AVAX",
    cur: "9.5%",
    avg30: "9.8%",
    minStake: "0.5 AVAX",
    lock: "14 days",
    status: "Available",
  },
  {
    token: "Solana",
    sym: "SOL",
    cur: "7.2%",
    avg30: "7.5%",
    minStake: "0.1 SOL",
    lock: "Flexible",
    status: "Active",
  },
  {
    token: "Ethereum",
    sym: "ETH",
    cur: "5.8%",
    avg30: "6.1%",
    minStake: "0.01 ETH",
    lock: "Flexible",
    status: "Active",
  },
  {
    token: "Cardano",
    sym: "ADA",
    cur: "5.5%",
    avg30: "5.7%",
    minStake: "10 ADA",
    lock: "Flexible",
    status: "Available",
  },
];

// ---- Staking Calculator (ساده و فوری)
function StakingCalculator() {
  const [amount, setAmount] = useState(1000);
  const [duration, setDuration] = useState(12); // months
  const [apy, setApy] = useState(10); // percent

  const { estReward, totalValue } = useMemo(() => {
    const r = amount * (apy / 100) * (duration / 12);
    return { estReward: r, totalValue: amount + r };
  }, [amount, duration, apy]);

  return (
    <Card className="p-5">
      <div className="mb-3 font-medium text-slate-900 dark:text-white">
        Staking Calculator
      </div>

      <div className="space-y-3">
        <label className="grid gap-1">
          <span className="text-xs text-slate-500 dark:text-slate-400">
            Stake Amount ($)
          </span>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            className="h-10 rounded-xl border px-3 bg-white text-slate-900 border-slate-200
                       dark:bg-slate-900 dark:text-slate-100 dark:border-slate-700"
          />
        </label>

        <label className="grid gap-1">
          <span className="text-xs text-slate-500 dark:text-slate-400">
            Staking Duration
          </span>
          <select
            value={duration}
            onChange={(e) => setDuration(Number(e.target.value))}
            className="h-10 rounded-xl border px-3 bg-white text-slate-900 border-slate-200
                       dark:bg-slate-900 dark:text-slate-100 dark:border-slate-700"
          >
            <option value={3}>3 months</option>
            <option value={6}>6 months</option>
            <option value={12}>1 year</option>
            <option value={24}>2 years</option>
          </select>
        </label>

        <label className="grid gap-1">
          <span className="text-xs text-slate-500 dark:text-slate-400">
            Expected APY (%)
          </span>
          <input
            type="number"
            value={apy}
            onChange={(e) => setApy(Number(e.target.value))}
            className="h-10 rounded-xl border px-3 bg-white text-slate-900 border-slate-200
                       dark:bg-slate-900 dark:text-slate-100 dark:border-slate-700"
          />
        </label>

        <div className="mt-2 grid grid-cols-2 gap-3 text-sm">
          <div
            className="rounded-xl border p-3 text-slate-700 border-slate-200
                          dark:text-slate-200 dark:border-slate-700"
          >
            <div className="text-xs text-slate-500 dark:text-slate-400">
              Initial Stake
            </div>
            <div className="mt-0.5">${amount.toLocaleString()}</div>
          </div>
          <div
            className="rounded-xl border p-3 text-emerald-700 border-emerald-200
                          dark:text-emerald-300 dark:border-emerald-800/50"
          >
            <div className="text-xs opacity-90">Estimated Rewards</div>
            <div className="mt-0.5">+${estReward.toFixed(2)}</div>
          </div>
          <div
            className="col-span-2 rounded-xl border p-3 text-slate-900 border-slate-200
                          dark:text-slate-100 dark:border-slate-700"
          >
            <div className="text-xs text-slate-500 dark:text-slate-400">
              Total Value
            </div>
            <div className="mt-0.5">${totalValue.toFixed(2)}</div>
          </div>
        </div>
      </div>
    </Card>
  );
}

export default function StakingPage() {
  const totalStaked = 5337.5;
  const totalRewards = 88.72;
  const avgApy = 10.9;

  const [tab, setTab] = useState<"stake" | "unstake">("stake");

  return (
    <div className="space-y-6">
      {/* Rewards History */}
      <Card className="p-5">
        <div className="mb-3 font-medium text-slate-900 dark:text-white">
          Rewards History
        </div>
        <div className="h-48 sm:h-56">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={rewardsHistory} margin={{ left: 8, right: 8 }}>
              <CartesianGrid vertical={false} strokeOpacity={0.08} />
              <XAxis
                dataKey="d"
                tick={{ fontSize: 12, fill: "currentColor" }}
                stroke="currentColor"
                tickMargin={8}
                className="text-slate-500 dark:text-slate-400"
              />
              <YAxis hide />
              <Tooltip
                contentStyle={{
                  background: "var(--tw-prose-bullets, #111827)",
                  color: "#fff",
                  borderRadius: 10,
                  border: "none",
                }}
                formatter={(v: number) => [`$${v.toFixed(2)}`, "Reward"]}
              />
              <Bar
                dataKey="v"
                radius={[6, 6, 0, 0]}
                className="fill-emerald-500 dark:fill-emerald-400"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        <Card className="p-5">
          <div className="text-slate-500 text-sm dark:text-slate-400">
            Total Staked
          </div>
          <div className="mt-2 text-slate-900 text-xl sm:text-2xl dark:text-white">
            ${totalStaked.toLocaleString()}
          </div>
          <div className="mt-1 text-emerald-600 text-sm dark:text-emerald-400">
            {positions.length} active positions
          </div>
        </Card>

        <Card className="p-5">
          <div className="text-slate-500 text-sm dark:text-slate-400">
            Total Rewards
          </div>
          <div className="mt-2 text-slate-900 text-xl sm:text-2xl dark:text-white">
            ${totalRewards.toFixed(2)}
          </div>
          <div className="mt-1 text-emerald-600 text-sm dark:text-emerald-400">
            This month
          </div>
        </Card>

        <Card className="p-5">
          <div className="text-slate-500 text-sm dark:text-slate-400">
            Average APY
          </div>
          <div className="mt-2 text-slate-900 text-xl sm:text-2xl dark:text-white">
            {avgApy}%
          </div>
          <div className="mt-1 text-slate-500 text-sm dark:text-slate-400">
            Across all pools
          </div>
        </Card>
      </div>

      {/* Positions + Manage + Calculator */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        {/* Positions */}
        <div className="space-y-4 xl:col-span-2">
          {positions.map((p) => (
            <StakePositionCard key={p.sym} {...p} />
          ))}
        </div>

        {/* Right rail: Manage + Calculator */}
        <div className="space-y-4">
          {/* Manage Staking */}
          <Card className="p-5">
            <div className="mb-4 font-medium text-slate-900 dark:text-white">
              Manage Staking
            </div>

            <div className="mb-4 grid grid-cols-2 gap-2">
              <button
                onClick={() => setTab("stake")}
                className={
                  "w-full px-4 py-2 rounded-lg text-sm " +
                  (tab === "stake"
                    ? "bg-emerald-600 text-white"
                    : "bg-white text-slate-900 border border-slate-200 " +
                      "dark:bg-slate-900 dark:text-slate-100 dark:border-slate-700")
                }
              >
                Stake
              </button>
              <button
                onClick={() => setTab("unstake")}
                className={
                  "w-full px-4 py-2 rounded-lg text-sm " +
                  (tab === "unstake"
                    ? "bg-emerald-600 text-white"
                    : "bg-white text-slate-900 border border-slate-200 " +
                      "dark:bg-slate-900 dark:text-slate-100 dark:border-slate-700")
                }
              >
                Unstake
              </button>
            </div>

            <div className="grid h-36 place-items-center text-slate-500 dark:text-slate-400">
              <div className="text-center">🔒 Select a token to {tab}</div>
            </div>
          </Card>

          <StakingCalculator />
        </div>
      </div>

      {/* Opportunities */}
      <Card className="p-5">
        <div className="mb-4 font-medium text-slate-900 dark:text-white">
          Available Staking Opportunities
        </div>
        <div className="grid gap-3">
          {opportunities.map((o) => (
            <div
              key={o.sym}
              className="rounded-xl border border-slate-200 p-4 flex items-center justify-between
                         dark:border-slate-700 dark:bg-slate-900/40"
            >
              <div className="flex items-center gap-3">
                <div
                  className="grid h-8 w-8 place-items-center rounded-full bg-slate-200 text-slate-700
                                dark:bg-slate-800 dark:text-slate-200"
                >
                  {o.sym[0]}
                </div>
                <div>
                  <div className="font-medium text-slate-900 dark:text-white">
                    {o.name}
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">
                    Min stake: {o.min}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <span
                  className="rounded-lg bg-emerald-100 text-emerald-700 text-xs px-2 py-1
                                  dark:bg-emerald-900/50 dark:text-emerald-300"
                >
                  {o.apy} APY
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  {o.lock}
                </span>
                <button
                  className="rounded-xl border px-3 py-1.5 text-sm border-slate-200 hover:bg-slate-50
                                   dark:border-slate-700 dark:hover:bg-slate-800"
                >
                  Start Staking
                </button>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* APY Comparison */}
      <Card className="p-5">
        <div className="mb-4 font-medium text-slate-900 dark:text-white">
          APY Comparison
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[880px] text-sm">
            <thead>
              <tr className="text-slate-500 dark:text-slate-400">
                <th className="py-2 text-left">Token</th>
                <th className="py-2 text-left">Current APY</th>
                <th className="py-2 text-left">30-Day Avg</th>
                <th className="py-2 text-left">Min Stake</th>
                <th className="py-2 text-left">Lock Period</th>
                <th className="py-2 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {apyRows.map((r, i) => (
                <tr
                  key={i}
                  className="border-t border-slate-100 dark:border-slate-800"
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
                  <td className="py-3 text-emerald-600 dark:text-emerald-400">
                    {r.cur}
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
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
