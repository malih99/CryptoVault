import Card from "../../components/ui/Card";
import Button, { IconButton } from "../../components/ui/Button";
import { X, ArrowUpRight } from "lucide-react";
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

          <IconButton
            srLabel="Close"
            onClick={onClose}
            variant="ghost"
            size="sm"
            className="shrink-0"
          >
            <X size={16} />
          </IconButton>
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
          <Button type="button" variant="ghost" size="sm" onClick={onClose}>
            Cancel
          </Button>
          <Button
            type="button"
            variant="primary"
            size="sm"
            startIcon={<ArrowUpRight size={14} />}
            onClick={() => onStart(opportunity)}
          >
            Start Staking
          </Button>
        </div>
      </Card>
    </div>
  );
}
