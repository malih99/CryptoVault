import { useState } from "react";
import Card from "../../components/ui/Card";
import { T, THEAD, TBODY, TR, TH, TD } from "../../components/ui/Table";
import type { TxRecord } from "../../features/transactions/types";
import { formatCurrency } from "../../lib/format";

type SortKey = "time" | "amount" | "value";
type SortDir = "asc" | "desc";

type Props = {
  rows: TxRecord[];
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
  onSelectTx?: (tx: TxRecord) => void;

  // 🔽 سورتینگ
  sortKey?: SortKey;
  sortDir?: SortDir;
  onRequestSort?: (key: SortKey) => void;
};

export default function TxTable({
  rows,
  page,
  pageSize,
  total,
  totalPages,
  onPageChange,
  onPageSizeChange,
  onSelectTx,

  sortKey = "time",
  sortDir = "desc",
  onRequestSort,
}: Props) {
  const isEmpty = rows.length === 0;
  const [copiedHash, setCopiedHash] = useState<string | null>(null);

  const from = total === 0 ? 0 : (page - 1) * pageSize + 1;
  const to = Math.min(total, page * pageSize);

  const handleCopyHash = (hash: string) => {
    if (typeof navigator === "undefined") return;
    const doSetCopied = () => {
      setCopiedHash(hash);
      setTimeout(() => {
        setCopiedHash((prev) => (prev === hash ? null : prev));
      }, 1500);
    };
    if ("clipboard" in navigator) {
      navigator.clipboard
        .writeText(hash)
        .then(doSetCopied)
        .catch(() => {});
    } else {
      try {
        const textarea = document.createElement("textarea");
        textarea.value = hash;
        textarea.style.position = "fixed";
        textarea.style.opacity = "0";
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
        doSetCopied();
      } catch {
        /* noop */
      }
    }
  };

  if (isEmpty) {
    return (
      <Card className="p-4 sm:p-5">
        <div className="mb-2 text-sm font-medium text-slate-900 dark:text-slate-50">
          Transactions
        </div>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          No transactions match your current filters.
        </p>
      </Card>
    );
  }

  const SortButton = ({
    label,
    active,
    dir,
    onClick,
    className = "",
  }: {
    label: string;
    active: boolean;
    dir: SortDir;
    onClick?: () => void;
    className?: string;
  }) => (
    <button
      type="button"
      onClick={onClick}
      className={[
        "inline-flex items-center gap-1.5 hover:underline underline-offset-4",
        active
          ? "text-slate-900 dark:text-slate-50"
          : "text-slate-600 dark:text-slate-300",
        className,
      ].join(" ")}
      aria-label={`Sort by ${label}`}
    >
      <span>{label}</span>
      <span className="text-[10px]" aria-hidden>
        {active ? (dir === "asc" ? "▲" : "▼") : "↕"}
      </span>
    </button>
  );

  const amountText = (r: TxRecord) => {
    const isOut = r.type === "out";
    const sign = isOut ? "-" : "+";
    return `${sign}${Math.abs(r.amount)}`;
  };

  return (
    <Card className="p-4 sm:p-5">
      <div className="mb-3 flex items-center justify-between">
        <div className="text-sm font-medium text-slate-900 dark:text-slate-50">
          Transactions
        </div>
      </div>

      {/* Mobile & Tablet: cards */}
      <div className="grid gap-3 lg:hidden">
        {rows.map((r, i) => {
          const isCopied = copiedHash === r.hash;
          const isOut = r.type === "out";
          return (
            <div
              key={i}
              className="
                grid grid-cols-1 gap-2 rounded-xl border
                border-slate-200 bg-slate-50/80 px-3 py-3
                dark:border-slate-800 dark:bg-slate-900
              "
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span
                    className={`
                      inline-flex h-7 w-7 items-center justify-center rounded-lg text-sm
                      ${
                        r.type === "in"
                          ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300"
                          : r.type === "swap"
                          ? "bg-amber-50 text-amber-700 dark:bg-amber-900 dark:text-amber-300"
                          : "bg-rose-50 text-rose-700 dark:bg-rose-900 dark:text-rose-300"
                      }
                    `}
                  >
                    {r.type === "in" ? "↙" : r.type === "swap" ? "⇄" : "↗"}
                  </span>
                  <div className="text-sm text-slate-900 dark:text-slate-50">
                    {r.token}
                  </div>
                </div>
                <span
                  className={`
                    text-sm font-medium
                    ${
                      isOut
                        ? "text-rose-600 dark:text-rose-300"
                        : "text-emerald-600 dark:text-emerald-300"
                    }
                  `}
                >
                  {amountText(r)}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="space-y-0.5">
                  <div className="text-slate-500 dark:text-slate-400">
                    Value
                  </div>
                  <div className="text-slate-900 dark:text-slate-50">
                    {formatCurrency(r.value, "USD")}
                  </div>
                </div>
                <div className="space-y-0.5">
                  <div className="text-slate-500 dark:text-slate-400">Time</div>
                  <div className="text-slate-900 dark:text-slate-50">
                    {r.time}
                  </div>
                </div>
                <div className="col-span-2 space-y-0.5">
                  <div className="text-slate-500 dark:text-slate-400">
                    From/To
                  </div>
                  <div className="truncate text-slate-900 dark:text-slate-50">
                    {r.from}
                  </div>
                </div>
                <div className="col-span-2 space-y-0.5">
                  <div className="flex items-center justify-between">
                    <div className="text-slate-500 dark:text-slate-400">
                      Hash
                    </div>
                    <button
                      type="button"
                      onClick={() => handleCopyHash(r.hash)}
                      className={`flex items-center justify-center rounded-md p-1 ${
                        isCopied
                          ? "text-emerald-600 dark:text-emerald-300"
                          : "text-slate-400 hover:text-emerald-600 dark:text-slate-500 dark:hover:text-emerald-300"
                      }`}
                      aria-label={
                        isCopied ? "Hash copied" : "Copy transaction hash"
                      }
                    >
                      {isCopied ? <CheckIcon /> : <CopyIcon />}
                    </button>
                  </div>
                  <div className="truncate text-slate-900 dark:text-slate-50">
                    {r.hash}
                  </div>
                </div>
              </div>

              <div className="mt-1 flex items-center justify-between">
                <span
                  className={`
                    rounded-full px-2 py-1 text-[11px]
                    ${
                      r.status === "confirmed"
                        ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-900/70 dark:text-emerald-300"
                        : "bg-amber-50 text-amber-700 dark:bg-amber-900/70 dark:text-amber-300"
                    }
                  `}
                >
                  {r.status}
                </span>

                {onSelectTx && (
                  <button
                    type="button"
                    onClick={() => onSelectTx(r)}
                    className="
                      inline-flex items-center gap-1 rounded-lg border
                      border-slate-200 bg-white px-2 py-1 text-[11px] font-medium
                      text-slate-700 hover:bg-slate-50
                      dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800
                    "
                    aria-label="View transaction details"
                  >
                    <EyeIcon className="h-3.5 w-3.5" />
                    <span className="hidden xs:inline sm:inline">Details</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Desktop (lg+): full table */}
      <div className="hidden overflow-x-auto lg:block">
        <T>
          <THEAD>
            <TR>
              <TH>Type</TH>
              <TH>Token</TH>
              <TH>
                <SortButton
                  label="Amount"
                  active={sortKey === "amount"}
                  dir={sortDir}
                  onClick={() => onRequestSort?.("amount")}
                />
              </TH>
              <TH>
                <SortButton
                  label="Value"
                  active={sortKey === "value"}
                  dir={sortDir}
                  onClick={() => onRequestSort?.("value")}
                />
              </TH>
              <TH>From/To</TH>
              <TH>Hash</TH>
              <TH className="whitespace-nowrap">
                <SortButton
                  label="Time"
                  active={sortKey === "time"}
                  dir={sortDir}
                  onClick={() => onRequestSort?.("time")}
                />
              </TH>
              <TH>Status</TH>
              {onSelectTx && <TH className="text-right">Details</TH>}
            </TR>
          </THEAD>
          <TBODY>
            {rows.map((r, i) => {
              const isCopied = copiedHash === r.hash;
              const isOut = r.type === "out";
              return (
                <TR key={i}>
                  <TD
                    className={
                      r.type === "in"
                        ? "font-medium text-emerald-600 dark:text-emerald-300"
                        : r.type === "swap"
                        ? "font-medium text-amber-600 dark:text-amber-300"
                        : "font-medium text-rose-600 dark:text-rose-300"
                    }
                  >
                    {r.type === "in" ? "↙" : r.type === "swap" ? "⇄" : "↗"}
                  </TD>
                  <TD>{r.token}</TD>
                  <TD
                    className={
                      isOut
                        ? "text-rose-600 dark:text-rose-300"
                        : "text-emerald-600 dark:text-emerald-300"
                    }
                  >
                    {amountText(r)}
                  </TD>
                  <TD>{formatCurrency(r.value, "USD")}</TD>
                  <TD className="max-w-[280px] truncate">{r.from}</TD>
                  <TD className="max-w-[260px]">
                    <div className="flex items-center justify-between gap-2">
                      <span className="truncate">{r.hash}</span>
                      <button
                        type="button"
                        onClick={() => handleCopyHash(r.hash)}
                        className={`flex h-7 w-7 items-center justify-center rounded-md ${
                          isCopied
                            ? "text-emerald-600 dark:text-emerald-300 bg-emerald-50/60 dark:bg-emerald-900/30"
                            : "text-slate-400 hover:text-emerald-600 hover:bg-slate-100 dark:text-slate-500 dark:hover:text-emerald-300 dark:hover:bg-slate-800"
                        }`}
                        aria-label={
                          isCopied ? "Hash copied" : "Copy transaction hash"
                        }
                      >
                        {isCopied ? <CheckIcon /> : <CopyIcon />}
                      </button>
                    </div>
                  </TD>
                  <TD>{r.time}</TD>
                  <TD>
                    <span
                      className={`rounded-full px-2 py-1 text-xs ${
                        r.status === "confirmed"
                          ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-900/70 dark:text-emerald-300"
                          : "bg-amber-50 text-amber-700 dark:bg-amber-900/70 dark:text-amber-300"
                      }`}
                    >
                      {r.status}
                    </span>
                  </TD>
                  {onSelectTx && (
                    <TD className="text-right">
                      <button
                        type="button"
                        onClick={() => onSelectTx(r)}
                        className="
                          inline-flex items-center gap-1 rounded-lg border
                          border-slate-200 bg-white px-2 py-1 text-xs
                          text-slate-700 hover:bg-slate-50
                          dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800
                        "
                        aria-label="View transaction details"
                      >
                        <EyeIcon className="h-3.5 w-3.5" />
                        <span className="hidden md:inline">View</span>
                      </button>
                    </TD>
                  )}
                </TR>
              );
            })}
          </TBODY>
        </T>
      </div>

      {/* Pagination footer */}
      <div className="mt-4 flex flex-col items-center justify-between gap-3 border-t border-slate-100 pt-3 text-xs text-slate-500 dark:border-slate-800 dark:text-slate-400 sm:flex-row">
        <div>
          Showing{" "}
          <span className="font-medium text-slate-700 dark:text-slate-200">
            {from}
          </span>
          {"–"}
          <span className="font-medium text-slate-700 dark:text-slate-200">
            {to}
          </span>{" "}
          of{" "}
          <span className="font-medium text-slate-700 dark:text-slate-200">
            {total}
          </span>{" "}
          transactions
        </div>

        <div className="flex items-center gap-2">
          <select
            className="h-8 rounded-lg border border-slate-200 bg-white px-2 text-xs text-slate-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
            value={pageSize}
            onChange={(e) => onPageSizeChange(Number(e.target.value) || 10)}
          >
            <option value={5}>5 / page</option>
            <option value={10}>10 / page</option>
            <option value={20}>20 / page</option>
            <option value={50}>50 / page</option>
          </select>

          <div className="inline-flex items-center gap-1 rounded-lg border border-slate-200 px-1 py-0.5 dark:border-slate-700">
            <button
              type="button"
              disabled={page === 1}
              onClick={() => onPageChange(page - 1)}
              className="rounded-md px-2 py-1 text-[11px] disabled:opacity-40 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              Prev
            </button>
            <span className="px-2 text-[11px] sm:text-xs">
              Page {page} of {totalPages}
            </span>
            <button
              type="button"
              disabled={page === totalPages}
              onClick={() => onPageChange(page + 1)}
              className="rounded-md px-2 py-1 text-[11px] disabled:opacity-40 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </Card>
  );
}

/** آیکون کپی */
function CopyIcon() {
  return (
    <svg
      viewBox="0 0 20 20"
      className="h-4 w-4"
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

/** آیکون تیک */
function CheckIcon() {
  return (
    <svg
      viewBox="0 0 20 20"
      className="h-4 w-4"
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

function EyeIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M2.5 12c1.7-3.3 4.5-5.5 9.5-5.5S19.3 8.7 21 12c-1.7 3.3-4.5 5.5-9.5 5.5S4.2 15.3 2.5 12Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <circle
        cx="12"
        cy="12"
        r="2.8"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  );
}
