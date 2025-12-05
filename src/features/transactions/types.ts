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

export type TxTypeFilter = "all" | TxType;
export type TxStatusFilter = "all" | TxStatus;

export type TxSortKey = "time" | "amount" | "value";
export type TxSortDir = "asc" | "desc";
