import React, { useMemo, useState } from "react";
import { WalletContext } from "./wallet-context";
import type { WalletInfo } from "./wallet-context"; // ⬅️ type-only import

export default function WalletProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [info, setInfo] = useState<WalletInfo>({
    address: null,
    network: null,
  });
  const connected = !!info.address;

  async function connect(p: "metamask" | "walletconnect" | "phantom") {
    const mock =
      p === "phantom"
        ? "8cX1...Phnt"
        : p === "walletconnect"
        ? "0xA31...Wc01"
        : "0x12A...Meta";
    setInfo({ address: mock, network: "mainnet" });
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
