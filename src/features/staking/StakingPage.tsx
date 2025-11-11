import { useMemo, useState } from "react";
import Card from "../../components/ui/Card";
import StakePositionCard from "./StakePositionCard";

import StakingRewardsChart from "./StakingRewardsChart";
import StakingManagePanel from "./StakingManagePanel";
import StakingCalculator from "./StakingCalculator";
import StakingOpportunities from "./StakingOpportunities";
import StakingAPYComparison from "./StakingAPYComparison";
import StakingOpportunityDetailsModal from "./StakingOpportunityDetailsModal";

import {
  stakingRewardsHistory,
  stakingPositions,
  stakingOpportunities,
  stakingApyRows,
} from "./data";
import type {
  SelectedPool,
  StakingOpportunity,
  StakingPosition,
} from "./types";

function parseUsd(value: string): number {
  return Number(value.replace(/[^0-9.]/g, "")) || 0;
}

function parsePercent(v: string): number {
  // "7.2%" -> 7.2
  return Number(v.replace(/[^0-9.]/g, "")) || 0;
}

export default function StakingPage() {
  const [mode, setMode] = useState<"stake" | "unstake">("stake");
  const [selected, setSelected] = useState<SelectedPool | null>(null);
  const [selectedOpportunity, setSelectedOpportunity] =
    useState<StakingOpportunity | null>(null);

  // KPI ها از روی positions محاسبه می‌شن
  const { totalStakedUsd, totalRewardsUsd, avgApy } = useMemo(() => {
    const totalStakedUsd = stakingPositions.reduce(
      (sum, p) => sum + parseUsd(p.value),
      0
    );
    const totalRewardsUsd = stakingPositions.reduce(
      (sum, p) => sum + parseUsd(p.rewards),
      0
    );
    const avgApy =
      stakingPositions.length > 0
        ? stakingPositions.reduce((sum, p) => sum + parsePercent(p.apy), 0) /
          stakingPositions.length
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
      selected
        ? stakingPositions.find((p) => p.sym === selected.sym)
        : undefined,
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
        <StakingRewardsChart data={stakingRewardsHistory} />

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
              {stakingPositions.length} active positions
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
            {stakingPositions.map((p) => (
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
          opportunities={stakingOpportunities}
          onStart={handleStartStaking}
          onViewDetails={(o) => setSelectedOpportunity(o)}
        />

        {/* APY Comparison */}
        <StakingAPYComparison rows={stakingApyRows} />
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
