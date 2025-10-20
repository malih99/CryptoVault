import Card from "../../components/ui/Card";
import StakePositionCard from "./StakePositionCard";

export default function StakingPage() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        <Card className="p-5">
          <div className="text-gray-300 text-sm">Total Staked</div>
          <div className="mt-2 text-white text-xl sm:text-2xl">$5,337.50</div>
          <div className="mt-1 text-emerald-400 text-sm">
            4 active positions
          </div>
        </Card>

        <Card className="p-5">
          <div className="text-gray-300 text-sm">Total Rewards</div>
          <div className="mt-2 text-white text-xl sm:text-2xl">$88.72</div>
          <div className="mt-1 text-emerald-400 text-sm">This month</div>
        </Card>

        <Card className="p-5">
          <div className="text-gray-300 text-sm">Average APY</div>
          <div className="mt-2 text-white text-xl sm:text-2xl">10.9%</div>
          <div className="mt-1 text-gray-400 text-sm">Across all pools</div>
        </Card>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <div className="space-y-4 xl:col-span-2">
          <StakePositionCard
            sym="SOL"
            staked="4.5 SOL"
            value="$892.5"
            rewards="+$12.45"
            apy="7.2%"
          />
          <StakePositionCard
            sym="ETH"
            staked="1.2 ETH"
            value="$2,940"
            rewards="+$45.20"
            apy="5.8%"
          />
          <StakePositionCard
            sym="MATIC"
            staked="1200 MATIC"
            value="$1,020"
            rewards="+$7.10"
            apy="12.5%"
          />
        </div>

        <Card className="p-5">
          <div className="mb-4 text-white">Manage Staking</div>

          <div className="mb-4 grid grid-cols-1 sm:grid-cols-2 gap-2">
            <button className="w-full px-4 py-2 rounded-lg bg-white text-black">
              Stake
            </button>
            <button className="w-full px-4 py-2 rounded-lg border border-border">
              Unstake
            </button>
          </div>

          <div className="grid h-36 place-items-center text-gray-400">
            <div className="text-center">
              🔒 Select a token to start staking
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
