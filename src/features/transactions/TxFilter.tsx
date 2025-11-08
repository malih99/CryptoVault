import type { ChangeEvent } from "react";

type TxTypeFilter = "all" | "in" | "out" | "swap";

type Props = {
  search: string;
  onSearchChange: (value: string) => void;
  typeFilter: TxTypeFilter;
  onTypeChange: (value: TxTypeFilter) => void;
  tokenFilter: string;
  onTokenChange: (value: string) => void;
  onExport: () => void;
  availableTokens: string[];
};

export default function TxFilter({
  search,
  onSearchChange,
  typeFilter,
  onTypeChange,
  tokenFilter,
  onTokenChange,
  onExport,
  availableTokens,
}: Props) {
  const handleTypeChange = (e: ChangeEvent<HTMLSelectElement>) =>
    onTypeChange(e.target.value as TxTypeFilter);

  const handleTokenChange = (e: ChangeEvent<HTMLSelectElement>) =>
    onTokenChange(e.target.value);

  return (
    <div
      className="
        grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-3
        lg:grid-cols-[1fr_auto_auto_auto]
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

      {/* Export */}
      <button
        type="button"
        onClick={onExport}
        className="
          w-full rounded-xl border border-slate-200 bg-white text-sm
          px-3 py-2 font-medium text-slate-900
          hover:bg-slate-50 active:bg-slate-100
          dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100
          dark:hover:bg-slate-800
        "
      >
        Export
      </button>
    </div>
  );
}
