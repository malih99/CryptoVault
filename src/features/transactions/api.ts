import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { fetchJson } from "../../lib/api/client";
import type { TxRecord } from "./types";

const ENDPOINT = "/api/transactions";

type RawTx = {
  type: "in" | "out" | "swap";
  token: string;
  amount: string | number;
  value: string | number;
  from: string;
  hash: string;
  time: string;
  status: "confirmed" | "pending";
};

function parseUsdString(input: unknown): number {
  if (typeof input === "number" && Number.isFinite(input)) return input;
  const s = String(input ?? "");
  const n = Number(s.replace(/[$,\s]/g, ""));
  return Number.isFinite(n) ? n : 0;
}

function parseAmountString(input: unknown): number {
  if (typeof input === "number" && Number.isFinite(input)) return input;
  const s = String(input ?? "").trim();
  const sign = s.startsWith("-") ? -1 : 1;
  const m = s.match(/-?\d+(\.\d+)?/);
  if (!m) return 0;
  return sign * parseFloat(m[0]);
}

function adaptRawTx(raw: RawTx): TxRecord {
  return {
    type: raw.type,
    token: raw.token,
    amount: parseAmountString(raw.amount),
    value: parseUsdString(raw.value),
    from: raw.from,
    hash: raw.hash,
    time: raw.time,
    status: raw.status,
  };
}

export function useTransactionsQuery(): UseQueryResult<TxRecord[]> {
  return useQuery({
    queryKey: ["transactions", "list"],
    queryFn: async () => {
      const raw = await fetchJson<RawTx[]>(ENDPOINT);
      return raw.map(adaptRawTx);
    },
    staleTime: 30_000,
    retry: 1,
  });
}
