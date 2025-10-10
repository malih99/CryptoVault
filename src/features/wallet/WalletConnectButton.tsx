// features/wallet/WalletConnectButton.tsx
export default function WalletConnectButton() {
  return (
    <button
      className="
        h-9 px-3 rounded-xl text-sm
        border border-emerald-600/60 text-emerald-300
        hover:bg-emerald-600/10 active:bg-emerald-600/20 transition-colors
      "
    >
      Connect Wallet
    </button>
  );
}
