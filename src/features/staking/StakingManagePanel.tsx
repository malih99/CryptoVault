import { useEffect, useState } from "react";
import Card from "../../components/ui/Card";

export type SelectedPool = {
  sym: string;
  apy: string;
  lock: string;
  source: "position" | "opportunity";
};

type Props = {
  mode: "stake" | "unstake";
  setMode: (mode: "stake" | "unstake") => void;
  selected: SelectedPool | null;
  currentStakedAmount?: number;
  currentStakedValue?: number;
};

export default function StakingManagePanel({
  mode,
  setMode,
  selected,
  currentStakedAmount,
  currentStakedValue,
}: Props) {
  const [amount, setAmount] = useState("");

  useEffect(() => {
    // هر بار توکن یا مود عوض بشه، فیلد خالی بشه
    setAmount("");
  }, [selected, mode]);

  const isStake = mode === "stake";

  const numericAmount = Number(amount || 0);
  const hasPosition =
    !!selected &&
    typeof currentStakedAmount === "number" &&
    currentStakedAmount > 0;
  const exceedsBalance =
    !isStake && hasPosition && numericAmount > (currentStakedAmount ?? 0);

  const canSubmit = !!amount && !exceedsBalance;

  return (
    <Card className="p-5">
      <div className="mb-4 font-medium text-slate-900 dark:text-white">
        Manage Staking
      </div>

      {/* Tabs */}
      <div className="mb-4 grid grid-cols-2 gap-2">
        <button
          type="button"
          onClick={() => setMode("stake")}
          className={
            "w-full rounded-lg px-4 py-2 text-sm transition " +
            (mode === "stake"
              ? "bg-emerald-600 text-white"
              : "border border-slate-200 bg-white text-slate-900 " +
                "dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100")
          }
        >
          Stake
        </button>
        <button
          type="button"
          onClick={() => setMode("unstake")}
          className={
            "w-full rounded-lg px-4 py-2 text-sm transition " +
            (mode === "unstake"
              ? "bg-emerald-600 text-white"
              : "border border-slate-200 bg-white text-slate-900 " +
                "dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100")
          }
        >
          Unstake
        </button>
      </div>

      {!selected ? (
        <div className="grid h-36 place-items-center text-slate-500 dark:text-slate-400">
          <div className="text-center">🔒 Select a token to {mode}</div>
        </div>
      ) : (
        <div className="space-y-3 text-sm">
          {/* انتخاب فعلی */}
          <div className="flex items-center justify-between rounded-xl border border-slate-200 p-3 dark:border-slate-700">
            <div className="flex items-center gap-3">
              <div className="grid h-8 w-8 place-items-center rounded-full bg-emerald-500 font-bold text-black/90">
                {selected.sym[0]}
              </div>
              <div>
                <div className="text-slate-900 dark:text-white">
                  {selected.sym}{" "}
                  <span className="text-xs text-slate-500 dark:text-slate-400">
                    {selected.lock}
                  </span>
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400">
                  Source:{" "}
                  {selected.source === "position"
                    ? "My positions"
                    : "Opportunity"}
                </div>
                {hasPosition && (
                  <div className="mt-1 text-[11px] text-slate-500 dark:text-slate-400">
                    Currently staked:{" "}
                    <span className="font-medium text-slate-700 dark:text-slate-200">
                      {currentStakedAmount} {selected.sym}
                    </span>
                    {currentStakedValue != null && currentStakedValue > 0 && (
                      <span className="ml-1 text-slate-400 dark:text-slate-500">
                        (~${currentStakedValue.toLocaleString()})
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>
            <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-xs text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300">
              {selected.apy} APY
            </span>
          </div>

          {/* مقدار */}
          <label className="grid gap-1">
            <span className="text-xs text-slate-500 dark:text-slate-400">
              {isStake ? "Amount to stake" : "Amount to unstake"}
            </span>
            <input
              type="number"
              min={0}
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder={isStake ? "Enter amount" : "Enter amount to unstake"}
              className="h-10 rounded-xl border border-slate-200 bg-white px-3 text-slate-900
                         focus:outline-none focus:ring-1 focus:ring-emerald-500/70
                         dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
            />
            {!isStake && hasPosition && (
              <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
                <span>
                  You can unstake up to{" "}
                  <span className="font-medium text-slate-700 dark:text-slate-200">
                    {currentStakedAmount} {selected.sym}
                  </span>
                  {currentStakedValue != null && currentStakedValue > 0 && (
                    <span className="ml-1 text-slate-400 dark:text-slate-500">
                      (~${currentStakedValue.toLocaleString()})
                    </span>
                  )}
                </span>
              </div>
            )}
            {!isStake && exceedsBalance && (
              <p className="text-[11px] text-amber-600 dark:text-amber-400">
                Amount exceeds your staked balance.
              </p>
            )}
          </label>

          <button
            type="button"
            className="mt-1 inline-flex w-full items-center justify-center rounded-xl
                       bg-emerald-600 px-4 py-2 text-sm font-medium text-white
                       hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
            disabled={!canSubmit}
          >
            {isStake ? "Confirm Stake" : "Confirm Unstake"}
          </button>

          <p className="text-xs text-slate-500 dark:text-slate-400">
            This is a demo UI. No real blockchain transactions will be sent.
          </p>
        </div>
      )}
    </Card>
  );
}
