import type { TxTypeFilter, TxStatusFilter } from "./types";

type Props = {
  typeFilter: TxTypeFilter;
  statusFilter: TxStatusFilter;
  onTypeChange: (value: TxTypeFilter) => void;
  onStatusChange: (value: TxStatusFilter) => void;
};

const pills: {
  id: string;
  label: string;
  type: TxTypeFilter;
  status: TxStatusFilter;
}[] = [
  { id: "all", label: "All", type: "all", status: "all" },
  { id: "received", label: "Received", type: "in", status: "all" },
  { id: "sent", label: "Sent", type: "out", status: "all" },
  { id: "swapped", label: "Swapped", type: "swap", status: "all" },
  { id: "pending", label: "Pending", type: "all", status: "pending" },
];

export default function TxQuickFilters({
  typeFilter,
  statusFilter,
  onTypeChange,
  onStatusChange,
}: Props) {
  return (
    <div className="flex flex-wrap gap-2 text-xs sm:text-[13px]">
      {pills.map((pill) => {
        const active = typeFilter === pill.type && statusFilter === pill.status;

        return (
          <button
            key={pill.id}
            type="button"
            onClick={() => {
              onTypeChange(pill.type);
              onStatusChange(pill.status);
            }}
            className={`
              inline-flex items-center rounded-full border px-3 py-1
              transition-colors
              ${
                active
                  ? "border-emerald-500 bg-emerald-50 text-emerald-700 dark:border-emerald-400 dark:bg-emerald-900/40 dark:text-emerald-200"
                  : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
              }
            `}
          >
            {pill.label}
          </button>
        );
      })}
    </div>
  );
}
