import { useQuery } from "@tanstack/react-query";
import { fetchJson } from "../../lib/api/client";
import {
  mockLine,
  mockHoldings,
  mockRecentActivity,
  mockMarket,
  mockNews,
} from "../../lib/api/mock";

export type PortfolioPoint = (typeof mockLine)[number];
export type HoldingRow = (typeof mockHoldings)[number];
export type ActivityRow = (typeof mockRecentActivity)[number];
export type MarketRow = (typeof mockMarket)[number];
export type NewsRow = (typeof mockNews)[number];

export type DashboardKpis = {
  totalValue: number;
  change24h: number;
  assetsCount: number;
  stakedValue: number;
};

export type DashboardResponse = {
  kpis: DashboardKpis;
  line: PortfolioPoint[];
  holdings: HoldingRow[];
  market: MarketRow[];
  news: NewsRow[];
  recentActivity: ActivityRow[];
};

const ENDPOINT = "/api/dashboard";

function buildFallbackDashboard(): DashboardResponse {
  const totalValue = mockHoldings.reduce((sum, h) => sum + h.value, 0);
  const assetsCount = mockHoldings.length;
  const avgChange =
    mockMarket.length === 0
      ? 0
      : mockMarket.reduce((sum, m) => sum + m.change, 0) / mockMarket.length;
  const stakedValue = Math.round(totalValue * 0.35);

  return {
    kpis: {
      totalValue,
      change24h: avgChange,
      assetsCount,
      stakedValue,
    },
    line: mockLine,
    holdings: mockHoldings,
    market: mockMarket,
    news: mockNews,
    recentActivity: mockRecentActivity,
  };
}

export function useDashboardQuery() {
  return useQuery<DashboardResponse>({
    queryKey: ["dashboard"],
    queryFn: async () => {
      try {
        const res = await fetchJson<DashboardResponse>(ENDPOINT);
        return res;
      } catch (err) {
        if (import.meta.env.DEV) {
          // eslint-disable-next-line no-console
          console.warn(
            "[dashboard] Falling back to mock data because API failed:",
            (err as Error)?.message
          );
        }
        return buildFallbackDashboard();
      }
    },
    staleTime: 30_000,
    retry: 1,
  });
}
