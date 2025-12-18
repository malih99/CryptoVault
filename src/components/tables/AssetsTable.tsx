import Card from "../ui/Card";
import { T, THEAD, TBODY, TR, TH, TD } from "../ui/Table";
import { useTranslation } from "react-i18next";
import type { HoldingRow } from "../../features/dashboard/api";

type Props = {
  rows: HoldingRow[];
};

export default function AssetsTable({ rows }: Props) {
  const { t, i18n } = useTranslation();

  return (
    <Card className="p-5">
      <div className="mb-3 font-medium text-slate-900 dark:text-slate-100">
        {t("dashboard.assets")}
      </div>

      {/* Mobile (cards) */}
      <ul className="space-y-3 sm:hidden">
        {rows.map((r) => (
          <li
            key={r.sym}
            className="rounded-xl border border-slate-200 bg-white p-3 shadow-sm dark:border-slate-800 dark:bg-slate-900"
          >
            <div className="flex items-center gap-3">
              <div className="grid h-8 w-8 place-items-center rounded-full bg-emerald-500 text-xs font-bold text-white">
                {r.sym[0]}
              </div>
              <div className="flex-1">
                <div className="font-medium text-slate-900 dark:text-slate-100">
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
              <div className="rounded-lg bg-slate-50 p-2 dark:bg-slate-800/60">
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
              <div className="rounded-lg bg-slate-50 p-2 dark:bg-slate-800/60">
                <div className="text-xs text-slate-500 dark:text-slate-400">
                  {t("dashboard.holdings")}
                </div>
                <div className="text-slate-800 dark:text-slate-100">
                  {r.qty.toLocaleString(
                    i18n.language === "fa" ? "fa-IR" : "en-US"
                  )}
                </div>
              </div>
              <div className="col-span-2 rounded-lg bg-slate-50 p-2 dark:bg-slate-800/60">
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
      <div className="hidden overflow-x-auto sm:block">
        <T className="min-w-[720px]">
          <THEAD>
            <TR>
              <TH className="pl-2">{t("dashboard.token")}</TH>
              <TH>{t("dashboard.price")}</TH>
              <TH>{t("dashboard.holdings")}</TH>
              <TH>{t("dashboard.value")}</TH>
              <TH className="pr-2 text-right">{t("dashboard.change")}</TH>
            </TR>
          </THEAD>
          <TBODY>
            {rows.map((r) => (
              <TR key={r.sym}>
                <TD className="pl-2">
                  <div className="flex items-center gap-3">
                    <div className="grid h-7 w-7 place-items-center rounded-full bg-emerald-500 text-xs font-bold text-white">
                      {r.sym[0]}
                    </div>
                    <div>
                      <div className="font-medium text-slate-900 dark:text-slate-100">
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
                <TD className="pr-2 text-right">
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
