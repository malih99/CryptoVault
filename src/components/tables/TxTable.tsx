import Card from "../ui/Card";
import { T, THEAD, TBODY, TR, TH, TD } from "../ui/Table";
import { mockTx } from "../../lib/api/mock";

export default function TxTable() {
  return (
    <Card className="p-5">
      <div className="text-white mb-3">Transactions</div>
      <div className="overflow-x-auto">
        <T>
          <THEAD>
            <TR>
              <TH>Type</TH>
              <TH>Token</TH>
              <TH>Amount</TH>
              <TH>Value</TH>
              <TH>From/To</TH>
              <TH>Hash</TH>
              <TH>Time</TH>
              <TH>Status</TH>
            </TR>
          </THEAD>
          <TBODY>
            {mockTx.map((r, i) => (
              <TR key={i}>
                <TD>{r.type === "in" ? "↙" : "↗"}</TD>
                <TD>{r.token}</TD>
                <TD
                  className={
                    r.amount.startsWith("-")
                      ? "text-red-400"
                      : "text-emerald-400"
                  }
                >
                  {r.amount}
                </TD>
                <TD>{r.value}</TD>
                <TD>{r.from}</TD>
                <TD>{r.hash}</TD>
                <TD>{r.time}</TD>
                <TD>
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      r.status === "confirmed"
                        ? "bg-emerald-900 text-emerald-300"
                        : "bg-yellow-900 text-yellow-300"
                    }`}
                  >
                    {r.status}
                  </span>
                </TD>
              </TR>
            ))}
          </TBODY>
        </T>
      </div>
    </Card>
  );
}
