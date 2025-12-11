export type TxType = "in" | "out" | "swap";
export type TxStatus = "confirmed" | "pending";

export type TxTypeFilter = "all" | "in" | "out" | "swap";
export type TxStatusFilter = "all" | "confirmed" | "pending";
export type TxSortKey = "time" | "amount" | "value";
export type TxSortDir = "asc" | "desc";

export type TxRecord = {
  type: TxType;
  token: string;
  amount: number;
  value: number;
  from: string;
  to: string;
  hash: string;
  time: string;
  status: TxStatus;
};
