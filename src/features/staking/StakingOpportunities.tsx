import Card from "../../components/ui/Card";
import { Eye, PlusCircle } from "lucide-react";
import type { StakingOpportunity } from "./types";

type Props = {
  opportunities: StakingOpportunity[];
  onStart: (opportunity: StakingOpportunity) => void;
  onViewDetails?: (opportunity: StakingOpportunity) => void;
};

export default function StakingOpportunities({
  opportunities,
  onStart,
  onViewDetails,
}: Props) {
  return (
    <Card className="p-5">
      <div className="mb-4 font-medium text-slate-900 dark:text-white">
        Available Staking Opportunities
      </div>
      <div className="grid gap-3">
        {opportunities.map((o) => (
          <div
            key={o.sym}
            className="flex items-center justify-between rounded-xl border border-slate-200 p-4 dark:border-slate-700 dark:bg-slate-900/40"
          >
            <div className="flex items-center gap-3">
              <div className="grid h-8 w-8 place-items-center rounded-full bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-200">
                {o.sym[0]}
              </div>
              <div>
                <div className="font-medium text-slate-900 dark:text-white">
                  {o.name}
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400">
                  Min stake: {o.min}
                </div>
                <div className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                  Lock: {o.lock}
                </div>
              </div>
            </div>

            <div className="flex flex-col items-end gap-2 sm:flex-row sm:items-center">
              <span className="rounded-lg bg-emerald-100 px-2 py-1 text-[11px] font-medium text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300">
                {o.apy} APY
              </span>

              <div className="flex gap-1.5">
                {onViewDetails && (
                  <button
                    type="button"
                    onClick={() => onViewDetails(o)}
                    className="inline-flex items-center justify-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-[11px] font-medium text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
                    aria-label="View details"
                  >
                    <Eye className="h-3.5 w-3.5" />
                    <span className="hidden sm:inline">Details</span>
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => onStart(o)}
                  className="inline-flex items-center justify-center gap-1 rounded-lg bg-emerald-600 px-2.5 py-1 text-[11px] font-medium text-white hover:bg-emerald-700"
                >
                  <PlusCircle className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">Stake</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
