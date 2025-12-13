import { useEffect, useState } from "react";
import type { TxRecord } from "./types";
import Card from "../../components/ui/Card";
import { formatCurrency } from "../../lib/format";
import { useSettings } from "../settings/useSettings";

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

function getExplorerUrl(
  network: "sol-mainnet" | "eth-mainnet",
  hash: string
): string {
  if (!hash) return "";
  if (network === "eth-mainnet") {
    return `https://etherscan.io/tx/${hash}`;
  }
  // sol-mainnet
  return `https://solscan.io/tx/${hash}`;
}

export default function TxDetailsModal({ tx, onClose }: Props) {
  const [copied, setCopied] = useState<null | "from" | "to" | "hash">(null);
  const { settings } = useSettings();
  const explorerUrl = getExplorerUrl(settings.defaultNetwork, tx.hash);

  // ESC برای بستن
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [onClose]);

  const handleCopy = (value: string, field: "from" | "to" | "hash") => {
    if (typeof navigator === "undefined") return;

    const doSetCopied = () => {
      setCopied(field);
      setTimeout(() => {
        setCopied((prev) => (prev === field ? null : prev));
      }, 1500);
    };

    if ("clipboard" in navigator) {
      navigator.clipboard
        .writeText(value)
        .then(doSetCopied)
        .catch(() => {});
    } else {
      try {
        const textarea = document.createElement("textarea");
        textarea.value = value;
        textarea.style.position = "fixed";
        textarea.style.opacity = "0";
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
        doSetCopied();
      } catch {
        // ignore
      }
    }
  };

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
              {formatCurrency(tx.value, "USD")}
            </div>
          </div>
        </div>

        {/* From / To / Hash */}
        <div className="space-y-3 text-xs">
          {/* From */}
          <div>
            <div className="mb-1 flex items-center justify-between">
              <span className="text-slate-500 dark:text-slate-400">From</span>
              <button
                type="button"
                onClick={() => handleCopy(tx.from, "from")}
                className={`
                  inline-flex items-center gap-1 rounded-lg px-2 py-1
                  ${
                    copied === "from"
                      ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300"
                      : "text-slate-500 hover:bg-slate-100 hover:text-slate-700 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100"
                  }
                `}
              >
                {copied === "from" ? (
                  <>
                    <CheckIcon className="h-3.5 w-3.5" />
                    <span>Copied</span>
                  </>
                ) : (
                  <>
                    <CopyIcon className="h-3.5 w-3.5" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
            <div className="rounded-xl bg-slate-50 px-3 py-2 font-mono text-[11px] text-slate-900 dark:bg-slate-900 dark:text-slate-50">
              {tx.from || "—"}
            </div>
          </div>

          {/* To */}
          <div>
            <div className="mb-1 flex items-center justify-between">
              <span className="text-slate-500 dark:text-slate-400">To</span>
              <button
                type="button"
                onClick={() => handleCopy(tx.to, "to")}
                className={`
                  inline-flex items-center gap-1 rounded-lg px-2 py-1
                  ${
                    copied === "to"
                      ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300"
                      : "text-slate-500 hover:bg-slate-100 hover:text-slate-700 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100"
                  }
                `}
              >
                {copied === "to" ? (
                  <>
                    <CheckIcon className="h-3.5 w-3.5" />
                    <span>Copied</span>
                  </>
                ) : (
                  <>
                    <CopyIcon className="h-3.5 w-3.5" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
            <div className="rounded-xl bg-slate-50 px-3 py-2 font-mono text-[11px] text-slate-900 dark:bg-slate-900 dark:text-slate-50">
              {tx.to || "—"}
            </div>
          </div>

          {/* Hash + Explorer */}
          <div>
            <div className="mb-1 flex items-center justify-between">
              <span className="text-slate-500 dark:text-slate-400">
                Transaction Hash
              </span>
              <div className="flex items-center gap-2">
                {explorerUrl && (
                  <a
                    href={explorerUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="
                      text-[11px] font-medium text-emerald-600 hover:underline
                      dark:text-emerald-300
                    "
                  >
                    View on explorer
                  </a>
                )}
                <button
                  type="button"
                  onClick={() => handleCopy(tx.hash, "hash")}
                  className={`
                    inline-flex items-center gap-1 rounded-lg px-2 py-1
                    ${
                      copied === "hash"
                        ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300"
                        : "text-slate-500 hover:bg-slate-100 hover:text-slate-700 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100"
                    }
                  `}
                >
                  {copied === "hash" ? (
                    <>
                      <CheckIcon className="h-3.5 w-3.5" />
                      <span>Copied</span>
                    </>
                  ) : (
                    <>
                      <CopyIcon className="h-3.5 w-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
            </div>
            <div className="rounded-xl bg-slate-50 px-3 py-2 font-mono text-[11px] text-slate-900 dark:bg-slate-900 dark:text-slate-50">
              {tx.hash}
            </div>
          </div>
        </div>

        {/* Footer */}
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

/** آیکون کپی کوچک */
function CopyIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 20 20"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <rect
        x="7"
        y="3"
        width="10"
        height="12"
        rx="2"
        ry="2"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <rect
        x="3"
        y="7"
        width="10"
        height="10"
        rx="2"
        ry="2"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  );
}

/** آیکون تیک کوچک */
function CheckIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 20 20"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <circle
        cx="10"
        cy="10"
        r="8"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M6 10.5L8.5 13l5.5-6"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
