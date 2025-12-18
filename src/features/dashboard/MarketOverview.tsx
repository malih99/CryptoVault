import Card from "../../components/ui/Card";
import { TrendingUp, TrendingDown } from "lucide-react";
import { useTranslation } from "react-i18next";
import type { MarketRow } from "../../features/dashboard/api";

type Props = {
  items: MarketRow[];
};

export default function MarketOverview({ items }: Props) {
  const { t, i18n } = useTranslation();

  return (
    <Card className="p-5">
      <div className="mb-4 font-medium text-slate-900 dark:text-slate-100">
        {t("dashboard.marketOverview")}
      </div>

      <ul className="space-y-4">
        {items.map((m) => (
          <li key={m.sym} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="grid h-9 w-9 place-items-center rounded-full bg-emerald-500 text-sm font-bold text-white">
                {m.sym[0]}
              </div>
              <div>
                <div className="text-sm text-slate-800 dark:text-slate-100">
                  {m.name}
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400">
                  {m.sym}
                </div>
              </div>
            </div>

            <div className="text-right">
              <div className="text-sm text-slate-800 dark:text-slate-100">
                $
                {m.price.toLocaleString(
                  i18n.language === "fa" ? "fa-IR" : "en-US"
                )}
              </div>
              <div
                className={
                  "inline-flex items-center gap-1 text-xs " +
                  (m.change >= 0
                    ? "text-emerald-600 dark:text-emerald-400"
                    : "text-rose-600 dark:text-rose-400")
                }
              >
                {m.change >= 0 ? (
                  <TrendingUp size={14} />
                ) : (
                  <TrendingDown size={14} />
                )}
                {m.change >= 0 ? "+" : ""}
                {m.change}%
              </div>
            </div>
          </li>
        ))}
      </ul>
    </Card>
  );
}
