import { useWallet } from "./useWallet";

export default function WalletSummary() {
  const { connected, info } = useWallet();

  if (!connected) {
    return (
      <div className="w-full text-center text-slate-500">
        <div className="text-4xl sm:text-5xl mb-3">💳</div>
        <div className="max-w-[240px] mx-auto">
          Connect your wallet to view your balance
        </div>
      </div>
    );
  }

  return (
    <div className="text-center">
      <div className="text-sm text-slate-500 mb-1">Connected wallet</div>
      <div className="text-lg font-semibold text-slate-900 break-all">
        {info.address}
      </div>
      <div className="text-xs text-slate-500 mt-1">Network: {info.network}</div>
    </div>
  );
}
