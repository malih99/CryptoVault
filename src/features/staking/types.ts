export type RewardsHistoryPoint = {
  d: string;
  v: number;
};

export type StakingPosition = {
  sym: string;
  staked: string;
  value: string;
  rewards: string;
  apy: string;
  lock: string;
};

export type StakingOpportunity = {
  sym: string;
  name: string;
  min: string;
  lock: string;
  apy: string;
};

export type StakingApyRow = {
  token: string;
  sym: string;
  cur: string;
  avg30: string;
  minStake: string;
  lock: string;
  status: "Active" | "Available";
};

export type SelectedPool = {
  sym: string;
  apy: string;
  lock: string;
  source: "position" | "opportunity";
};
