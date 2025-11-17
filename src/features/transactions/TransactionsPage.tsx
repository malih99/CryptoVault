import { useEffect, useMemo, useState } from "react";
import Card from "../../components/ui/Card";
import TxFilter from "./TxFilter";
import TxTable from "../../components/tables/TxTable";
import TxAnalytics from "./TxAnalytics";
import TxMonthlySummary from "./TxMonthlySummary";
import TxDetailsModal from "./TxDetailsModal";
import {
  mockTx,
  mockTxMonthlySummary,
  mockTxFeesByMonth,
} from "../../lib/api/mock";
import type { TxRecord } from "./types";
import TxQuickFilters from "./TxQuickFilters";
import { formatCurrency } from "../../lib/format";

/** string -> number parsers */
function parseUsdString(input: string): number {
  if (!input) return 0;
  const n = Number(String(input).replace(/[$,\s]/g, ""));
  return Number.isFinite(n) ? n : 0;
}
function parseAmountString(input: string): number {
  if (!input) return 0;
  const s = String(input).trim();
  const sign = s.startsWith("-") ? -1 : 1;
  const m = s.match(/-?\d+(\.\d+)?/);
  if (!m) return 0;
  return sign * parseFloat(m[0]);
}

type TxTypeFilter = "all" | "in" | "out" | "swap";
type TxStatusFilter = "all" | "confirmed" | "pending";

export default function TransactionsPage() {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState<TxTypeFilter>("all");
  const [tokenFilter, setTokenFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<TxStatusFilter>("all");

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [selectedTx, setSelectedTx] = useState<TxRecord | null>(null);

  // map mock -> numeric
  const mappedRows: TxRecord[] = useMemo(
    () =>
      mockTx.map((t) => ({
        type: t.type,
        token: t.token,
        amount: parseAmountString(t.amount as unknown as string),
        value: parseUsdString(t.value as unknown as string),
        from: t.from,
        hash: t.hash,
        time: t.time,
        status: t.status,
      })),
    []
  );

  const availableTokens = useMemo(
    () => Array.from(new Set(mappedRows.map((t) => t.token))).sort(),
    [mappedRows]
  );

  const filteredTx: TxRecord[] = useMemo(
    () =>
      mappedRows.filter((tx) => {
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
    [mappedRows, search, typeFilter, tokenFilter, statusFilter]
  );

  useEffect(() => {
    setPage(1);
  }, [search, typeFilter, tokenFilter, statusFilter, pageSize]);

  const totalTx = filteredTx.length;
  const totalVolume = filteredTx.reduce((sum, tx) => sum + tx.value, 0);
  const avgTx = totalTx ? totalVolume / totalTx : 0;
  const confirmed = filteredTx.filter((t) => t.status === "confirmed").length;
  const successRate = totalTx ? (confirmed / totalTx) * 100 : 0;

  const totalPages = Math.max(1, Math.ceil(totalTx / pageSize));
  const paginatedTx = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filteredTx.slice(start, start + pageSize);
  }, [filteredTx, page, pageSize]);

  const handleExport = () => {
    if (!filteredTx.length) return;

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

    const rows = filteredTx.map((tx) =>
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

    const csv = [header.join(","), ...rows].join("\n");
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
            Transactions
          </h1>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            View and manage your transaction history.
          </p>
        </div>

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

        <TxAnalytics tx={filteredTx} feesByMonth={mockTxFeesByMonth} />

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

        <TxQuickFilters
          typeFilter={typeFilter}
          statusFilter={statusFilter}
          onTypeChange={setTypeFilter}
          onStatusChange={setStatusFilter}
        />

        <TxMonthlySummary months={mockTxMonthlySummary} />

        <TxTable
          rows={paginatedTx}
          page={page}
          pageSize={pageSize}
          total={totalTx}
          totalPages={totalPages}
          onPageChange={setPage}
          onPageSizeChange={setPageSize}
          onSelectTx={setSelectedTx}
        />
      </section>

      {selectedTx && (
        <TxDetailsModal tx={selectedTx} onClose={() => setSelectedTx(null)} />
      )}
    </>
  );
}
