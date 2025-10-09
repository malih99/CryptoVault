import Card from "../../components/ui/Card";
import TxFilter from "./TxFilter";
import TxTable from "../../components/tables/TxTable";

export default function TransactionsPage() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-4 gap-4">
        <Card className="p-5">
          <div className="text-gray-300 text-sm">Total Transactions</div>
          <div className="text-white text-2xl mt-2">8</div>
        </Card>
        <Card className="p-5">
          <div className="text-gray-300 text-sm">Sent</div>
          <div className="text-white text-2xl mt-2">3</div>
        </Card>
        <Card className="p-5">
          <div className="text-gray-300 text-sm">Received</div>
          <div className="text-white text-2xl mt-2">3</div>
        </Card>
        <Card className="p-5">
          <div className="text-gray-300 text-sm">Swapped</div>
          <div className="text-white text-2xl mt-2">2</div>
        </Card>
      </div>

      <TxFilter />
      <TxTable />
    </div>
  );
}
