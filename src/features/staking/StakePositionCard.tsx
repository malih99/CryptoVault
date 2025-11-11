import Card from "../../components/ui/Card";

export default function StakePositionCard({
  sym,
  staked,
  value,
  rewards,
  apy,
  lock = "Flexible",
  onStakeMore,
  onUnstake,
}: {
  sym: string;
  staked: string;
  value: string;
  rewards: string;
  apy: string;
  lock?: string;
  onStakeMore?: () => void;
  onUnstake?: () => void;
}) {
  return (
    <Card className="p-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex min-w-0 items-center gap-3">
          <div className="grid h-8 w-8 place-items-center rounded-full bg-emerald-500 font-bold text-black/90">
            {sym[0]}
          </div>
          <div className="truncate text-slate-900 dark:text-white">{sym}</div>
        </div>

        <div className="flex items-center gap-2">
          <span className="w-fit rounded-full bg-emerald-100 px-2 py-1 text-xs text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300">
            {apy} APY
          </span>
          <span className="w-fit rounded-full bg-slate-100 px-2 py-1 text-xs text-slate-700 dark:bg-slate-800 dark:text-slate-300">
            {lock}
          </span>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-5">
        <div>
          <div className="text-xs text-slate-500 dark:text-slate-400">
            Staked
          </div>
          <div className="text-slate-900 dark:text-white">{staked}</div>
        </div>

        <div>
          <div className="text-xs text-slate-500 dark:text-slate-400">
            Value
          </div>
          <div className="text-slate-900 dark:text-white">{value}</div>
        </div>

        <div>
          <div className="text-xs text-slate-500 dark:text-slate-400">
            Rewards
          </div>
          <div className="text-emerald-600 dark:text-emerald-400">
            {rewards}
          </div>
        </div>

        <div className="col-span-2 flex items-stretch gap-2 sm:col-span-2">
          <button
            type="button"
            onClick={onStakeMore}
            disabled={!onStakeMore}
            className="inline-flex w-full items-center justify-center gap-1 rounded-xl
                       bg-emerald-600 px-4 py-2 text-sm font-medium text-white
                       hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <StakeIcon className="h-4 w-4" />
            <span>Stake more</span>
          </button>
          <button
            type="button"
            onClick={onUnstake}
            disabled={!onUnstake}
            className="inline-flex w-full items-center justify-center gap-1 rounded-xl
                       border border-slate-200 px-4 py-2 text-sm text-slate-700
                       hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60
                       dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
          >
            <UnstakeIcon className="h-4 w-4" />
            <span>Unstake</span>
          </button>
        </div>
      </div>
    </Card>
  );
}

function StakeIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 20 20"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M10 4v12M4 10h12"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function UnstakeIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 20 20"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M10 4v10M6.5 7.5L10 4l3.5 3.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
