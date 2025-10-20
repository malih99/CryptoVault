export default function TxFilter() {
  return (
    <div
      className="
        grid gap-2 sm:gap-3
        grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1fr_auto_auto_auto]
      "
    >
      <input
        placeholder="Search by token or transaction hash..."
        className="
          w-full bg-transparent border border-border rounded-xl
          px-3 py-2 text-sm outline-none
          focus:border-emerald-500/50
        "
        aria-label="Search transactions"
      />

      <select
        className="
          w-full bg-transparent border border-border rounded-xl
          px-3 py-2 text-sm
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
          w-full bg-transparent border border-border rounded-xl
          px-3 py-2 text-sm
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
          w-full lg:w-auto px-3 py-2 rounded-xl border border-border text-sm
          hover:bg-white/5 transition-colors
        "
      >
        Export
      </button>
    </div>
  );
}
