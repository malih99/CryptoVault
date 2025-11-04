export default function TxFilter() {
  return (
    <div
      className="
        grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-3
        lg:grid-cols-[1fr_auto_auto_auto]
      "
    >
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
      />

      <select
        className="
          w-full rounded-xl border border-slate-200 bg-white/60
          px-3 py-2 text-sm text-slate-900
          outline-none focus:border-emerald-500
          dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100
        "
        aria-label="Filter by type"
        defaultValue="All Types"
      >
        <option>All Types</option>
        <option>Sent</option>
        <option>Received</option>
        <option>Swapped</option>
      </select>

      <select
        className="
          w-full rounded-xl border border-slate-200 bg-white/60
          px-3 py-2 text-sm text-slate-900
          outline-none focus:border-emerald-500
          dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100
        "
        aria-label="Filter by token"
        defaultValue="All Tokens"
      >
        <option>All Tokens</option>
        <option>BTC</option>
        <option>ETH</option>
        <option>SOL</option>
        <option>USDC</option>
      </select>

      <button
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
