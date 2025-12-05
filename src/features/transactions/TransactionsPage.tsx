import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import Card from "../../components/ui/Card";
import TxFilter from "./TxFilter";
import TxTable from "../../components/tables/TxTable";
import TxAnalytics from "./TxAnalytics";
import TxMonthlySummary from "./TxMonthlySummary";
import TxDetailsModal from "./TxDetailsModal";
import { mockTxMonthlySummary, mockTxFeesByMonth } from "../../lib/api/mock";
import TxQuickFilters from "./TxQuickFilters";
import { formatCurrency } from "../../lib/format";
import { useTransactionsQuery } from "./api";
import { KPICardSkeleton, TableSkeleton } from "../../components/ui/Skeleton";
import { useLocalStorage } from "../../lib/useLocalStorage";
import type {
  TxRecord,
  TxTypeFilter,
  TxStatusFilter,
  TxSortKey,
  TxSortDir,
} from "./types";

/** helpers */
function toTimeMs(s: string): number {
  const t = Date.parse(s);
  return Number.isFinite(t) ? t : 0;
}

const DEFAULTS = {
  search: "",
  type: "all" as TxTypeFilter,
  token: "all",
  status: "all" as TxStatusFilter,
  sort: "time" as TxSortKey,
  dir: "desc" as TxSortDir,
  page: 1,
  pageSize: 10,
};

const LS_KEY = "tx:list:view";

export default function TransactionsPage() {
  const [params, setParams] = useSearchParams();
  const queryClient = useQueryClient();

  // 1) snapshot از localStorage
  const [persisted, setPersisted] = useLocalStorage(LS_KEY, {
    search: DEFAULTS.search,
    type: DEFAULTS.type,
    token: DEFAULTS.token,
    status: DEFAULTS.status,
    sort: DEFAULTS.sort,
    dir: DEFAULTS.dir,
    page: DEFAULTS.page,
    pageSize: DEFAULTS.pageSize,
  });

  // 2) Read from URL (با fallback به persisted)
  const initial = useMemo(() => {
    const get = (k: string) => params.get(k) || "";
    const has = (k: string) => params.has(k);
    const num = (k: string, fallback: number) => {
      const n = Number(get(k));
      return Number.isFinite(n) && n > 0 ? n : fallback;
    };

    const sort: TxSortKey = has("sort")
      ? ((["amount", "value", "time"].includes(get("sort"))
          ? get("sort")
          : DEFAULTS.sort) as TxSortKey)
      : (persisted.sort as TxSortKey);

    const dir: TxSortDir = has("dir")
      ? ((["asc", "desc"].includes(get("dir"))
          ? get("dir")
          : DEFAULTS.dir) as TxSortDir)
      : (persisted.dir as TxSortDir);

    const type: TxTypeFilter = has("type")
      ? ((["in", "out", "swap", "all"].includes(get("type"))
          ? get("type")
          : DEFAULTS.type) as TxTypeFilter)
      : (persisted.type as TxTypeFilter);

    const status: TxStatusFilter = has("status")
      ? ((["confirmed", "pending", "all"].includes(get("status"))
          ? get("status")
          : DEFAULTS.status) as TxStatusFilter)
      : (persisted.status as TxStatusFilter);

    return {
      search: has("search") ? get("search") : persisted.search,
      typeFilter: type,
      tokenFilter: has("token") ? get("token") : persisted.token,
      statusFilter: status,
      sortKey: sort,
      sortDir: dir,
      page: has("page") ? num("page", DEFAULTS.page) : persisted.page,
      pageSize: has("pageSize")
        ? num("pageSize", DEFAULTS.pageSize)
        : persisted.pageSize,
    };
  }, [params, persisted]);

  // 3) Local states from initial
  const [search, setSearch] = useState(initial.search);
  const [typeFilter, setTypeFilter] = useState<TxTypeFilter>(
    initial.typeFilter
  );
  const [tokenFilter, setTokenFilter] = useState<string>(initial.tokenFilter);
  const [statusFilter, setStatusFilter] = useState<TxStatusFilter>(
    initial.statusFilter
  );
  const [sortKey, setSortKey] = useState<TxSortKey>(initial.sortKey);
  const [sortDir, setSortDir] = useState<TxSortDir>(initial.sortDir);
  const [page, setPage] = useState(initial.page);
  const [pageSize, setPageSize] = useState(initial.pageSize);
  const [selectedTx, setSelectedTx] = useState<TxRecord | null>(null);

  // 4) Fetch (TanStack Query)
  const { data, isLoading, isError, error, refetch, isFetching } =
    useTransactionsQuery();

  const rows = data ?? [];

  const availableTokens = useMemo(
    () => Array.from(new Set(rows.map((t) => t.token))).sort(),
    [rows]
  );

  // 5) Filters
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
        )
          return false;
        if (typeFilter !== "all" && tx.type !== typeFilter) return false;
        if (tokenFilter !== "all" && tx.token !== tokenFilter) return false;
        if (statusFilter !== "all" && tx.status !== statusFilter) return false;
        return true;
      }),
    [rows, search, typeFilter, tokenFilter, statusFilter]
  );

  // 6) Sort BEFORE paginate
  const sortedTx = useMemo(() => {
    const copy = [...filteredTx];
    copy.sort((a, b) => {
      let av = 0;
      let bv = 0;
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

  // 7) Reset page on filters/sort change
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

  // 8) KPIs
  const totalTx = sortedTx.length;
  const totalVolume = sortedTx.reduce((sum, tx) => sum + tx.value, 0);
  const avgTx = totalTx ? totalVolume / totalTx : 0;
  const confirmed = sortedTx.filter((t) => t.status === "confirmed").length;
  const successRate = totalTx ? (confirmed / totalTx) * 100 : 0;

  // 9) Pagination
  const totalPages = Math.max(1, Math.ceil(totalTx / pageSize));
  const paginatedTx = useMemo(() => {
    const start = (page - 1) * pageSize;
    return sortedTx.slice(start, start + pageSize);
  }, [sortedTx, page, pageSize]);

  // 10) Write state -> URL
  useEffect(() => {
    const next = new URLSearchParams();
    if (search) next.set("search", search);
    if (typeFilter !== "all") next.set("type", typeFilter);
    if (tokenFilter !== "all") next.set("token", tokenFilter);
    if (statusFilter !== "all") next.set("status", statusFilter);
    if (sortKey !== DEFAULTS.sort) next.set("sort", sortKey);
    if (sortDir !== DEFAULTS.dir) next.set("dir", sortDir);
    if (page !== DEFAULTS.page) next.set("page", String(page));
    if (pageSize !== DEFAULTS.pageSize) next.set("pageSize", String(pageSize));

    if (next.toString() !== params.toString()) {
      setParams(next, { replace: false });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    search,
    typeFilter,
    tokenFilter,
    statusFilter,
    sortKey,
    sortDir,
    page,
    pageSize,
  ]);

  // 11) Persist به localStorage
  useEffect(() => {
    setPersisted({
      search,
      type: typeFilter,
      token: tokenFilter,
      status: statusFilter,
      sort: sortKey,
      dir: sortDir,
      page,
      pageSize,
    });
  }, [
    search,
    typeFilter,
    tokenFilter,
    statusFilter,
    sortKey,
    sortDir,
    page,
    pageSize,
    setPersisted,
  ]);

  // 12) Sort header handler
  const onRequestSort = (key: TxSortKey) => {
    setSortKey((prevKey) => {
      if (prevKey !== key) {
        setSortDir("desc");
        return key;
      }
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
      return prevKey;
    });
  };

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

    const csvRows = sortedTx
      .map((tx) =>
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
      )
      .join("\n");

    const csv = [header.join(","), csvRows].join("\n");
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
