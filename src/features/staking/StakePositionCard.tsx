import Card from "../../components/ui/Card";

type Props = {
  sym: string;
  staked: string;
  value: string;
  rewards: string;
  apy: string;
  lock?: string;
  onStakeMore?: () => void;
  onUnstake?: () => void;
};

function parseApy(apy: string): number {
  return Number(apy.replace(/[^0-9.]/g, "")) || 0;
}

function apyLevel(apy: string): "normal" | "boosted" | "high" {
  const n = parseApy(apy);
  if (n >= 15) return "high";
  if (n >= 10) return "boosted";
  return "normal";
}

export default function StakePositionCard({
  sym,
  staked,
  value,
  rewards,
  apy,
  lock = "Flexible",
  onStakeMore,
  onUnstake,
}: Props) {
  const level = apyLevel(apy);
  const apyNumber = parseApy(apy);
  const yieldProgress = Math.max(8, Math.min((apyNumber / 20) * 100, 100));

  return (
    <Card className="p-5">
      {/* Header row */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex min-w-0 items-center gap-3">
          <div className="grid h-9 w-9 place-items-center rounded-full bg-emerald-500 text-sm font-bold text-black/90">
            {sym[0]}
          </div>
          <div className="min-w-0">
            <div className="truncate text-sm font-medium text-slate-900 dark:text-white">
              {sym}
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400">
              Staking position
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className="w-fit rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-medium text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300">
            {apy} APY
          </span>
          <span className="w-fit rounded-full bg-slate-100 px-2.5 py-1 text-xs text-slate-700 dark:bg-slate-800 dark:text-slate-300">
            {lock}
          </span>
          {level !== "normal" && (
            <span
              className={
                "w-fit rounded-full px-2.5 py-1 text-[11px] font-medium " +
                (level === "high"
                  ? "bg-amber-50 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300"
                  : "bg-emerald-50 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300")
              }
            >
              {level === "high" ? "High APY" : "Boosted yield"}
            </span>
          )}
        </div>
      </div>

      {/* Stats row */}
      <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-5">
        <div>
          <div className="text-xs text-slate-500 dark:text-slate-400">
            Staked
          </div>
          <div className="mt-0.5 text-sm text-slate-900 dark:text-white">
            {staked}
          </div>
        </div>

        <div>
          <div className="text-xs text-slate-500 dark:text-slate-400">
            Value
          </div>
          <div className="mt-0.5 text-sm text-slate-900 dark:text-white">
            {value}
          </div>
        </div>

        <div>
          <div className="text-xs text-slate-500 dark:text-slate-400">
            Rewards
          </div>
          <div className="mt-0.5 text-sm text-emerald-600 dark:text-emerald-400">
            {rewards}
          </div>
        </div>

        {/* Actions – کوچیک + آیکون‌دار */}
        <div className="col-span-2 flex items-stretch gap-1.5 sm:col-span-2 sm:justify-end">
          <button
            type="button"
            onClick={onStakeMore}
            className="inline-flex min-w-[88px] items-center justify-center gap-1.5 rounded-lg border border-slate-200 px-2.5 py-1.5 text-[11px] font-medium text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
          >
            <PlusIcon className="h-3.5 w-3.5" />
            <span>Stake</span>
          </button>
          <button
            type="button"
            onClick={onUnstake}
            className="inline-flex min-w-[88px] items-center justify-center gap-1.5 rounded-lg border border-slate-200 px-2.5 py-1.5 text-[11px] font-medium text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
          >
            <ArrowOutIcon className="h-3.5 w-3.5" />
            <span>Unstake</span>
          </button>
        </div>
      </div>

      {/* Yield level bar */}
      <div className="mt-4 flex items-center gap-3">
        <span className="text-[11px] text-slate-500 dark:text-slate-400">
          Yield level
        </span>
        <div className="h-1.5 flex-1 rounded-full bg-slate-100 dark:bg-slate-800">
          <div
            className="h-full rounded-full bg-emerald-500 dark:bg-emerald-400"
            style={{ width: `${yieldProgress}%` }}
          />
        </div>
        <span className="text-[11px] text-slate-500 dark:text-slate-400">
          {apy}
        </span>
      </div>
    </Card>
  );
}

/* آیکون‌ها */

function PlusIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 20 20"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <circle
        cx="10"
        cy="10"
        r="8"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M10 6v8M6 10h8"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ArrowOutIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 20 20"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M5 15l8.5-8.5M9 5h6v6"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
