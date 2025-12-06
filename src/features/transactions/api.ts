import { useQuery } from "@tanstack/react-query";
import { fetchJson } from "../../lib/api/client";
import { mockTx } from "../../lib/api/mock";
import type {
  TxRecord,
  TxTypeFilter,
  TxStatusFilter,
  TxSortKey,
  TxSortDir,
} from "./types";

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

export type TransactionsQueryInput = {
  search: string;
  type: TxTypeFilter;
  token: string;
  status: TxStatusFilter;
  sort: TxSortKey;
  dir: TxSortDir;
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

function adaptMockToRaw(): RawTx[] {
  return mockTx.map((t) => ({
    type: t.type,
    token: t.token,
    amount: t.amount,
    value: t.value,
    from: t.from,
    hash: t.hash,
    time: t.time,
    status: t.status,
  }));
}

/**
 * ساخت query string برای API
 * (فعلاً فقط فیلترها و سورت؛ پیجینیشن هنوز سمت کلاینته)
 */
function buildQueryString(input: TransactionsQueryInput): string {
  const params = new URLSearchParams();

  const search = input.search.trim();
  if (search) params.set("search", search);

  if (input.type && input.type !== "all") {
    params.set("type", input.type);
  }
  if (input.token && input.token !== "all") {
    params.set("token", input.token);
  }
  if (input.status && input.status !== "all") {
    params.set("status", input.status);
  }

  if (input.sort && input.sort !== "time") {
    params.set("sort", input.sort);
  }
  if (input.dir && input.dir !== "desc") {
    params.set("dir", input.dir);
  }

  return params.toString();
}

export function useTransactionsQuery(input: TransactionsQueryInput) {
  return useQuery<TxRecord[]>({
    queryKey: ["transactions", "list", input],
    queryFn: async () => {
      const qs = buildQueryString(input);
      const url = qs ? `${ENDPOINT}?${qs}` : ENDPOINT;

      try {
        const raw = await fetchJson<RawTx[]>(url);
        return raw.map(adaptRawTx);
      } catch (err) {
        if (import.meta.env.DEV) {
          console.warn(
            "[transactions] Falling back to mock data because API failed:",
            (err as Error)?.message
          );
        }
        const raw = adaptMockToRaw();
        return raw.map(adaptRawTx);
      }
    },
    staleTime: 30_000,
    retry: 1,
    keepPreviousData: true,
  });
}
