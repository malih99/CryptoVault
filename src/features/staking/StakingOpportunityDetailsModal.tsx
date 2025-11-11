import Card from "../../components/ui/Card";
import type { StakingOpportunity } from "./types";

type Props = {
  opportunity: StakingOpportunity;
  onClose: () => void;
  onStart: (opportunity: StakingOpportunity) => void;
};

export default function StakingOpportunityDetailsModal({
  opportunity,
  onClose,
  onStart,
}: Props) {
  return (
    <div
      className="fixed inset-0 z-40 flex items-center justify-center bg-slate-900/60 px-3"
      aria-modal="true"
      role="dialog"
    >
      <div className="absolute inset-0" onClick={onClose} aria-hidden="true" />

      <Card className="relative z-10 w-full max-w-md p-5 sm:p-6">
        {/* Header */}
        <div className="mb-4 flex items-start justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <div className="grid h-9 w-9 place-items-center rounded-full bg-slate-200 text-sm font-semibold text-slate-800 dark:bg-slate-800 dark:text-slate-100">
                {opportunity.sym[0]}
              </div>
              <div>
                <div className="text-sm font-semibold text-slate-900 dark:text-slate-50">
                  {opportunity.name}
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400">
                  {opportunity.sym} staking opportunity
                </div>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-8 w-8 items-center justify-center rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-700 dark:text-slate-500 dark:hover:bg-slate-800 dark:hover:text-slate-200"
            aria-label="Close"
          >
            <span className="text-lg leading-none">&times;</span>
          </button>
        </div>

        {/* APY & details */}
        <div className="mb-4 grid grid-cols-2 gap-3 text-sm">
          <div className="rounded-xl bg-emerald-50 p-3 dark:bg-emerald-900/20">
            <div className="text-xs text-emerald-700 dark:text-emerald-300">
              Current APY
            </div>
            <div className="mt-1 text-lg font-semibold text-emerald-700 dark:text-emerald-300">
              {opportunity.apy}
            </div>
          </div>

          <div className="rounded-xl bg-slate-50 p-3 dark:bg-slate-900">
            <div className="text-xs text-slate-500 dark:text-slate-400">
              Lock period
            </div>
            <div className="mt-1 text-sm font-medium text-slate-900 dark:text-slate-50">
              {opportunity.lock}
            </div>
            <div className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
              Min stake: {opportunity.min}
            </div>
          </div>
        </div>

        <div className="mb-4 space-y-2 text-xs text-slate-500 dark:text-slate-400">
          <p>
            Staking this asset will lock your tokens for the specified lock
            period. You&apos;ll earn rewards based on the APY shown, which may
            change over time depending on network conditions.
          </p>
          <p>
            This is a demo interface. No real blockchain transactions will be
            broadcast.
          </p>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="inline-flex items-center justify-center rounded-xl border border-slate-200 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => onStart(opportunity)}
            className="inline-flex items-center justify-center rounded-xl bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700"
          >
            Start Staking
          </button>
        </div>
      </Card>
    </div>
  );
}
