import { PropsWithChildren } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import WalletProvider from "../features/wallet/WalletProvider";

const qc = new QueryClient();
export default function AppProviders({ children }: PropsWithChildren) {
  return (
    <QueryClientProvider client={qc}>
      <WalletProvider>{children}</WalletProvider>
    </QueryClientProvider>
  );
}
