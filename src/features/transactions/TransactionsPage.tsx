import Card from "../../components/ui/Card";
import TxFilter from "./TxFilter";
import TxTable from "../../components/tables/TxTable";
import TxAnalytics from "./TxAnalytics";
import TxMonthlySummary from "./TxMonthlySummary";
import {
  mockTx,
  mockTxMonthlySummary,
  mockTxFeesByMonth,
} from "../../lib/api/mock";

function parseUsd(value: string) {
  return Number(value.replace(/[$,]/g, "")) || 0;
}

export default function TransactionsPage() {
  const totalTx = mockTx.length;
  const totalVolume = mockTx.reduce((sum, tx) => sum + parseUsd(tx.value), 0);
  const avgTx = totalTx ? totalVolume / totalTx : 0;

  const confirmed = mockTx.filter((t) => t.status === "confirmed").length;
  const successRate = totalTx ? (confirmed / totalTx) * 100 : 0;

  return (
    <section className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-lg font-semibold text-slate-900 dark:text-slate-50">
          Transactions
        </h1>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          View and manage your transaction history.
        </p>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="p-4 sm:p-5">
          <div className="text-xs text-slate-500 dark:text-slate-400">
            Total Transactions
          </div>
          <div className="mt-1.5 text-xl font-semibold text-slate-900 dark:text-slate-50 sm:text-2xl">
            {totalTx}
          </div>
        </Card>

        <Card className="p-4 sm:p-5">
          <div className="text-xs text-slate-500 dark:text-slate-400">
            Total Volume
          </div>
          <div className="mt-1.5 text-xl font-semibold text-slate-900 dark:text-slate-50 sm:text-2xl">
            ${totalVolume.toLocaleString()}
          </div>
        </Card>

        <Card className="p-4 sm:p-5">
          <div className="text-xs text-slate-500 dark:text-slate-400">
            Avg Transaction
          </div>
          <div className="mt-1.5 text-xl font-semibold text-slate-900 dark:text-slate-50 sm:text-2xl">
            ${avgTx.toFixed(2)}
          </div>
        </Card>

        <Card className="p-4 sm:p-5">
          <div className="text-xs text-slate-500 dark:text-slate-400">
            Success Rate
          </div>
          <div className="mt-1.5 text-xl font-semibold text-emerald-600 dark:text-emerald-300 sm:text-2xl">
            {successRate.toFixed(1)}%
          </div>
        </Card>
      </div>

      {/* Analytics row (breakdown, top tokens, fee analysis) */}
      <TxAnalytics tx={mockTx} feesByMonth={mockTxFeesByMonth} />

      {/* Filters */}
      <TxFilter />

      {/* Monthly summary cards */}
      <TxMonthlySummary months={mockTxMonthlySummary} />

      {/* Table / Cards */}
      <TxTable />
    </section>
  );
}
