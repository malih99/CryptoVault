import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  PieChart,
  Wallet,
  Repeat,
  Settings,
} from "lucide-react";

const items = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "/portfolio", label: "Portfolio", icon: PieChart },
  { to: "/staking", label: "Staking", icon: Wallet },
  { to: "/transactions", label: "Transactions", icon: Repeat },
  { to: "/settings", label: "Settings", icon: Settings },
];

export default function Sidebar() {
  return (
    <aside className="bg-bg/70 border-r border-border p-4">
      <div className="flex items-center gap-2 mb-6">
        <div className="h-8 w-8 rounded-full bg-emerald-500" />
        <div className="font-semibold">CryptoVault</div>
      </div>
      <nav className="space-y-1">
        {items.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-xl text-sm 
               ${
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
  );
}
