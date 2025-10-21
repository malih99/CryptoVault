import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import {
  Menu,
  LayoutDashboard,
  PieChart,
  Wallet,
  Repeat,
  Settings,
} from "lucide-react";

const navItems = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "/portfolio", label: "Portfolio", icon: PieChart },
  { to: "/staking", label: "Staking", icon: Wallet },
  { to: "/transactions", label: "Transactions", icon: Repeat },
  { to: "/settings", label: "Settings", icon: Settings },
];

export default function Sidebar({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (v: boolean) => void;
}) {
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      {/* لایه پشت منو (فقط در موبایل) */}
      <div
        className={`fixed inset-0 z-30 bg-black/50 backdrop-blur-[2px] transition-opacity lg:hidden ${
          open
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setOpen(false)}
      />

      {/* سایدبار */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-card/95 border-r border-border backdrop-blur-sm
        transform transition-transform duration-300 ease-in-out
        ${open ? "translate-x-0" : "-translate-x-full"}
        /* دسکتاپ: سایدبار چسبان با ارتفاع کامل ویوپورت */
        lg:translate-x-0 lg:sticky lg:top-0 lg:w-[240px] lg:h-[100dvh]`}
      >
        {/* لوگو + دکمه بستن */}
        <div className="flex items-center justify-between px-4 py-4 border-b border-border">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-emerald-500" />
            <span className="font-semibold text-sm">CryptoVault</span>
          </div>
          <button
            onClick={() => setOpen(false)}
            aria-label="Open sidebar"
            className="
              lg:hidden h-9 w-9 flex items-center justify-center
              rounded-xl border border-slate-700/60
              text-slate-200 hover:bg-white/10 transition-colors
            "
          >
            <Menu size={18} />
          </button>
        </div>

        {/* لینک‌ها */}
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
          {navItems.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-xl text-sm transition-colors ${
                  isActive
                    ? "bg-white/5 text-white"
                    : "text-gray-300 hover:bg-white/5"
                }`
              }
            >
              <Icon size={18} />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  );
}
