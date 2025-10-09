export const fmtUSD = (n: number) =>
  n.toLocaleString("en-US", { style: "currency", currency: "USD" });
export const pct = (n: number) => `${n.toFixed(2)}%`;
export const short = (addr: string) =>
  addr ? `${addr.slice(0, 4)}...${addr.slice(-4)}` : "—";
