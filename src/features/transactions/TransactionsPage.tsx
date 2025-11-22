import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Card from "../../components/ui/Card";
import TxFilter from "./TxFilter";
import TxTable from "../../components/tables/TxTable";
import TxAnalytics from "./TxAnalytics";
import TxMonthlySummary from "./TxMonthlySummary";
import TxDetailsModal from "./TxDetailsModal";
import { mockTxMonthlySummary, mockTxFeesByMonth } from "../../lib/api/mock";
import type { TxRecord } from "./types";
import TxQuickFilters from "./TxQuickFilters";
import { formatCurrency } from "../../lib/format";
import { useTransactionsQuery } from "./api";
import { KPICardSkeleton, TableSkeleton } from "../../components/ui/Skeleton";

/** helpers */
function toTimeMs(s: string): number {
  const t = Date.parse(s);
  return Number.isFinite(t) ? t : 0;
}

type TxTypeFilter = "all" | "in" | "out" | "swap";
type TxStatusFilter = "all" | "confirmed" | "pending";
type SortKey = "time" | "amount" | "value";
type SortDir = "asc" | "desc";

const clampPage = (v: number) =>
  Number.isFinite(v) && v > 0 ? Math.floor(v) : 1;
const clampSize = (v: number) => {
  const n = Number.isFinite(v) ? Math.floor(v) : 10;
  return [5, 10, 20, 50].includes(n) ? n : 10;
};
const ensureType = (v: string | null): TxTypeFilter =>
  v === "in" || v === "out" || v === "swap" ? v : "all";
const ensureStatus = (v: string | null): TxStatusFilter =>
  v === "confirmed" || v === "pending" ? v : "all";
const ensureSortKey = (v: string | null): SortKey =>
  v === "amount" || v === "value" ? v : "time";
const ensureSortDir = (v: string | null): SortDir =>
  v === "asc" ? "asc" : "desc";

export default function TransactionsPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  // --- initial state from URL
  const [search, setSearch] = useState<string>(searchParams.get("q") ?? "");
  const [typeFilter, setTypeFilter] = useState<TxTypeFilter>(
    ensureType(searchParams.get("type"))
  );
  const [tokenFilter, setTokenFilter] = useState<string>(
    searchParams.get("token") ?? "all"
  );
  const [statusFilter, setStatusFilter] = useState<TxStatusFilter>(
    ensureStatus(searchParams.get("status"))
  );
  const [sortKey, setSortKey] = useState<SortKey>(
    ensureSortKey(searchParams.get("sort"))
  );
  const [sortDir, setSortDir] = useState<SortDir>(
    ensureSortDir(searchParams.get("dir"))
  );
  const [page, setPage] = useState<number>(
    clampPage(Number(searchParams.get("page")))
  );
  const [pageSize, setPageSize] = useState<number>(
    clampSize(Number(searchParams.get("size")))
  );

  const [selectedTx, setSelectedTx] = useState<TxRecord | null>(null);

  // 🔌 fetch via TanStack Query
  const { data, isLoading, isError, error, refetch, isFetching } =
    useTransactionsQuery();
  const rows = data ?? [];

  // available tokens
  const availableTokens = useMemo(
    () => Array.from(new Set(rows.map((t) => t.token))).sort(),
    [rows]
  );

  // filters
  const filteredTx: TxRecord[] = useMemo(
    () =>
      rows.filter((tx) => {
        const q = search.trim().toLowerCase();
        if (
          q &&
          !(
            tx.token.toLowerCase().includes(q) ||
            tx.hash.toLowerCase().includes(q)
          )
        ) {
          return false;
        }
        if (typeFilter !== "all" && tx.type !== typeFilter) return false;
        if (tokenFilter !== "all" && tx.token !== tokenFilter) return false;
        if (statusFilter !== "all" && tx.status !== statusFilter) return false;
        return true;
      }),
    [rows, search, typeFilter, tokenFilter, statusFilter]
  );

  // sort BEFORE paginate
  const sortedTx = useMemo(() => {
    const copy = [...filteredTx];
    copy.sort((a, b) => {
      let av = 0,
        bv = 0;
      if (sortKey === "amount") {
        av = a.amount;
        bv = b.amount;
      } else if (sortKey === "value") {
        av = a.value;
        bv = b.value;
      } else {
        av = toTimeMs(a.time);
        bv = toTimeMs(b.time);
      }
      const diff = av - bv;
      return sortDir === "asc" ? diff : -diff;
    });
    return copy;
  }, [filteredTx, sortKey, sortDir]);

  // reset page when dependencies change
  useEffect(() => {
    setPage(1);
  }, [
    search,
    typeFilter,
    tokenFilter,
    statusFilter,
    pageSize,
    sortKey,
    sortDir,
  ]);

  // KPIs
  const totalTx = sortedTx.length;
  const totalVolume = sortedTx.reduce((sum, tx) => sum + tx.value, 0);
  const avgTx = totalTx ? totalVolume / totalTx : 0;
  const confirmed = sortedTx.filter((t) => t.status === "confirmed").length;
  const successRate = totalTx ? (confirmed / totalTx) * 100 : 0;

  const totalPages = Math.max(1, Math.ceil(totalTx / pageSize));
  const paginatedTx = useMemo(() => {
    const start = (page - 1) * pageSize;
    return sortedTx.slice(start, start + pageSize);
  }, [sortedTx, page, pageSize]);

  // 🔗 write state -> URL (replace to avoid history spam)
  useEffect(() => {
    const params: Record<string, string> = {};
    if (search.trim()) params.q = search.trim();
    if (typeFilter !== "all") params.type = typeFilter;
    if (tokenFilter !== "all") params.token = tokenFilter;
    if (statusFilter !== "all") params.status = statusFilter;
    if (sortKey !== "time") params.sort = sortKey;
    if (sortDir !== "desc") params.dir = sortDir;
    if (page !== 1) params.page = String(page);
    if (pageSize !== 10) params.size = String(pageSize);

    // تنها در صورت تغییر واقعی، setSearchParams انجام شود
    const current = Object.fromEntries(searchParams.entries());
    const nextKeySet = new Set(Object.keys(params));
    const currKeySet = new Set(Object.keys(current));
    let changed = false;
    if (nextKeySet.size !== currKeySet.size) {
      changed = true;
    } else {
      for (const k of nextKeySet) {
        if (current[k] !== params[k]) {
          changed = true;
          break;
        }
      }
    }
    if (changed) setSearchParams(params, { replace: true });
  }, [
    search,
    typeFilter,
    tokenFilter,
    statusFilter,
    sortKey,
    sortDir,
    page,
    pageSize,
    setSearchParams,
    searchParams,
  ]);

  const handleExport = () => {
    if (!sortedTx.length) return;
    const header = [
      "type",
      "token",
      "amount",
      "value",
      "from",
      "hash",
      "time",
      "status",
    ];
    const escape = (v: string) => `"${v.replace(/"/g, '""')}"`;
    const csvRows = sortedTx.map((tx) =>
      [
        tx.type,
        tx.token,
        String(tx.amount),
        String(tx.value),
        tx.from,
        tx.hash,
        tx.time,
        tx.status,
      ]
        .map(escape)
        .join(",")
    );
    const csv = [header.join(","), ...csvRows].join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "transactions.csv";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const onRequestSort = (key: SortKey) => {
    setSortKey((prevKey) => {
      if (prevKey !== key) {
        setSortDir("desc");
        return key;
      }
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
      return prevKey;
    });
  };

  return (
    <>
      <section className="mx-auto w-full max-w-[1280px] space-y-6 px-3 sm:px-0">
        <div>
          <h1 className="text-lg font-semibold text-slate-900 dark:text-slate-50">
            Transactions{" "}
            {isFetching && (
              <span className="ml-2 text-xs text-slate-400">(refreshing…)</span>
            )}
          </h1>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            View and manage your transaction history.
          </p>
        </div>

        {/* KPIs */}
        {isLoading ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <KPICardSkeleton />
            <KPICardSkeleton />
            <KPICardSkeleton />
            <KPICardSkeleton />
          </div>
        ) : isError ? (
          <Card className="p-4 sm:p-5">
            <div className="text-sm font-medium text-rose-600 dark:text-rose-400">
              Failed to load transactions
            </div>
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
              {(error as Error)?.message || "Unknown error"}
            </p>
            <button
              type="button"
              onClick={() => refetch()}
              className="mt-3 inline-flex items-center rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
            >
              Retry
            </button>
          </Card>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Card className="p-4 sm:p-5">
              <div className="text-xs text-slate-500 dark:text-slate-400">
                Total Transactions
              </div>
              <div className="mt-1.5 text-xl font-semibold text-slate-900 dark:text-slate-50 sm:text-2xl">
                {totalTx}
              </div>
            </Card>
            <Card className="p-4 sm:p-5">
              <div className="text-xs text-slate-500 dark:text-slate-400">
                Total Volume
              </div>
              <div className="mt-1.5 text-xl font-semibold text-slate-900 dark:text-slate-50 sm:text-2xl">
                {formatCurrency(totalVolume, "USD")}
              </div>
            </Card>
            <Card className="p-4 sm:p-5">
              <div className="text-xs text-slate-500 dark:text-slate-400">
                Avg Transaction
              </div>
              <div className="mt-1.5 text-xl font-semibold text-slate-900 dark:text-slate-50 sm:text-2xl">
                {formatCurrency(avgTx, "USD")}
              </div>
            </Card>
            <Card className="p-4 sm:p-5">
              <div className="text-xs text-slate-500 dark:text-slate-400">
                Success Rate
              </div>
              <div className="mt-1.5 text-xl font-semibold text-emerald-600 dark:text-emerald-300 sm:text-2xl">
                {successRate.toFixed(1)}%
              </div>
            </Card>
          </div>
        )}

        {/* Analytics */}
        {!isLoading && !isError && (
          <>
            <TxAnalytics tx={sortedTx} feesByMonth={mockTxFeesByMonth} />
            <TxQuickFilters
              typeFilter={typeFilter}
              statusFilter={statusFilter}
              onTypeChange={setTypeFilter}
              onStatusChange={setStatusFilter}
            />
            <TxMonthlySummary months={mockTxMonthlySummary} />
          </>
        )}

        {/* Filters */}
        <TxFilter
          search={search}
          onSearchChange={setSearch}
          typeFilter={typeFilter}
          onTypeChange={setTypeFilter}
          tokenFilter={tokenFilter}
          onTokenChange={setTokenFilter}
          statusFilter={statusFilter}
          onStatusChange={setStatusFilter}
          onExport={handleExport}
          availableTokens={availableTokens}
        />

        {/* Table */}
        {isLoading ? (
          <TableSkeleton rows={10} />
        ) : isError ? null : (
          <TxTable
            rows={paginatedTx}
            page={page}
            pageSize={pageSize}
            total={totalTx}
            totalPages={totalPages}
            onPageChange={setPage}
            onPageSizeChange={setPageSize}
            onSelectTx={setSelectedTx}
            sortKey={sortKey}
            sortDir={sortDir}
            onRequestSort={onRequestSort}
          />
        )}
      </section>

      {selectedTx && (
        <TxDetailsModal tx={selectedTx} onClose={() => setSelectedTx(null)} />
      )}
    </>
  );
}
