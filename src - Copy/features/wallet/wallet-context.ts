import { createContext } from "react";

export type WalletInfo = {
  address: string | null;
  network: "mainnet" | "testnet" | null;
};

export type WalletContextValue = {
  connected: boolean;
  info: WalletInfo;
  connect: (p: "metamask" | "walletconnect" | "phantom") => Promise<void>;
  disconnect: () => void;
  copyAddress: () => void;
};

export const WalletContext = createContext<WalletContextValue | null>(null);
