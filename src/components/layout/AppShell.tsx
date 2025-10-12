import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";

export default function AppShell() {
  return (
    <div className="app text-gray-100">
      <Sidebar />
      <div className="w-full mr-auto">
        <Header />
        <main className="mt-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
