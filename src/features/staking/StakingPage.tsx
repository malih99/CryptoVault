import Card from "../../components/ui/Card";
import StakePositionCard from "./StakePositionCard";

export default function StakingPage() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-3 gap-4">
        <Card className="p-5">
          <div className="text-gray-300 text-sm">Total Staked</div>
          <div className="text-2xl text-white mt-2">$5,337.50</div>
          <div className="text-emerald-400 text-sm mt-1">
            4 active positions
          </div>
        </Card>
        <Card className="p-5">
          <div className="text-gray-300 text-sm">Total Rewards</div>
          <div className="text-2xl text-white mt-2">$88.72</div>
          <div className="text-emerald-400 text-sm mt-1">This month</div>
        </Card>
        <Card className="p-5">
          <div className="text-gray-300 text-sm">Average APY</div>
          <div className="text-2xl text-white mt-2">10.9%</div>
          <div className="text-gray-400 text-sm mt-1">Across all pools</div>
        </Card>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2 space-y-4">
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
          <div className="text-white mb-4">Manage Staking</div>
          <div className="flex gap-2 mb-4">
            <button className="px-4 py-2 rounded-lg bg-white text-black">
              Stake
            </button>
            <button className="px-4 py-2 rounded-lg border border-border">
              Unstake
            </button>
          </div>
          <div className="grid place-items-center h-36 text-gray-400">
            <div className="text-center">
              🔒 Select a token to start staking
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
