import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  PieChart,
  Wallet,
  Repeat,
  Settings,
  Menu,
  X,
} from "lucide-react";

const items = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "/portfolio", label: "Portfolio", icon: PieChart },
  { to: "/staking", label: "Staking", icon: Wallet },
  { to: "/transactions", label: "Transactions", icon: Repeat },
  { to: "/settings", label: "Settings", icon: Settings },
];

export default function Sidebar() {
  const [open, setOpen] = useState(true);

  return (
    <>
      {/* دکمه برای موبایل */}
      <button
        className="sm:hidden fixed top-4 left-4 z-50 h-9 w-9 grid place-items-center rounded-xl border border-border bg-card/80 text-gray-300 hover:bg-white/10"
        onClick={() => setOpen(!open)}
      >
        {open ? <X size={18} /> : <Menu size={18} />}
      </button>

      <aside
        className={`
          fixed sm:static z-40 h-full transition-all duration-300
          ${open ? "w-56" : "w-0 sm:w-16"}
          overflow-hidden sm:overflow-visible
          bg-bg/70 border-r border-border p-4
        `}
      >
        <div
          className={`flex items-center gap-2 mb-6 transition-all ${
            open ? "opacity-100" : "opacity-0 sm:opacity-100"
          }`}
        >
          <div className="h-8 w-8 rounded-full bg-emerald-500 shrink-0" />
          <div
            className={`font-semibold text-sm transition-all ${
              open ? "opacity-100" : "opacity-0 sm:opacity-100"
            }`}
          >
            CryptoVault
          </div>
        </div>

        <nav className="space-y-1">
          {items.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-xl text-sm transition-all
                ${
                  isActive
                    ? "bg-white/5 text-white"
                    : "text-gray-300 hover:bg-white/5"
                }`
              }
            >
              <Icon size={18} className="shrink-0" />
              <span
                className={`transition-all ${
                  open ? "opacity-100" : "opacity-0 sm:opacity-100"
                }`}
              >
                {label}
              </span>
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  );
}
