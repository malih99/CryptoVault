import Card from "../../components/ui/Card";
import type { StakingOpportunity } from "./StakingOpportunities";

type Props = {
  opportunity: StakingOpportunity;
  onClose: () => void;
  onStart?: (opportunity: StakingOpportunity) => void;
};

export default function StakingOpportunityDetailsModal({
  opportunity,
  onClose,
  onStart,
}: Props) {
  const handleStart = () => {
    if (onStart) {
      onStart(opportunity);
    }
    onClose();
  };

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
                  {opportunity.name} ({opportunity.sym})
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400">
                  Staking pool details
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

        {/* Main info */}
        <div className="mb-4 grid grid-cols-2 gap-3 text-sm">
          <div className="rounded-xl bg-slate-50 p-3 dark:bg-slate-900">
            <div className="text-xs text-slate-500 dark:text-slate-400">
              Current APY
            </div>
            <div className="mt-1 text-base font-semibold text-emerald-600 dark:text-emerald-400">
              {opportunity.apy}
            </div>
          </div>
          <div className="rounded-xl bg-slate-50 p-3 dark:bg-slate-900">
            <div className="text-xs text-slate-500 dark:text-slate-400">
              Lock period
            </div>
            <div className="mt-1 text-sm text-slate-900 dark:text-slate-50">
              {opportunity.lock}
            </div>
          </div>
          <div className="col-span-2 rounded-xl bg-slate-50 p-3 text-sm text-slate-900 dark:bg-slate-900 dark:text-slate-50">
            <div className="text-xs text-slate-500 dark:text-slate-400">
              Minimum stake
            </div>
            <div className="mt-1">{opportunity.min}</div>
          </div>
        </div>

        {/* Extra info (static) */}
        <div className="space-y-2 text-xs text-slate-500 dark:text-slate-400">
          <p>
            Rewards are distributed periodically based on network conditions and
            validator performance. APY is variable and may change over time.
          </p>
          <ul className="list-disc pl-5">
            <li>You can track your rewards in the Staking dashboard.</li>
            <li>Unstaking may require waiting for the full lock period.</li>
          </ul>
        </div>

        {/* Actions */}
        <div className="mt-5 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onClose}
            className="inline-flex w-full items-center justify-center rounded-xl border border-slate-200 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800 sm:w-auto"
          >
            Close
          </button>
          <button
            type="button"
            onClick={handleStart}
            className="inline-flex w-full items-center justify-center rounded-xl bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700 sm:w-auto"
          >
            Start staking with this pool
          </button>
        </div>
      </Card>
    </div>
  );
}
