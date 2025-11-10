import Card from "../../components/ui/Card";
import { T, THEAD, TBODY, TR, TH, TD } from "../../components/ui/Table";
import type { TxRecord } from "../../features/transactions/types";

type Props = {
  rows: TxRecord[];
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
};

export default function TxTable({
  rows,
  page,
  pageSize,
  total,
  totalPages,
  onPageChange,
  onPageSizeChange,
}: Props) {
  const isEmpty = rows.length === 0;

  const from = total === 0 ? 0 : (page - 1) * pageSize + 1;
  const to = Math.min(total, page * pageSize);

  const handleCopyHash = (hash: string) => {
    if (typeof navigator === "undefined") return;

    if ("clipboard" in navigator) {
      navigator.clipboard.writeText(hash).catch(() => {
        // ignore
      });
    } else {
      // fallback ساده
      const textarea = document.createElement("textarea");
      textarea.value = hash;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      try {
        document.execCommand("copy");
      } catch {
        // ignore
      }
      document.body.removeChild(textarea);
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

  return (
    <Card className="p-4 sm:p-5">
      <div className="mb-3 text-sm font-medium text-slate-900 dark:text-slate-50">
        Transactions
      </div>

      {/* Mobile & Tablet: cards */}
      <div className="grid gap-3 lg:hidden">
        {rows.map((r, i) => (
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
                    r.amount.startsWith("-")
                      ? "text-rose-600 dark:text-rose-300"
                      : "text-emerald-600 dark:text-emerald-300"
                  }
                `}
              >
                {r.amount}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="space-y-0.5">
                <div className="text-slate-500 dark:text-slate-400">Value</div>
                <div className="text-slate-900 dark:text-slate-50">
                  {r.value}
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
                  <div className="text-slate-500 dark:text-slate-400">Hash</div>
                  <button
                    type="button"
                    onClick={() => handleCopyHash(r.hash)}
                    className="text-[11px] text-emerald-600 hover:text-emerald-700 dark:text-emerald-300 dark:hover:text-emerald-200"
                  >
                    Copy
                  </button>
                </div>
                <div className="truncate text-slate-900 dark:text-slate-50">
                  {r.hash}
                </div>
              </div>
            </div>

            <div className="flex justify-end">
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
            </div>
          </div>
        ))}
      </div>

      {/* Desktop (lg+): full table */}
      <div className="hidden overflow-x-auto lg:block">
        <T>
          <THEAD>
            <TR>
              <TH>Type</TH>
              <TH>Token</TH>
              <TH>Amount</TH>
              <TH>Value</TH>
              <TH>From/To</TH>
              <TH>Hash</TH>
              <TH>Time</TH>
              <TH>Status</TH>
            </TR>
          </THEAD>
          <TBODY>
            {rows.map((r, i) => (
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
                    r.amount.startsWith("-")
                      ? "text-rose-600 dark:text-rose-300"
                      : "text-emerald-600 dark:text-emerald-300"
                  }
                >
                  {r.amount}
                </TD>
                <TD>{r.value}</TD>
                <TD className="max-w-[280px] truncate">{r.from}</TD>
                <TD className="max-w-[220px]">
                  <div className="flex items-center justify-between gap-2">
                    <span className="truncate">{r.hash}</span>
                    <button
                      type="button"
                      onClick={() => handleCopyHash(r.hash)}
                      className="text-[11px] text-emerald-600 hover:text-emerald-700 dark:text-emerald-300 dark:hover:text-emerald-200"
                    >
                      Copy
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
              </TR>
            ))}
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
