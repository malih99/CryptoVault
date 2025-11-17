export type TxTypeFilter = "all" | "in" | "out" | "swap";
export type TxType = "in" | "out" | "swap";
export type TxStatus = "confirmed" | "pending";

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
