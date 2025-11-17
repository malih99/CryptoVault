export type TxType = "in" | "out" | "swap";
export type TxStatus = "confirmed" | "pending";

export type TxRecord = {
  type: TxType;
  token: string;
  amount: number;
  value: number;
  from: string;
  hash: string;
  time: string;
  status: TxStatus;
};
