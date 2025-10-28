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
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <div className="grid h-8 w-8 place-items-center rounded-full bg-emerald-500 font-bold text-black/90">
            {sym[0]}
          </div>
          <div className="truncate text-slate-900 dark:text-white">{sym}</div>
        </div>

        <div className="flex items-center gap-2">
          <span className="w-fit rounded-full bg-emerald-100 text-emerald-700 px-2 py-1 text-xs dark:bg-emerald-900/50 dark:text-emerald-300">
            {apy} APY
          </span>
          <span className="w-fit rounded-full bg-slate-100 text-slate-700 px-2 py-1 text-xs dark:bg-slate-800 dark:text-slate-300">
            {lock}
          </span>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 sm:grid-cols-5 gap-4">
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

        <div className="col-span-2 sm:col-span-2 flex items-stretch gap-2">
          <button
            onClick={onStakeMore}
            className="w-full rounded-xl border px-4 py-2 text-slate-700 border-slate-200 hover:bg-slate-50
                       dark:text-slate-200 dark:border-slate-700 dark:hover:bg-slate-800"
          >
            Stake More
          </button>
          <button
            onClick={onUnstake}
            className="w-full rounded-xl border px-4 py-2 text-slate-700 border-slate-200 hover:bg-slate-50
                       dark:text-slate-200 dark:border-slate-700 dark:hover:bg-slate-800"
          >
            Unstake
          </button>
        </div>
      </div>
    </Card>
  );
}
