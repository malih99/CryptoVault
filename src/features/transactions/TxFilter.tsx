export default function TxFilter() {
  return (
    <div className="flex items-center gap-3">
      <input
        placeholder="Search by token or transaction hash..."
        className="flex-1 bg-transparent border border-border rounded-xl px-3 py-2 outline-none"
      />
      <select className="bg-transparent border border-border rounded-xl px-3 py-2">
        <option>All Types</option>
        <option>Sent</option>
        <option>Received</option>
        <option>Swapped</option>
      </select>
      <select className="bg-transparent border border-border rounded-xl px-3 py-2">
        <option>All Tokens</option>
        <option>BTC</option>
        <option>ETH</option>
        <option>SOL</option>
        <option>USDC</option>
      </select>
      <button className="px-3 py-2 rounded-xl border border-border">
        Export
      </button>
    </div>
  );
}
