import { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";

export default function AppShell() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-bg text-gray-100 lg:grid lg:grid-cols-[240px_1fr]">
      {/* Sidebar */}
      <Sidebar open={mobileOpen} setOpen={setMobileOpen} />
      {/* Header + Main */}
      <div className="flex flex-col">
        <Header onOpenSidebar={() => setMobileOpen(true)} />
        <main className="mt-6 px-4 sm:px-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
