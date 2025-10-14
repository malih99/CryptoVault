import React, { createContext, useContext, useMemo, useState } from "react";

type WalletInfo = {
  address: string | null;
  network: "mainnet" | "testnet" | null;
};

type WalletContextValue = {
  connected: boolean;
  info: WalletInfo;
  connect: (
    provider: "metamask" | "walletconnect" | "phantom"
  ) => Promise<void>;
  disconnect: () => void;
  copyAddress: () => void;
};

const WalletContext = createContext<WalletContextValue | null>(null);

export function WalletProvider({ children }: { children: React.ReactNode }) {
  const [info, setInfo] = useState<WalletInfo>({
    address: null,
    network: null,
  });

  const connected = !!info.address;

  async function connect(provider: "metamask" | "walletconnect" | "phantom") {
    // اینجا می‌تونی اتصال واقعی رو جایگزین کنی
    // فعلاً ماک می‌کنیم:
    const mockAddress =
      provider === "phantom"
        ? "8cX1...Phnt"
        : provider === "walletconnect"
        ? "0xA31...Wc01"
        : "0x12A...Meta";
    setInfo({ address: mockAddress, network: "mainnet" });
  }

  function disconnect() {
    setInfo({ address: null, network: null });
  }

  function copyAddress() {
    if (info.address) navigator.clipboard?.writeText(info.address);
  }

  const value = useMemo(
    () => ({ connected, info, connect, disconnect, copyAddress }),
    [connected, info]
  );

  return (
    <WalletContext.Provider value={value}>{children}</WalletContext.Provider>
  );
}

export function useWallet() {
  const ctx = useContext(WalletContext);
  if (!ctx) throw new Error("useWallet must be used within WalletProvider");
  return ctx;
}
