import Card from "../../components/ui/Card";
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
              <span className="rounded-lg bg-emerald-100 px-2 py-1 text-xs text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300">
                {o.apy} APY
              </span>

              <div className="flex gap-1.5">
                {onViewDetails && (
                  <button
                    type="button"
                    onClick={() => onViewDetails(o)}
                    className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-slate-200 px-2.5 py-1.5 text-[11px] text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
                  >
                    <EyeIcon className="h-3.5 w-3.5" />
                    <span>Details</span>
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => onStart(o)}
                  className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-emerald-600 px-2.5 py-1.5 text-[11px] font-medium text-white hover:bg-emerald-700"
                >
                  <RocketIcon className="h-3.5 w-3.5" />
                  <span>Stake</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

/* آیکون‌ها */

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

function RocketIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 20 20"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M10.5 2.5c2.7 0 4.5 1.8 4.5 4.5 0 2-1.2 3.8-2.8 5.4l-2.2 2.2-2.2-2.2C6.2 10.8 5 9 5 7c0-2.7 1.8-4.5 4.5-4.5Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <circle
        cx="10.5"
        cy="7"
        r="1.4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M6 14l-2 2M8 15l-1 3M12 15l1 3"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  );
}
