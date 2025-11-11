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
};

export default function StakingManagePanel({ mode, setMode, selected }: Props) {
  const [amount, setAmount] = useState("");

  useEffect(() => {
    setAmount("");
  }, [selected, mode]);

  const isStake = mode === "stake";

  return (
    <Card className="p-5">
      <div className="mb-4 font-medium text-slate-900 dark:text-white">
        Manage Staking
      </div>

      {/* Tabs */}
      <div className="mb-4 grid grid-cols-2 gap-2">
        <button
          onClick={() => setMode("stake")}
          className={
            "w-full px-4 py-2 rounded-lg text-sm transition " +
            (mode === "stake"
              ? "bg-emerald-600 text-white"
              : "bg-white text-slate-900 border border-slate-200 " +
                "dark:bg-slate-900 dark:text-slate-100 dark:border-slate-700")
          }
        >
          Stake
        </button>
        <button
          onClick={() => setMode("unstake")}
          className={
            "w-full px-4 py-2 rounded-lg text-sm transition " +
            (mode === "unstake"
              ? "bg-emerald-600 text-white"
              : "bg-white text-slate-900 border border-slate-200 " +
                "dark:bg-slate-900 dark:text-slate-100 dark:border-slate-700")
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
          <div className="rounded-xl border border-slate-200 dark:border-slate-700 p-3 flex items-center justify-between">
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
              </div>
            </div>
            <span className="rounded-full bg-emerald-100 text-emerald-700 px-2 py-0.5 text-xs dark:bg-emerald-900/50 dark:text-emerald-300">
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
              className="h-10 rounded-xl border px-3 bg-white text-slate-900 border-slate-200
                         dark:bg-slate-900 dark:text-slate-100 dark:border-slate-700
                         focus:outline-none focus:ring-1 focus:ring-emerald-500/70"
            />
          </label>

          <button
            className="mt-1 inline-flex w-full items-center justify-center rounded-xl
                       bg-emerald-600 px-4 py-2 text-sm font-medium text-white
                       hover:bg-emerald-700 disabled:opacity-60 disabled:cursor-not-allowed"
            disabled={!amount}
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
