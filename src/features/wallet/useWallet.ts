import { useContext } from "react";
import { WalletContext } from "./wallet-context";

export function useWallet() {
  const ctx = useContext(WalletContext);
  if (!ctx) throw new Error("useWallet must be used within WalletProvider");
  return ctx;
}
