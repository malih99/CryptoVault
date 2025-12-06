// src/features/transactions/types.ts

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

/** UI filters */
export type TxTypeFilter = TxType | "all";
export type TxStatusFilter = TxStatus | "all";

/** Sorting */
export type TxSortKey = "time" | "amount" | "value";
export type TxSortDir = "asc" | "desc";
