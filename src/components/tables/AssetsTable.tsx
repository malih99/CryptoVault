import Card from "../ui/Card";
import { T, THEAD, TBODY, TR, TH, TD } from "../ui/Table";
import { mockHoldings } from "../../lib/api/mock";
import { useTranslation } from "react-i18next";

export default function AssetsTable() {
  const { t, i18n } = useTranslation();

  return (
    <Card className="p-5">
      <div className="text-slate-900 dark:text-slate-100 font-medium mb-3">
        {t("dashboard.assets")}
      </div>

      {/* Mobile (cards) */}
      <ul className="sm:hidden space-y-3">
        {mockHoldings.map((r) => (
          <li
            key={r.sym}
            className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm p-3"
          >
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-full bg-emerald-500 grid place-items-center text-xs font-bold text-white">
                {r.sym[0]}
              </div>
              <div className="flex-1">
                <div className="text-slate-900 dark:text-slate-100 font-medium">
                  {r.sym}
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400">
                  {r.name}
                </div>
              </div>
              <div
                className={
                  "text-xs font-medium " +
                  (r.change >= 0 ? "text-emerald-600" : "text-rose-500")
                }
              >
                {r.change >= 0 ? "↗" : "↘"} {r.change}%
              </div>
            </div>

            <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
              <div className="rounded-lg bg-slate-50 dark:bg-slate-800/60 p-2">
                <div className="text-xs text-slate-500 dark:text-slate-400">
                  {t("dashboard.price")}
                </div>
                <div className="text-slate-800 dark:text-slate-100">
                  $
                  {r.price.toLocaleString(
                    i18n.language === "fa" ? "fa-IR" : "en-US"
                  )}
                </div>
              </div>
              <div className="rounded-lg bg-slate-50 dark:bg-slate-800/60 p-2">
                <div className="text-xs text-slate-500 dark:text-slate-400">
                  {t("dashboard.holdings")}
                </div>
                <div className="text-slate-800 dark:text-slate-100">
                  {r.qty.toLocaleString(
                    i18n.language === "fa" ? "fa-IR" : "en-US"
                  )}
                </div>
              </div>
              <div className="rounded-lg bg-slate-50 dark:bg-slate-800/60 p-2 col-span-2">
                <div className="text-xs text-slate-500 dark:text-slate-400">
                  {t("dashboard.value")}
                </div>
                <div className="text-slate-800 dark:text-slate-100">
                  $
                  {r.value.toLocaleString(
                    i18n.language === "fa" ? "fa-IR" : "en-US"
                  )}
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>

      {/* Desktop (table) */}
      <div className="hidden sm:block overflow-x-auto">
        <T className="min-w-[720px]">
          <THEAD>
            <TR>
              <TH className="pl-2">{t("dashboard.token")}</TH>
              <TH>{t("dashboard.price")}</TH>
              <TH>{t("dashboard.holdings")}</TH>
              <TH>{t("dashboard.value")}</TH>
              <TH className="text-right pr-2">{t("dashboard.change")}</TH>
            </TR>
          </THEAD>
          <TBODY>
            {mockHoldings.map((r) => (
              <TR key={r.sym}>
                <TD className="pl-2">
                  <div className="flex items-center gap-3">
                    <div className="h-7 w-7 rounded-full bg-emerald-500 grid place-items-center text-xs font-bold text-white">
                      {r.sym[0]}
                    </div>
                    <div>
                      <div className="text-slate-900 dark:text-slate-100 font-medium">
                        {r.sym}
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400">
                        {r.name}
                      </div>
                    </div>
                  </div>
                </TD>
                <TD>
                  $
                  {r.price.toLocaleString(
                    i18n.language === "fa" ? "fa-IR" : "en-US"
                  )}
                </TD>
                <TD>
                  {r.qty.toLocaleString(
                    i18n.language === "fa" ? "fa-IR" : "en-US"
                  )}
                </TD>
                <TD>
                  $
                  {r.value.toLocaleString(
                    i18n.language === "fa" ? "fa-IR" : "en-US"
                  )}
                </TD>
                <TD className="text-right pr-2">
                  <span
                    className={
                      r.change >= 0 ? "text-emerald-600" : "text-rose-500"
                    }
                  >
                    {r.change >= 0 ? "↗" : "↘"} {r.change}%
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
