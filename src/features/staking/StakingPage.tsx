import { useMemo, useState } from "react";
import Card from "../../components/ui/Card";
import StakePositionCard from "./StakePositionCard";

import StakingRewardsChart from "./StakingRewardsChart";
import type { RewardsHistoryPoint } from "./StakingRewardsChart";

import StakingManagePanel from "./StakingManagePanel";
import type { SelectedPool } from "./StakingManagePanel";

import StakingCalculator from "./StakingCalculator";

import StakingOpportunities from "./StakingOpportunities";
import type { StakingOpportunity } from "./StakingOpportunities";

import StakingAPYComparison from "./StakingAPYComparison";
import type { StakingApyRow } from "./StakingAPYComparison";

import StakingOpportunityDetailsModal from "./StakingOpportunityDetailsModal";

type StakingPosition = {
  sym: string;
  staked: string;
  value: string;
  rewards: string;
  apy: string;
  lock: string;
};

const rewardsHistory: RewardsHistoryPoint[] = [
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

const positions: StakingPosition[] = [
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

const opportunities: StakingOpportunity[] = [
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

const apyRows: StakingApyRow[] = [
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

function parseUsd(value: string): number {
  return Number(value.replace(/[^0-9.]/g, "")) || 0;
}

function parsePercent(v: string): number {
  return Number(v.replace(/[^0-9.]/g, "")) || 0;
}

export default function StakingPage() {
  const [mode, setMode] = useState<"stake" | "unstake">("stake");
  const [selected, setSelected] = useState<SelectedPool | null>(null);
  const [selectedOpportunity, setSelectedOpportunity] =
    useState<StakingOpportunity | null>(null);

  const { totalStakedUsd, totalRewardsUsd, avgApy } = useMemo(() => {
    const totalStakedUsd = positions.reduce(
      (sum, p) => sum + parseUsd(p.value),
      0
    );
    const totalRewardsUsd = positions.reduce(
      (sum, p) => sum + parseUsd(p.rewards),
      0
    );
    const avgApy =
      positions.length > 0
        ? positions.reduce((sum, p) => sum + parsePercent(p.apy), 0) /
          positions.length
        : 0;

    return { totalStakedUsd, totalRewardsUsd, avgApy };
  }, []);

  const handleStakeMore = (p: StakingPosition) => {
    setMode("stake");
    setSelected({
      sym: p.sym,
      apy: p.apy,
      lock: p.lock,
      source: "position",
    });
  };

  const handleUnstake = (p: StakingPosition) => {
    setMode("unstake");
    setSelected({
      sym: p.sym,
      apy: p.apy,
      lock: p.lock,
      source: "position",
    });
  };

  const handleStartStaking = (o: StakingOpportunity) => {
    setMode("stake");
    setSelected({
      sym: o.sym,
      apy: o.apy,
      lock: o.lock,
      source: "opportunity",
    });
    // اگه از داخل modal بوده، ببندیمش
    setSelectedOpportunity(null);
  };

  const initialApy =
    selected && !Number.isNaN(parseFloat(selected.apy))
      ? parseFloat(selected.apy)
      : undefined;

  const currentPosition = useMemo(
    () =>
      selected ? positions.find((p) => p.sym === selected.sym) : undefined,
    [selected]
  );

  const currentStakedAmount = currentPosition
    ? Number(currentPosition.staked.split(" ")[0]) || 0
    : 0;

  const currentStakedValue = currentPosition
    ? parseUsd(currentPosition.value)
    : 0;

  return (
    <>
      <section className="mx-auto w-full max-w-[1280px] space-y-6 px-3 sm:px-0">
        {/* Header */}
        <div>
          <h1 className="text-lg font-semibold text-slate-900 dark:text-slate-50">
            Staking
          </h1>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Stake your assets to earn passive rewards and compare APYs across
            pools.
          </p>
        </div>

        {/* Rewards History */}
        <StakingRewardsChart data={rewardsHistory} />

        {/* KPIs */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          <Card className="p-5">
            <div className="text-sm text-slate-500 dark:text-slate-400">
              Total Staked
            </div>
            <div className="mt-2 text-xl text-slate-900 dark:text-white sm:text-2xl">
              ${totalStakedUsd.toLocaleString()}
            </div>
            <div className="mt-1 text-sm text-emerald-600 dark:text-emerald-400">
              {positions.length} active positions
            </div>
          </Card>

          <Card className="p-5">
            <div className="text-sm text-slate-500 dark:text-slate-400">
              Total Rewards
            </div>
            <div className="mt-2 text-xl text-slate-900 dark:text-white sm:text-2xl">
              ${totalRewardsUsd.toFixed(2)}
            </div>
            <div className="mt-1 text-sm text-emerald-600 dark:text-emerald-400">
              This month
            </div>
          </Card>

          <Card className="p-5">
            <div className="text-sm text-slate-500 dark:text-slate-400">
              Average APY
            </div>
            <div className="mt-2 text-xl text-slate-900 dark:text-white sm:text-2xl">
              {avgApy.toFixed(1)}%
            </div>
            <div className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Across all pools
            </div>
          </Card>
        </div>

        {/* Positions + Manage + Calculator */}
        <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
          <div className="space-y-4 xl:col-span-2">
            {positions.map((p) => (
              <StakePositionCard
                key={p.sym}
                {...p}
                onStakeMore={() => handleStakeMore(p)}
                onUnstake={() => handleUnstake(p)}
              />
            ))}
          </div>

          <div className="space-y-4">
            <StakingManagePanel
              mode={mode}
              setMode={setMode}
              selected={selected}
              currentStakedAmount={currentStakedAmount}
              currentStakedValue={currentStakedValue}
            />
            <StakingCalculator initialApy={initialApy} />
          </div>
        </div>

        {/* Opportunities */}
        <StakingOpportunities
          opportunities={opportunities}
          onStart={handleStartStaking}
          onViewDetails={(o) => setSelectedOpportunity(o)}
        />

        {/* APY Comparison */}
        <StakingAPYComparison rows={apyRows} />
      </section>

      {selectedOpportunity && (
        <StakingOpportunityDetailsModal
          opportunity={selectedOpportunity}
          onClose={() => setSelectedOpportunity(null)}
          onStart={handleStartStaking}
        />
      )}
    </>
  );
}
