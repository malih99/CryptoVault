import { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";

export default function AppShell() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-dvh bg-bg text-gray-100 lg:grid lg:grid-cols-[240px_1fr]">
      <Sidebar open={mobileOpen} setOpen={setMobileOpen} />

      <div className="flex min-h-dvh flex-col">
        <Header onOpenSidebar={() => setMobileOpen(true)} />
        <main className="mt-6 px-4 sm:px-6 pb-16">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
