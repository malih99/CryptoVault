export type TxRecord = {
  type: "in" | "out" | "swap";
  token: string;
  amount: string;
  value: string;
  from: string;
  hash: string;
  time: string;
  status: "confirmed" | "pending" | string;
};
