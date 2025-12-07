import type { ChangeEvent } from "react";
import { Download } from "lucide-react";
import { Button } from "../../components/ui/Button";

type TxTypeFilter = "all" | "in" | "out" | "swap";
type TxStatusFilter = "all" | "confirmed" | "pending";

type Props = {
  search: string;
  onSearchChange: (value: string) => void;
  typeFilter: TxTypeFilter;
  onTypeChange: (value: TxTypeFilter) => void;
  tokenFilter: string;
  onTokenChange: (value: string) => void;
  statusFilter: TxStatusFilter;
  onStatusChange: (value: TxStatusFilter) => void;
  onExport: () => void;
  availableTokens: string[];
  onResetFilters: () => void;
  hasActiveFilters: boolean;
};

export default function TxFilter({
  search,
  onSearchChange,
  typeFilter,
  onTypeChange,
  tokenFilter,
  onTokenChange,
  statusFilter,
  onStatusChange,
  onExport,
  availableTokens,
  onResetFilters,
  hasActiveFilters,
}: Props) {
  const handleTypeChange = (e: ChangeEvent<HTMLSelectElement>) =>
    onTypeChange(e.target.value as TxTypeFilter);

  const handleTokenChange = (e: ChangeEvent<HTMLSelectElement>) =>
    onTokenChange(e.target.value);

  const handleStatusChange = (e: ChangeEvent<HTMLSelectElement>) =>
    onStatusChange(e.target.value as TxStatusFilter);

  return (
    <div
      className="
        grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-3
        lg:grid-cols-[minmax(0,2.2fr)_auto_auto_auto_auto]
      "
    >
      {/* Search */}
      <input
        placeholder="Search by token or transaction hash..."
        className="
          w-full rounded-xl border border-slate-200 bg-white/60
          px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400
          outline-none focus:border-transparent focus:ring-2 focus:ring-emerald-500/70
          dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100
          dark:placeholder:text-slate-500
        "
        aria-label="Search transactions"
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
      />

      {/* Type filter */}
      <select
        className="
          w-full rounded-xl border border-slate-200 bg-white/60
          px-3 py-2 text-sm text-slate-900
          outline-none focus:border-emerald-500
          dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100
        "
        aria-label="Filter by type"
        value={typeFilter}
        onChange={handleTypeChange}
      >
        <option value="all">All types</option>
        <option value="out">Sent</option>
        <option value="in">Received</option>
        <option value="swap">Swapped</option>
      </select>

      {/* Token filter */}
      <select
        className="
          w-full rounded-xl border border-slate-200 bg-white/60
          px-3 py-2 text-sm text-slate-900
          outline-none focus:border-emerald-500
          dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100
        "
        aria-label="Filter by token"
        value={tokenFilter}
        onChange={handleTokenChange}
      >
        <option value="all">All tokens</option>
        {availableTokens.map((sym) => (
          <option key={sym} value={sym}>
            {sym}
          </option>
        ))}
      </select>

      {/* Status filter */}
      <select
        className="
          w-full rounded-xl border border-slate-200 bg-white/60
          px-3 py-2 text-sm text-slate-900
          outline-none focus:border-emerald-500
          dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100
        "
        aria-label="Filter by status"
        value={statusFilter}
        onChange={handleStatusChange}
      >
        <option value="all">All statuses</option>
        <option value="confirmed">Confirmed</option>
        <option value="pending">Pending</option>
      </select>

      {/* Actions: Reset + Export */}
      <div className="flex items-center justify-end gap-2">
        <button
          type="button"
          onClick={hasActiveFilters ? onResetFilters : undefined}
          disabled={!hasActiveFilters}
          className={`
            inline-flex items-center rounded-xl border px-3 py-1.5 text-xs
            ${
              hasActiveFilters
                ? "border-slate-200 text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
                : "border-slate-100 text-slate-300 dark:border-slate-800 dark:text-slate-600 cursor-not-allowed"
            }
          `}
          aria-disabled={!hasActiveFilters}
        >
          Clear filters
        </button>

        <Button
          type="button"
          onClick={onExport}
          variant="outline"
          size="sm"
          leftIcon={<Download className="h-3.5 w-3.5" />}
        >
          <span className="hidden sm:inline">Export CSV</span>
          <span className="sm:hidden">Export</span>
        </Button>
      </div>
    </div>
  );
}
