// src/components/tables/TxTable.tsx
import Card from "../ui/Card";
import { T, THEAD, TBODY, TR, TH, TD } from "../ui/Table";
import type {
  TxRecord,
  TxSortKey,
  TxSortDir,
} from "../../features/transactions/types";
import { useTranslation } from "react-i18next";
import {
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
} from "lucide-react";

type Props = {
  rows: TxRecord[];
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
  onSelectTx: (tx: TxRecord) => void;
  sortKey: TxSortKey;
  sortDir: TxSortDir;
  onRequestSort: (key: TxSortKey) => void;
};

function SortHeader({
  label,
  active,
  dir,
  onClick,
}: {
  label: string;
  active: boolean;
  dir: TxSortDir;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center gap-1 text-xs font-medium text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-100"
    >
      <span>{label}</span>
      <ArrowUpDown
        size={14}
        className={
          "transition-transform " +
          (active ? "" : "opacity-40") +
          (active && dir === "asc" ? " rotate-180" : "")
        }
      />
    </button>
  );
}

export default function TxTable({
  rows,
  page,
  pageSize,
  total,
  totalPages,
  onPageChange,
  onPageSizeChange,
  onSelectTx,
  sortKey,
  sortDir,
  onRequestSort,
}: Props) {
  const { t, i18n } = useTranslation();
  const isFa = i18n.language === "fa";

  const handlePrev = () => {
    if (page > 1) onPageChange(page - 1);
  };

  const handleNext = () => {
    if (page < totalPages) onPageChange(page + 1);
  };

  const handlePageSizeChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    const next = Number(e.target.value) || 10;
    onPageSizeChange(next);
    onPageChange(1);
  };

  const formatNumber = (v: number) =>
    v.toLocaleString(isFa ? "fa-IR" : "en-US");

  return (
    <Card className="p-4 sm:p-5">
      <div className="mb-3 flex items-center justify-between gap-2">
        <div className="text-sm font-medium text-slate-900 dark:text-slate-100">
          {t("transactions.title", "Transactions")}
        </div>
        <div className="text-xs text-slate-500 dark:text-slate-400">
          {t("transactions.total", "{{count}} results", { count: total })}
        </div>
      </div>

      {/* Mobile: cards */}
      <ul className="space-y-3 sm:hidden">
        {rows.map((tx) => (
          <li
            key={tx.hash}
            className="cursor-pointer rounded-xl border border-slate-200 bg-white p-3 shadow-sm transition hover:border-slate-300 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:hover:border-slate-700"
            onClick={() => onSelectTx(tx)}
          >
            <div className="mb-2 flex items-center justify-between gap-2">
              <div>
                <div className="text-sm font-medium text-slate-900 dark:text-slate-100">
                  {tx.token} · {formatNumber(tx.amount)}
                </div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400">
                  {tx.time}
                </div>
              </div>
              <div className="text-right text-xs">
                <div
                  className={
                    "inline-flex rounded-full px-2 py-0.5 text-[11px] " +
                    (tx.status === "confirmed"
                      ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300"
                      : "bg-amber-50 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300")
                  }
                >
                  {tx.status === "confirmed" ? "Confirmed" : "Pending"}
                </div>
                {tx.network && (
                  <div className="mt-1 text-[11px] text-slate-500 dark:text-slate-400">
                    {tx.network}
                  </div>
                )}
              </div>
            </div>

            <div className="mt-2 grid grid-cols-2 gap-2 text-xs">
              <div className="rounded-lg bg-slate-50 p-2 dark:bg-slate-800/60">
                <div className="text-[11px] text-slate-500 dark:text-slate-400">
                  {t("transactions.amount", "Amount")}
                </div>
                <div className="text-sm text-slate-900 dark:text-slate-100">
                  {formatNumber(tx.amount)}
                </div>
              </div>
              <div className="rounded-lg bg-slate-50 p-2 dark:bg-slate-800/60">
                <div className="text-[11px] text-slate-500 dark:text-slate-400">
                  {t("transactions.value", "Value (USD)")}
                </div>
                <div className="text-sm text-slate-900 dark:text-slate-100">
                  ${formatNumber(tx.value)}
                </div>
              </div>
              <div className="col-span-2 mt-1 flex items-center justify-between gap-2">
                <div className="truncate text-[11px] font-mono text-slate-500 dark:text-slate-400">
                  {tx.hash}
                </div>
                {tx.explorerUrl && (
                  <a
                    href={tx.explorerUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="inline-flex items-center gap-1 rounded-lg border border-slate-200 px-2 py-1 text-[11px] text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
                  >
                    <ExternalLink size={12} />
                    <span>{t("transactions.viewOnExplorer", "Explorer")}</span>
                  </a>
                )}
              </div>
            </div>
          </li>
        ))}
        {rows.length === 0 && (
          <li className="rounded-xl border border-dashed border-slate-200 p-4 text-center text-xs text-slate-500 dark:border-slate-700 dark:text-slate-400">
            {t("transactions.empty", "No transactions found for this filter.")}
          </li>
        )}
      </ul>

      {/* Desktop: table */}
      <div className="hidden sm:block overflow-x-auto">
        <T className="min-w-[840px]">
          <THEAD>
            <TR>
              <TH className="pl-2">
                <SortHeader
                  label={t("transactions.time", "Time")}
                  active={sortKey === "time"}
                  dir={sortDir}
                  onClick={() => onRequestSort("time")}
                />
              </TH>
              <TH>{t("transactions.token", "Token")}</TH>
              <TH>
                <SortHeader
                  label={t("transactions.amount", "Amount")}
                  active={sortKey === "amount"}
                  dir={sortDir}
                  onClick={() => onRequestSort("amount")}
                />
              </TH>
              <TH>
                <SortHeader
                  label={t("transactions.value", "Value (USD)")}
                  active={sortKey === "value"}
                  dir={sortDir}
                  onClick={() => onRequestSort("value")}
                />
              </TH>
              <TH>{t("transactions.status", "Status")}</TH>
              <TH>{t("transactions.network", "Network")}</TH>
              <TH className="pr-2 text-right">
                {t("transactions.hash", "Hash / Explorer")}
              </TH>
            </TR>
          </THEAD>
          <TBODY>
            {rows.map((tx) => (
              <TR
                key={tx.hash}
                className="cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-900/40"
                onClick={() => onSelectTx(tx)}
              >
                <TD className="pl-2 text-xs text-slate-500 dark:text-slate-400">
                  {tx.time}
                </TD>
                <TD>
                  <div className="flex items-center gap-2">
                    <div className="h-7 w-7 rounded-full bg-emerald-500 text-xs font-bold text-white grid place-items-center">
                      {tx.token[0]}
                    </div>
                    <div>
                      <div className="text-sm font-medium text-slate-900 dark:text-slate-100">
                        {tx.token}
                      </div>
                    </div>
                  </div>
                </TD>
                <TD className="text-sm text-slate-800 dark:text-slate-100">
                  {formatNumber(tx.amount)}
                </TD>
                <TD className="text-sm text-slate-800 dark:text-slate-100">
                  ${formatNumber(tx.value)}
                </TD>
                <TD>
                  <span
                    className={
                      "inline-flex rounded-full px-2 py-0.5 text-[11px] " +
                      (tx.status === "confirmed"
                        ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300"
                        : "bg-amber-50 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300")
                    }
                  >
                    {tx.status === "confirmed" ? "Confirmed" : "Pending"}
                  </span>
                </TD>
                <TD>
                  {tx.network ? (
                    <span className="inline-flex rounded-full bg-slate-100 px-2 py-0.5 text-[11px] text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                      {tx.network}
                    </span>
                  ) : (
                    <span className="text-[11px] text-slate-400 dark:text-slate-500">
                      –
                    </span>
                  )}
                </TD>
                <TD className="pr-2 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <span className="max-w-[160px] truncate text-[11px] font-mono text-slate-500 dark:text-slate-400">
                      {tx.hash}
                    </span>
                    {tx.explorerUrl && (
                      <a
                        href={tx.explorerUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-slate-200 text-slate-500 hover:bg-slate-50 hover:text-slate-800 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-slate-100"
                        aria-label={t(
                          "transactions.viewOnExplorer",
                          "View on explorer"
                        )}
                      >
                        <ExternalLink size={13} />
                      </a>
                    )}
                  </div>
                </TD>
              </TR>
            ))}
            {rows.length === 0 && (
              <TR>
                <TD
                  colSpan={7}
                  className="py-6 text-center text-xs text-slate-500 dark:text-slate-400"
                >
                  {t(
                    "transactions.empty",
                    "No transactions found for this filter."
                  )}
                </TD>
              </TR>
            )}
          </TBODY>
        </T>
      </div>

      {/* Pagination */}
      <div className="mt-4 flex flex-col items-center justify-between gap-3 text-xs text-slate-500 sm:flex-row dark:text-slate-400">
        <div className="flex items-center gap-2">
          <span>{t("transactions.rowsPerPage", "Rows per page")}:</span>
          <select
            className="rounded-md border border-slate-200 bg-white px-2 py-1 text-xs text-slate-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
            value={pageSize}
            onChange={handlePageSizeChange}
          >
            {[10, 20, 50].map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handlePrev}
            disabled={page <= 1}
            className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-slate-200 text-slate-500 hover:bg-slate-50 disabled:opacity-40 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
          >
            <ChevronLeft size={14} />
          </button>
          <span>
            {t("transactions.page", "Page")} {page} {t("transactions.of", "of")}{" "}
            {totalPages}
          </span>
          <button
            type="button"
            onClick={handleNext}
            disabled={page >= totalPages}
            className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-slate-200 text-slate-500 hover:bg-slate-50 disabled:opacity-40 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
          >
            <ChevronRight size={14} />
          </button>
        </div>
      </div>
    </Card>
  );
}
