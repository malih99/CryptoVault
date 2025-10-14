import { useWallet } from "./useWallet";

export default function WalletSummary() {
  const { connected, info } = useWallet();
  return !connected ? (
    <div className="w-full text-center text-gray-400">
      <div className="text-4xl sm:text-5xl mb-3">💳</div>
      <div className="max-w-[220px] mx-auto">
        Connect your wallet to view your balance
      </div>
    </div>
  ) : (
    <div className="text-center">
      <div className="text-sm text-muted mb-1">Connected wallet</div>
      <div className="text-lg font-semibold text-white">{info.address}</div>
      <div className="text-xs text-muted mt-1">Network: {info.network}</div>
    </div>
  );
}
