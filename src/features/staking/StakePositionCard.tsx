import Card from "../../components/ui/Card";

export default function StakePositionCard({
  sym,
  staked,
  value,
  rewards,
  apy,
}: {
  sym: string;
  staked: string;
  value: string;
  rewards: string;
  apy: string;
}) {
  return (
    <Card className="p-5">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <div className="grid h-8 w-8 place-items-center rounded-full bg-emerald-500 font-bold text-black/90">
            {sym[0]}
          </div>
          <div className="text-white truncate">{sym}</div>
        </div>

        <span className="w-fit rounded-full bg-emerald-900 px-2 py-1 text-xs text-emerald-300">
          {apy} APY
        </span>
      </div>

      <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div>
          <div className="text-xs text-gray-400">Staked</div>
          <div className="text-white">{staked}</div>
        </div>

        <div>
          <div className="text-xs text-gray-400">Value</div>
          <div className="text-white">{value}</div>
        </div>

        <div>
          <div className="text-xs text-gray-400">Rewards</div>
          <div className="text-emerald-400">{rewards}</div>
        </div>

        <div className="col-span-2 sm:col-span-1 flex flex-col md:flex-row items-stretch gap-2">
          <button className="w-full md:flex-1 rounded-xl border border-border px-4 py-2">
            Stake More
          </button>
          <button className="w-full md:flex-1 rounded-xl border border-border px-4 py-2">
            Unstake
          </button>
        </div>
      </div>
    </Card>
  );
}
