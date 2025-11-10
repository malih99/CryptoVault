import type { TxRecord } from "./types";
import Card from "../../components/ui/Card";

type Props = {
  tx: TxRecord;
  onClose: () => void;
};

function typeLabel(type: TxRecord["type"]) {
  if (type === "in") return "Received";
  if (type === "out") return "Sent";
  return "Swapped";
}

function typeColor(type: TxRecord["type"]) {
  if (type === "in")
    return "bg-emerald-50 text-emerald-700 dark:bg-emerald-900/60 dark:text-emerald-300";
  if (type === "out")
    return "bg-rose-50 text-rose-700 dark:bg-rose-900/60 dark:text-rose-300";
  return "bg-amber-50 text-amber-700 dark:bg-amber-900/60 dark:text-amber-300";
}

export default function TxDetailsModal({ tx, onClose }: Props) {
  return (
    <div
      className="
        fixed inset-0 z-40 flex items-center justify-center
        bg-slate-900/60 px-3
      "
      aria-modal="true"
      role="dialog"
    >
      <div className="absolute inset-0" onClick={onClose} aria-hidden="true" />

      <Card className="relative z-10 w-full max-w-lg p-5 sm:p-6">
        {/* Header */}
        <div className="mb-4 flex items-start justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span
                className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${typeColor(
                  tx.type
                )}`}
              >
                {typeLabel(tx.type)}
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400">
                {tx.status === "confirmed" ? "Confirmed" : "Pending"}
              </span>
            </div>
            <div className="mt-2 text-base font-semibold text-slate-900 dark:text-slate-50">
              {tx.token} · {tx.amount}
            </div>
            <div className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              {tx.time}
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="
              inline-flex h-8 w-8 items-center justify-center rounded-full
              text-slate-400 hover:bg-slate-100 hover:text-slate-700
              dark:text-slate-500 dark:hover:bg-slate-800 dark:hover:text-slate-200
            "
            aria-label="Close"
          >
            <span className="text-lg leading-none">&times;</span>
          </button>
        </div>

        {/* Amount & value */}
        <div className="mb-4 grid grid-cols-2 gap-3 text-sm">
          <div className="rounded-xl bg-slate-50 p-3 dark:bg-slate-900">
            <div className="text-xs text-slate-500 dark:text-slate-400">
              Amount
            </div>
            <div className="mt-1 font-medium text-slate-900 dark:text-slate-50">
              {tx.amount}
            </div>
          </div>
          <div className="rounded-xl bg-slate-50 p-3 dark:bg-slate-900">
            <div className="text-xs text-slate-500 dark:text-slate-400">
              Value (USD)
            </div>
            <div className="mt-1 font-medium text-slate-900 dark:text-slate-50">
              {tx.value}
            </div>
          </div>
        </div>

        {/* From / Hash / Status */}
        <div className="space-y-3 text-xs">
          <div>
            <div className="mb-1 text-slate-500 dark:text-slate-400">
              From / To
            </div>
            <div className="rounded-xl bg-slate-50 px-3 py-2 font-mono text-[11px] text-slate-900 dark:bg-slate-900 dark:text-slate-50">
              {tx.from}
            </div>
          </div>

          <div>
            <div className="mb-1 text-slate-500 dark:text-slate-400">
              Transaction Hash
            </div>
            <div className="rounded-xl bg-slate-50 px-3 py-2 font-mono text-[11px] text-slate-900 dark:bg-slate-900 dark:text-slate-50">
              {tx.hash}
            </div>
          </div>
        </div>

        <div className="mt-5 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="
              inline-flex items-center justify-center rounded-xl
              border border-slate-200 px-4 py-2 text-sm
              text-slate-700 hover:bg-slate-50
              dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800
            "
          >
            Close
          </button>
        </div>
      </Card>
    </div>
  );
}
