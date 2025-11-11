import type {
  RewardsHistoryPoint,
  StakingPosition,
  StakingOpportunity,
  StakingApyRow,
} from "./types";

export const stakingRewardsHistory: RewardsHistoryPoint[] = [
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

export const stakingPositions: StakingPosition[] = [
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

export const stakingOpportunities: StakingOpportunity[] = [
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

export const stakingApyRows: StakingApyRow[] = [
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
