import Card from "../../components/ui/Card";
import TxFilter from "./TxFilter";
import TxTable from "../../components/tables/TxTable";

export default function TransactionsPage() {
  return (
    <div className="space-y-6">
      {/* KPI cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4 sm:p-5">
          <div className="text-gray-300 text-xs sm:text-sm">
            Total Transactions
          </div>
          <div className="text-white text-xl sm:text-2xl mt-1.5">8</div>
        </Card>
        <Card className="p-4 sm:p-5">
          <div className="text-gray-300 text-xs sm:text-sm">Sent</div>
          <div className="text-white text-xl sm:text-2xl mt-1.5">3</div>
        </Card>
        <Card className="p-4 sm:p-5">
          <div className="text-gray-300 text-xs sm:text-sm">Received</div>
          <div className="text-white text-xl sm:text-2xl mt-1.5">3</div>
        </Card>
        <Card className="p-4 sm:p-5">
          <div className="text-gray-300 text-xs sm:text-sm">Swapped</div>
          <div className="text-white text-xl sm:text-2xl mt-1.5">2</div>
        </Card>
      </div>

      {/* Filters */}
      <TxFilter />

      {/* Table / Cards */}
      <TxTable />
    </div>
  );
}
