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
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-full bg-emerald-500 grid place-items-center font-bold">
            {sym[0]}
          </div>
          <div className="text-white">{sym}</div>
        </div>
        <span className="px-2 py-1 rounded-full bg-emerald-900 text-emerald-300 text-xs">
          {apy} APY
        </span>
      </div>
      <div className="grid grid-cols-4 gap-4 mt-4">
        <div>
          <div className="text-gray-400 text-xs">Staked</div>
          <div className="text-white">{staked}</div>
        </div>
        <div>
          <div className="text-gray-400 text-xs">Value</div>
          <div className="text-white">{value}</div>
        </div>
        <div>
          <div className="text-gray-400 text-xs">Rewards</div>
          <div className="text-emerald-400">{rewards}</div>
        </div>
        <div className="col-span-1 flex items-end gap-2">
          <button className="flex-1 px-4 py-2 rounded-xl border border-border">
            Stake More
          </button>
          <button className="flex-1 px-4 py-2 rounded-xl border border-border">
            Unstake
          </button>
        </div>
      </div>
    </Card>
  );
}
