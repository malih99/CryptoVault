import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";

export default function AppShell() {
  return (
    <div className="min-h-screen grid grid-cols-[240px_1fr] bg-bg text-gray-100">
      <Sidebar />
      <div className="px-4 sm:px-6 py-6">
        <div className="mx-auto w-full max-w-[1280px]">
          <Header />
          <div className="mt-6">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}
